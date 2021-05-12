const mongoose = require('../../database/database');

const EventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  initialDate: {
    type: Date,
    required: true,
  },
  finalDate: {
    type: Date,
    required: true,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quantityTickets: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
  },
  ticket: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
  }],
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Participant',
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;