const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactoSchema = Schema({
    idUsuario: String,
    nombre: String,
    detalle: String,
    numero: String,
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('contactos', ContactoSchema);