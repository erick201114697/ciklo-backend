const mongoose = require('mongoose');

const PilotoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  edad: { type: Number, required: true },
  dpi: { type: String, required: true },
});

module.exports = mongoose.model('Piloto', PilotoSchema);
