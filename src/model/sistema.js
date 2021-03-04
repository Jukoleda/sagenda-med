const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SistemaSchema = Schema({
    idUsuario: String,
    activo: String,
    fechaHora: Date
});

module.exports = mongoose.model('contactos', SistemaSchema);