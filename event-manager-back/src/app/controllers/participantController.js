const express = require("express");

const Participant = require("../models/Participant");
const Event = require('../models/Event');

const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware);

router.post('/:eventId', authMiddleware, async (req, res) => {
  try {
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
});

module.exports = app => app.use("/participant", router);