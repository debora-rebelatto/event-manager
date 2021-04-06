const mongoose = require('../../database/database');

const ParticipantSchema = mongoose.Schema({
  participant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Event'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Participant = mongoose.model('Participant', ParticipantSchema);

module.exports = Participant;