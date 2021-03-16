const express = require('express');
const router = express.Router();
const Contactos = require('../model/contacto');

router.post('/insertar_contacto', async (req, res) => {
    const datosFormulario = req.body;
    console.log(`Datos a insertar ${datosFormulario}`);
    const contactos = new Contactos(datosFormulario);
    //await contactos.save();
    res.redirect('/listar_contactos');
});

router.get('/insertar_contacto_formulario', (req, res) => {
    res.render('insertar_contacto_formulario');
});

router.get('/listar_contactos', async (req, res) => {
    const contactos = await Contactos.find();
    res.render('listar_contactos', {contactos});
});

router.get('/modificar_contacto_formulario/:numero', (req, res) => {
    const { numero } = req.params;
    const contacto = await Contactos.find({numero: numero});
    res.render('modificar_contacto_formulario', contacto);
});

router.put('/modificar_contacto', async (req, res) => {
    const datosFormulario = req.body;
    await Contactos.updateOne({})
    res.redirect('/listar_contactos');
});

router.post('/eliminar_contacto', async (req, res) => {
    const numero = req.body.numero;
    await Contactos.remove({numero: numero});
    res.redirect('/listar_contactos');
});
 
module.exports = router;