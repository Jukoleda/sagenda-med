const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactoUsuarioSchema = Schema({
    numero: String,
    usuario: String
});

module.exports = mongoose.model('contactos_usuarios', ContactoUsuarioSchema);