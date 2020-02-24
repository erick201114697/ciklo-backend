const mongoose = require('mongoose');

const AsignacionSchema = new mongoose.Schema({
  direccionOrigen: { type: String, required: true },
  direccionDestino: { type: String, required: true },
  piloto: { type: Object, required: true },
  camion: { type: Object, required: true },
  paquete: { type: Object, required: true },
  usuario: { type: Object, required: true },
});

module.exports = mongoose.model('Asignacion', AsignacionSchema);
