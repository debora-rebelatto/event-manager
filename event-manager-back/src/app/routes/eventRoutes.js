const express = require("express");

const EventController = require('../controllers/eventController');

const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.use(authMiddleware);

//Query filter
router.get('/pdf/:id', EventController.getPdf);

//Query filter
router.get('/filter', authMiddleware, EventController.filterEvents);

// Creating new event
router.post('/', authMiddleware, EventController.create);

// Get event by id
router.get('/:id', authMiddleware, EventController.getById);

// List events
router.get('/', authMiddleware, EventController.list);

// Delete event by id
router.delete('/:id', authMiddleware, EventController.deleteById);

// Edit event by id
router.put('/:id', authMiddleware, EventController.editBydId);

// Subscribe participant
router.post('/subscribeParticipant/:eventId', authMiddleware, EventController.subscribeParticipant);

router.post('/checkout/:eventId', authMiddleware, EventController.checkout);


module.exports = app => app.use("/event", router);