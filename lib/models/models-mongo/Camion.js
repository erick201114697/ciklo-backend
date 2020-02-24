const mongoose = require('mongoose');

const CamionSchema = new mongoose.Schema({
  modelo: { type: String, required: true },
  placa: { type: String, required: true },
  tipo: { type: String, required: true },
});

module.exports = mongoose.model('Camion', CamionSchema);
