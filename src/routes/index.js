const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Usuarios = require('../model/usuario');


router.get('/', (req, res) => {
    console.log(req.session);
    console.log(req.session.id);
    res.redirect('/iniciar_sesion');
});

router.get('/iniciar_sesion', (req, res) => {
    let error = {message: ''};
    res.render('iniciar_sesion', {error});
});

router.post('/validar_sesion', async (req, res) =>{

    let datosFormulario = req.body;


    let usuario = await Usuarios.findOne({
        $and :[
        {usuario: datosFormulario.user},
        {estado: true}
        ]
    });

    let validateError = {
        status : false,
        message : ''
    }

    if(!usuario) {
        validateError.status = true;
        validateError.message = "Usuario inexistente";
        return res.render('iniciar_sesion', {error: validateError});
    }

    let isMatch = await bcrypt.compare(datosFormulario.pass, usuario.clave)
    
    if(!isMatch){
        validateError.status = true;
        validateError.message = "Contraseña incorrecta";
        return res.render('iniciar_sesion', {error: validateError});
    }

    
    req.session.isAuth = true;


    res.redirect('/listar_contactos');
    


});

router.post('/validar_registro', async (req, res) => {
    console.log('Validar registro');

    var datosFormulario = req.body;
    if(datosFormulario.pass == datosFormulario.pass2){

        let hashPass = await bcrypt.hash(datosFormulario.pass, 12);

        var nuevoUsuario = {
            nombre: datosFormulario.name
            ,usuario: datosFormulario.user
            ,clave: hashPass
        };

        const usuario = new Usuarios(nuevoUsuario);
        
        await usuario.save();
        res.redirect('/iniciar_sesion');
    }

});

router.get('/registrarse', async (req, res) =>{
    res.render('registrarse_formulario');
});

router.get('/cerrar_sesion', (req, res) => {
    req.session.destroy((err) => {
        if(err) throw err;
        res.redirect('/');
    });
});

function validationErrorHandler(err, body) {
    switch(err) {
        case 'userNotFound':
            body['userNotFoundError'] = "Usuario inexsitente";
            break;

        default: break;
    }
}

module.exports = router;