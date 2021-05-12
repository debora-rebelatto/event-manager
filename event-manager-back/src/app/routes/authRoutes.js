const express = require("express");

const AuthController = require('../controllers/authController')

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/authenticate', AuthController.authenticate);

module.exports = app => app.use("/auth", router);