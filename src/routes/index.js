const express = require('express');
const path = require('path');
const router = express.Router();
const Sistema = require('../model/sistema');
const Usuarios = require('../model/usuario');

router.get('/', async (req, res) => {
    console.log('Iniciar sesion');
    res.render('iniciar_sesion');
});

router.post('/validar_sesion', async (req, res) =>{
    console.log('Validar sesion');

    var datosFormulario = req.body;

    const encontrado = await Usuarios.findOne({$and :[
        {usuario: datosFormulario.user},
        {clave: datosFormulario.pass},
        {estado: true}
    ]});

    console.log(encontrado);



    console.log(req.body);
    res.redirect('/');
});

router.post('/validar_registro', async (req, res) => {
    console.log('Validar registro');

    var datosFormulario = req.body;

    const usuario = new Usuarios(datosFormulario);
    
    await usuario.save();
    res.redirect('/iniciar_sesion');

});

router.get('/registrarse', async (req, res) =>{
    res.render('registrarse_formulario');
});

module.exports = router;