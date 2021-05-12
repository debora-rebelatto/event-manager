const express = require("express");

const UserController = require('../controllers/userController');

const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware);

router.get('/', authMiddleware, UserController.listUsers);
router.get('/info', authMiddleware, UserController.getUserInfo);
router.get('/participant', authMiddleware, UserController.eventsPartcipating);
router.get('/organizer', authMiddleware, UserController.eventsOrganizing);
router.get('/:id', authMiddleware, UserController.getById);
router.post('/organizerPermission/:id', authMiddleware, UserController.giveOrganizerPermission);
router.put('/', authMiddleware, UserController.edit);
router.delete('/:id', authMiddleware, UserController.delete);

module.exports = app => app.use("/user", router);