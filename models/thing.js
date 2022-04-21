const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  key: { type: String, required: true },
  description: { type: String, required: false },
  francais: { type: String, required: false },
  anglais: { type: String, required: false},
  dateDeCréation: { type: Date, required: true },
  dateDeModification: { type: Date, required: true},
});

module.exports = mongoose.model('Thing', thingSchema);