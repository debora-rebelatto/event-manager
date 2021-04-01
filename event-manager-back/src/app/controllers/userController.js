const express = require("express");

const User = require('../models/User');
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware);

// Get User by ID
router.get('/:id', authMiddleware, async(req, res) => {
  var id = req.params.id;

  try {
    var user = await User.findById(id);
    return res.status(200).send( user );
  } catch (err) {
    res.status(400).send({"error": err});
  }
});

module.exports = app => app.use("/user", router);