const express = require('express');
const path = require('path');
const router = express.Router();
const Sistema = require('../model/sistema');
const Usuarios = require('../model/usuario');

router.get('/', (req, res) => {
    res.redirect('/iniciar_sesion');
});

router.get('/iniciar_sesion', (req, res) => {
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
    res.redirect('/listar_contactos');
});

router.post('/validar_registro', async (req, res) => {
    console.log('Validar registro');

    var datosFormulario = req.body;
    if(datosFormulario.pass == datosFormulario.pass2){

        var nuevoUsuario = {
            nombre: datosFormulario.name
            ,usuario: datosFormulario.user
            ,clave: datosFormulario.pass
        };

        const usuario = new Usuarios(nuevoUsuario);
        
        await usuario.save();
        res.redirect('/iniciar_sesion');
    }

});

router.get('/registrarse', async (req, res) =>{
    res.render('registrarse_formulario');
});

module.exports = router;