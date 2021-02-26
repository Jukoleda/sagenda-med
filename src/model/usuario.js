const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = Schema({
    usuario: String,
    nombre: String,
    clave: String,
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('usuarios', UsuarioSchema);