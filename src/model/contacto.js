const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactoSchema = Schema({
    nombre: String,
    detalle: String,
    numero: String,
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('_contactos', ContactoSchema);