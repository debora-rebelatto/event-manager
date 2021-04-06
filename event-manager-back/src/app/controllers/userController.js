const express = require("express");

const User = require('../models/User');
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


module.exports = app => app.use("/user", router);