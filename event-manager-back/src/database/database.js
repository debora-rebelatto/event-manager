const mongoose = require("mongoose");

// Conectando no Mongo Atlas
mongoose.connect(
  process.env.MONGO_ATLAS,
  { useNewUrlParser: true, useUnifiedTopology: true }
)

// Conectando no MongoDB Local
// mongoose.connect(
//   'mongodb://localhost:27017/event_manager',
//   { useNewUrlParser: true, useUnifiedTopology: true }
// )

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = mongoose;