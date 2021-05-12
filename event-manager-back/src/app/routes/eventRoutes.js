const express = require("express");

const EventController = require('../controllers/eventController');

const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.use(authMiddleware);

router.get('/pdf/:id', EventController.getPdf);
router.get('/filter', authMiddleware, EventController.filterEvents);
router.post('/', authMiddleware, EventController.create);
router.get('/:id', authMiddleware, EventController.getById);
router.get('/', authMiddleware, EventController.list);
router.delete('/:id', authMiddleware, EventController.deleteById);
router.put('/:id', authMiddleware, EventController.editBydId);
router.post('/subscribeParticipant/:eventId', authMiddleware, EventController.subscribeParticipant);
router.post('/checkout/:id', authMiddleware, EventController.checkout);

module.exports = app => app.use("/event", router);