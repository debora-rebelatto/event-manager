const mongoose = require('../../database/database')

const EventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;