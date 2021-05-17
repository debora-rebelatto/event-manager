const User = require('../models/User');
const Event = require('../models/Event');
const Participant = require("../models/Participant");

// List Users
exports.listUsers = async function (req, res, next) {
  try {
    var users = await User.find();
    return res.status(200).send(users);
  } catch(err) {
    res.status(400).send({"error": err});
  }
};

// Get logged User info
exports.getUserInfo = async function (req, res, next) {
  try {
    var user = await User.findById(req.userId);
    return res.status(200).send( user );
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get events user is participating
exports.eventsPartcipating = async function (req, res, next) {
  try {
    var event = await Participant.find({ participant: req.userId });
    return res.status(200).send( event );
  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }
};

// Get events user is organizing
exports.eventsOrganizing = async function (req, res, next) {
  try {
    var event = await Event.find({ organizer: req.userId });
    return res.status(200).send( event );
  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }
};

// Get User by ID
exports.getById = async function (req, res, next) {
  var id = req.params.id;
  try {
    var user = await User.findById(id);
    return res.status(200).send( user );
  } catch (err) {
    res.status(400).send(err);
  }
};

// Give user permission to be organizer
exports.giveOrganizerPermission = async function (req, res, next) {
  var id = req.params.id;
  
  try {
    const updateDoc = { $set: { isOrganizer: true } };
    
    await User.updateOne({ _id: id }, updateDoc, { multi: false, omitUndefined: true });
    
    return res.status(200).json({'ok': 'ok'});
  } catch (err) {
    console.log("passou", err)
    res.status(400).send(err);
  }
};

// Edit user
exports.edit = async function (req, res, next) {
  var { name, college } = req.body;

  try {
    const updateDoc = {
      $set: {
        name: name,
        college: college
      },
    };

    await User.updateOne({ _id: req.userId }, updateDoc, { multi: false, omitUndefined: true });

    return res.status(200).send({ "ok" : "Usuário atualizado" });
  } catch (err) {
    res.status(400).send(err);
  }
};


// Delete User by ID
exports.delete = async function (req, res, next) {
  var id = req.params.id;

  try {
    await Participant.deleteMany({ participant: id })
    await Event.deleteMany({ organizer: id })
    await User.deleteOne({ _id: id });

    return res.status(200).send({ "ok" : "Usuário deletado" });
  } catch (err) {
    res.status(400).send(err);
  }
};
