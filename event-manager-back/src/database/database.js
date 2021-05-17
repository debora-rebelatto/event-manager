const mongoose = require("mongoose");

// Conectando no Mongo Atlas
mongoose.connect(
  process.env.MONGO_ATLAS,
  { useNewUrlParser: true, useUnifiedTopology: true }
)

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = mongoose;