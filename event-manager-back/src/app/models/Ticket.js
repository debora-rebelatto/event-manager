const mongoose = require('../../database/database');

const TicketSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  quantityTickets: {
    type: Number,
    require: true,
  },
  isFree: {
    type: Boolean,
    required: true
  },
  price: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;