const express = require("express");

const Event = require('../models/Event');
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.use(authMiddleware);

// Creating new event
router.post('/', authMiddleware, async (req, res) => {
  try {
    const event = await Event.create({ ...req.body, eventOwner: req.userId });
    return res.status(200).send(event)
  } catch(err) {
    return res.status(400).send({ 'error': err });
  }
});

// Get event by id
router.get('/:id', authMiddleware, async (req, res) => {
  var id = req.params.id;

  try {
    var event = await Event.findById(id);
    return res.status(200).send(event);
  } catch(err) {
    return res.status(400).send({ 'error': err });
  }
});

// List events
router.get('/', authMiddleware, async (req, res) => {
  try {
    var events = await Event.find();
    return res.status(200).send( events );
  } catch(err) {
    return res.status(400).send({ 'error': err });
  }
});

// Delete event by id
router.delete('/:id', authMiddleware, async (req, res) => {
  var id = req.params.id;

  try {
    return res.status(200).send({ 'ok': 'ok' });
  } catch(err) {
    return res.status(400).send({ 'error': err });
  }
});

module.exports = app => app.use("/event", router);