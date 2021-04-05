const express = require("express");

const Event = require('../models/Event');
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.use(authMiddleware);

// Creating new event
router.post('/', authMiddleware, async (req, res) => {
  try {
    const event = await Event.create({ ...req.body, organizer: req.userId });
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

    var event = await (await Event.findById(id)).populate('organizer');
    return res.status(200).send(event);
  } catch(err) {
    return res.status(400).send({ 'error': err });
  }
});

// List events
router.get('/', authMiddleware, async (req, res) => {
  try {
    var events = await Event.find().populate('organizer');
    return res.status(200).send( events );
  } catch(err) {
    return res.status(400).send({ 'error': err });
  }
});

// Delete event by id
router.delete('/:id', authMiddleware, async (req, res) => {
  var id = req.params.id;

  try {
    if(!await Event.findById(id))
      return res.status(400).send({ 'error': 'Evento não existe' })

    await Event.deleteOne({ _id: id })
    return res.status(200).send({ "ok": "Evento deletado" });
  } catch(err) {
    return res.status(400).send({ 'error': err });
  }
});

// Edit event by id
router.post('/update/:id', async(req, res) => {
  let id = req.params.id;
  let { title, description, date, location } = req.body;
  try {
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
    //console.log(err)
    return res.status(400).send({ 'error': err });
  }
});

module.exports = app => app.use("/event", router);