const express = require('express');
const router = express.Router();
const Contactos = require('../model/contacto');

router.post('/insertar_contacto', async (req, res, next) => {
    const contactos = new Contactos(req.body);
    await contactos.save();
    res.redirect('/listar_contactos');
});

router.get('/listar_contactos', async (req, res, next) => {
    const contactos = await Contactos.find();
    res.render('mostrar_contactos', {contactos});
});

module.exports = router;