const express = require('express');
const router = express.Router();
const Contactos = require('../model/contacto');

router.post('/insertar_contacto', async (req, res) => {
    const datosFormulario = req.body;
    console.log(`Datos a insertar ${datosFormulario}`);
    var insertar = {
        nombre: datosFormulario.name
        ,detalle: datosFormulario.detail
        ,numero: datosFormulario.number
    };
    const contactos = new Contactos(insertar);
    await contactos.save();
    res.redirect('/listar_contactos');
});

router.get('/insertar_contacto_formulario', (req, res) => {
    res.render('insertar_contacto_formulario');
});

router.get('/listar_contactos', async (req, res) => {
    const contactos = await Contactos.find();
    console.log('listar_contactos', contactos);
    res.render('listar_contactos', {contactos});
});

router.post('/modificar_contacto_formulario/', async (req, res) => {
    //res.send(req.body.numero);
    const { numero } = req.body.numero;
    const contacto = await Contactos.find({numero: numero});
    res.render('modificar_contacto_formulario', contacto);
});

router.post('/modificar_contacto', async (req, res) => {
    const datosFormulario = req.body;
    await Contactos.updateOne({})
    res.redirect('/listar_contactos');
});

router.post('/eliminar_contacto/', async (req, res) => {
    const { numero}  = req.params;
    await Contactos.remove({numero: numero});
    res.redirect('/listar_contactos');
});
 
module.exports = router;