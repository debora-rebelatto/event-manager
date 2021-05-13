const express = require("express");

const Event = require('../models/Event');
const User = require('../models/User');
const Participant = require('../models/Participant');
const PdfServices = require('../services/pdfServices');

const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware);

exports.getPdf = async function (req, res, next) {
  try {
    if(await Event.findById(req.params.id).countDocuments() <= 0)
      return res.status(400).send({"err": "evento não existe"});

    if(await Participant.find({ participant: req.userId, event: req.params.id, hasPaid: false}).countDocuments() != 0)
      return res.status(400).send({"err": "evento não foi pago"});

    var user = await User.findById(req.userId);
    var event = await Event.findById(req.params.id).populate('organizer');

    await PdfServices.buildPdf(user, event);

    return res.status(200).json({'ok': 'ok'});
  } catch(err) {
    return res.status(400).send(err);
  }
};

exports.filterEvents = async function (req, res, next) {
  try {
    var events = await Event.find({
      title: req.body.title,
      value: { $gte: req.body.value },
      date: req.body.date,
      location: req.body.location
    });
    return res.status(200).send( events );
  } catch(err) {
    return res.status(400).send({ 'error': err });
  }
};

exports.create = async function (req, res, next) {
  let { isFree, price } = req.body;

  try {
    var user = await User.findById(req.userId);

    console.log(user.isOrganizer)

    if(!isFree && !price) return res.status(400).json({ "error": "Evento precisa ter preço" })

    if(!user.isOrganizer) return res.status(400).send({ error: 'Usuário não autorizado' })

    var event = await Event.create({ ...req.body, organizer: req.userId });
    return res.status(200).send(event)
  } catch(err) {
    return res.status(400).send({ 'error': err });
  }
};

exports.getById = async function (req, res, next) {
  var id = req.params.id;

  try {
    if(!await Event.findById(id))
      res.status(400).send({ 'error': 'Evento não existe' });

    var event = await Event.findById(id).populate(['organizer', 'participants']);

    return res.status(200).send(event);
  } catch(err) {
    return res.status(400).send({ 'error': err });
  }
};

exports.list = async function (req, res) {
  try {
    var events = await Event.find().populate(['organizer', 'participants']);
    return res.status(200).send( events );
  } catch(err) {
    return res.status(400).send({ 'error': err });
  }
};

exports.deleteById = async function (req, res) {
  var id = req.params.id;
  try {
    var event = await Event.findById(id);

    if(event.organizer._id != req.userId)
      return res.status(400).send({ error: 'Usuário não autorizado' })

    var user = await User.findById(req.userId);
    if(!user.isOrganizer) return res.status(400).send({ error: 'usuário não autorizado' })

    if(!await Event.findById(id))
      return res.status(400).send({ 'error': 'Evento não existe' })

    await Event.deleteOne({ _id: id });
    await Participant.deleteMany({ event: id });

    return res.status(200).send({ "ok": "Evento deletado" });
  } catch(err) {
    return res.status(400).send({ 'error': err });
  }
};

exports.editBydId = async function (req, res, next) {
  let id = req.params.id;
  let { title, description, date, location } = req.body;
  try {
    var event = await Event.findById(id);

    if(event.organizer._id != req.userId)
      return res.status(400).send({ error: 'Usuário não autorizado' })

    var user = await User.findById(req.userId);
    if(!user.isOrganizer)
      return res.status(400).send({ error: 'Usuário não autorizado' })

    const updateDoc = {
      $set: {
        description: description,
        title: title,
        date: date,
        location: location
      },
    };
    await Event.updateOne({ _id: id }, updateDoc, { multi: false, omitUndefined: true });
    return res.status(200).send({'ok': 'Evento editado'});
  } catch(err) {
    return res.status(400).send({ 'error': err });
  }
};

exports.subscribeParticipant = async function (req, res, next) {
  try {

    if(await Participant.find({ participant: req.userId, event: req.params.eventId }).countDocuments() <= 0)
      return res.status(400).json({"err": "Usuário já inscrito"})

    var event = await Event.findById(req.params.eventId).populate(['organizer', 'participants']);

    await Promise.all(
      event.participants.map(async participant => {
        if(participant.participant == req.userId) {
          return res.status(400).send({"error": "Usuário já inscrito neste evento"})
        }
      })
    );

    const eventParticipant = new Participant({ event: req.params.eventId, participant: req.userId });
    await eventParticipant.save()
    event.participants.push(eventParticipant);

    await event.save();

    return res.status(200).send(event);
  } catch(err) {
    return res.status(400).send({ 'error': err });
  }
};

exports.checkout = async function (req, res) {
  var eventId = req.params.id;

  try {
    if(await Participant.find({ event: eventId, participant: req.userId }).countDocuments() <= 0)
      return res.status(400).send({'err': 'Usuário não participa do evento'})

    if(await Participant.find({ event: eventId, participant: req.userId, hasPaid: true }).countDocuments() != 0)
      return res.status(400).send({'err': 'Já pagou'})

    await Participant.updateOne(
      { participant: req.userId },
      { $set: { hasPaid: true } },
      { multi: false, omitUndefined: true }
    );

    return res.status(200).json({'ok': 'ok'});
  } catch(err) {
    return res.status(400).send(err);
  }
};
