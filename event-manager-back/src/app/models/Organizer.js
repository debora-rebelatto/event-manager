const mongoose = require('../../database/database');

const OrganizerSchema = mongoose.Schema({
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Organizer = mongoose.model('Organizer', OrganizerSchema);

module.exports = Organizer;