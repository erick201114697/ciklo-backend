const mongoose = require('mongoose');

const PaqueteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
});

module.exports = mongoose.model('Paquete', PaqueteSchema);
