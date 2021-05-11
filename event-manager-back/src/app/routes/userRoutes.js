const express = require("express");

const UserController = require('../controllers/userController');

const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware);

// List Users
router.get('/', authMiddleware, UserController.listUsers);

// Get logged User info
router.get('/info', authMiddleware, UserController.getUserInfo);

// Get events user is participating
router.get('/participant', authMiddleware, UserController.eventsPartcipating);

// Get events user is organizing
router.get('/organizer', authMiddleware, UserController.eventsOrganizing);

// Get User by ID
router.get('/:id', authMiddleware, UserController.getById);

// Give user permission to be organizer
router.post('/organizerPermission/:id', authMiddleware, UserController.giveOrganizerPermission);

// Delete User by ID
router.delete('/:id', authMiddleware, UserController.delete);

module.exports = app => app.use("/user", router);