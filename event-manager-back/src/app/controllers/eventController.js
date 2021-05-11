const express = require("express");
const PDFDocument = require('pdfkit');
const fs = require('fs');

const Event = require('../models/Event');
const User = require('../models/User');
const Participant = require('../models/Participant');

const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware);

//Query filter
exports.getPdf = async function (req, res, next) {
  try {
    var user = await User.findById(req.userId);
    var event = await Event.findById(req.params.id).populate('organizer');

    let doc = new PDFDocument({ size: "A4", margin: 50, layout: 'landscape' });

    doc
      .text("Certifico que", { align: 'center' })
    doc
      .text(`${user.name}`, { align: 'center' })
    doc
      .text('Participou do evento', { align: 'center' });
    doc
      .text(`ministrado por ${event.organizer.name}`, { align: 'center' });
    doc
      .text(`de ${event.initialDate} até ${event.finalDate}, cumprindo carga horária total de 10 horas`,
        { align: 'center' }
      );
    doc
      .text(`${event.organizer.name}`, { align: 'center' });

    doc.end();
    doc.pipe(fs.createWriteStream(`certificado${user.name}.pdf`));

    return res.status(200).json({'ok': 'ok'});

  } catch(err) {
    return res.status(400).send({ 'error': err });
  }
};


//Query filter
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

// Creating new event
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

// Get event by id
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

// List events
exports.list = async function (req, res, next) {
  try {
    var events = await Event.find().populate(['organizer', 'participants']);

    return res.status(200).send( events );
  } catch(err) {
    return res.status(400).send({ 'error': err });
  }
};

// Delete event by id
exports.deleteById = async function (req, res, next) {
  var id = req.params.id;

  try {
    var event = await Event.findById(id);

    if(event.organizer._id != req.userId)
      return res.status(400).send({ error: 'Usuário não autorizado' })

    var user = await User.findById(req.userId);
    if(!user.isOrganizer) return res.status(400).send({ error: 'usuário não autorizado' })

    if(!await Event.findById(id))
      return res.status(400).send({ 'error': 'Evento não existe' })

    await Event.deleteOne({ _id: id })
    return res.status(200).send({ "ok": "Evento deletado" });
  } catch(err) {
    return res.status(400).send({ 'error': err });
  }
};

// Edit event by id
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

    // if(await Participant.find({ participant: req.userId, event: req.params.eventId }))
    //   return res.status(400).json({"err": "Usuário já inscrito"})

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
    console.log(err)
    return res.status(400).send({ 'error': err });
  }
};

// Edit event by id
exports.checkout = async function (req, res, next) {
  var eventId = req.params.eventId;

  try {

    // var part = await Participant.find({ participant: req.userId, event: eventId });

    // console.log(part)

    // if(await Participant.find({ participant: req.userId, event: eventId }))
    //   return res.status(400).json({'err': 'usuário não participa do evento'});

    // if(!await Participant.find({ participant: req.userId, event: eventId, hasPaid: true }))
    //   return res.status(400).json({'err': 'usuário já pagou evento'});



    // var event = await Event.findById(eventId).populate('organizer');

    // var participant = await Participant.findById({ participant: req.userId });

    // const updateEvent = { $set: { hasPaid: true } };

    // var participant = await Participant.updateOne(
    //   { participant: req.userId },
    //   updateEvent,
    //   { multi: false, omitUndefined: true }
    // );

    // var organizer = event.organizer;

    // var updatedp = await Participant.find({ participant: req.userId })
    // console.log(updatedp);

    // const updateDoc = {
    //   $set: {
    //     received: description,
    //     title: title,
    //     date: date,
    //     location: location
    //   },
    // };
    // await Event.updateOne({ _id: id }, updateDoc, { multi: false, omitUndefined: true });

    return res.status(200).send({'ok': 'ok'});
  } catch(err) {
    return res.status(400).send({ 'error': err });
  }
};
