const express = require("express");

const User = require('../models/User');
const Event = require('../models/Event');

const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware);

// List Users
router.get('/', authMiddleware, async(req, res) => {
  try {
    var users = await User.find();
    return res.status(200).send(users);
  } catch(err) {
    res.status(400).send({"error": err});
  }
});

// Get logged User info
router.get('/info', authMiddleware, async(req, res) => {
  try {
    var user = await User.findById(req.userId);
    return res.status(200).send( user );
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get events user is participating
router.get('/participant', authMiddleware, async(req, res) => {
  try {
    var event = await Event.find({participant: req.userId});
    return res.status(200).send( event );
  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }
});

// Get events user is organizing
router.get('/organizer', authMiddleware, async(req, res) => {
  try {
    var event = await Event.find({ organizer:req.userId });
    return res.status(200).send( event );
  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }
});

// Get User by ID
router.get('/:id', authMiddleware, async(req, res) => {
  var id = req.params.id;
  try {
    var user = await User.findById(id);
    return res.status(200).send( user );
  } catch (err) {
    res.status(400).send(err);
  }
});

// Give user permission to be organizer
router.post('/organizerPermission/:id', authMiddleware, async(req, res) => {
  var id = req.params.id;

  try {
    const updateDoc = { $set: { isOrganizer: true } };
    await User.updateOne({ _id: id }, updateDoc, { multi: false, omitUndefined: true });

    return res.status(200);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete User by ID
router.delete('/:id', authMiddleware, async(req, res) => {
  var id = req.params.id;

  try {
    await User.deleteOne({ _id: id })

    return res.status(200).send({ "ok" : "Usuário deletado" });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = app => app.use("/user", router);