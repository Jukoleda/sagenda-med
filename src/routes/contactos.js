const express = require('express');
const router = express.Router();
const Contactos = require('../model/contacto');

router.post('/insertar_contacto', async (req, res) => {
    console.log('Insertar contacto');
    const datosFormulario = req.body;
   /* const contactos = new Contactos(req.body);
    await contactos.save();*/
    res.redirect('/listar_contactos');
});

router.get('/insertar_contacto_formulario', (req, res) => {
    res.render('insertar_contacto_formulario');
});

router.get('/listar_contactos', async (req, res) => {
    const contactos = await Contactos.find();
    res.render('listar_contactos', {contactos});
});


module.exports = router;