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
    res.render('listar_contactos', {contactos});
});

router.post('/modificar_contacto_formulario/', async (req, res) => {
    //res.send(req.body.numero);
    const datosContacto = req.body;
    const contacto = await Contactos.findOne({_id: datosContacto.id});
    res.render('modificar_contacto_formulario', {contacto});
});

router.post('/modificar_contacto', async (req, res) => {
    const datosFormulario = req.body;
    const datosEditados = {
        nombre: datosFormulario.name,
        detalle: datosFormulario.detail,
        numero: datosFormulario.number
    }
    await Contactos.updateOne({_id: datosFormulario.id}, datosEditados);
    res.redirect('/listar_contactos');
});

router.post('/eliminar_contacto/', async (req, res) => {
    const { id }  = req.body;
    let eliminar = await Contactos.deleteOne({_id: id});
    //res.json({"redirect": "listar_contactos", "estado":eliminar});
    res.redirect('/listar_contactos');
});
 
module.exports = router;