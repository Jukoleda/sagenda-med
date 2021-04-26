const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SistemaSchema = Schema({
    idUsuario: String,
    idSesion: String,
    activo: Boolean,
    fechaHora: Date
});

module.exports = mongoose.model('sistema', SistemaSchema);