const express = require("express");

const Event = require('../models/Event');
const User = require('../models/User');

const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.use(authMiddleware);

// Creating new event
router.post('/', authMiddleware, async (req, res) => {
  let { isFree, price } = req.body;
  try {
    var user = await User.findById(req.userId);

    if(!isFree && !price) return res.status(400).json({ "error": "Evento precisa ter preço" })

    if(!user.isOrganizer) return res.status(400).send({ error: 'Usuário não autorizado' })

    var event = await Event.create({ ...req.body, organizer: req.userId });
    return res.status(200).send(event)
  } catch(err) {
    return res.status(400).send({ 'error': err });
  }
});

// Get event by id
router.get('/:id', authMiddleware, async (req, res) => {
  var id = req.params.id;

  try {
    if(!await Event.findById(id))
      res.status(400).send({ 'error': 'Evento não existe' });

    var event = await Event.findById(id).populate(['organizer', 'participants']);

    return res.status(200).send(event);
  } catch(err) {
    return res.status(400).send({ 'error': err });
  }
});

// List events
router.get('/', authMiddleware, async (req, res) => {
  try {
    var events = await Event.find().populate(['organizer', 'participants']);

    return res.status(200).send( events );
  } catch(err) {
    return res.status(400).send({ 'error': err });
  }
});

// Delete event by id
router.delete('/:id', authMiddleware, async (req, res) => {
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
});

// Edit event by id
router.put('/:id', authMiddleware, async(req, res) => {
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
});

module.exports = app => app.use("/event", router);