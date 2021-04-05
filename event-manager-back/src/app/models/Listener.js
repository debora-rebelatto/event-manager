const mongoose = require('../../database/database');

const ListenerSchema = mongoose.Schema({
  listener: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Listener = mongoose.model('Listener', ListenerSchema);

module.exports = Listener;