const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Usuarios = require('../model/usuario');
const Sistema = require('../model/sistema');
const { validate } = require('../model/sistema');



const isAuth = (req, res, next) => {
    if(req.session.isAuth) {
        next();
    } else {
        res.redirect('/iniciar_sesion');
    }
}


router.get('/', isAuth, async (req, res) => {
    let sesion = await Sistema.findOne({idSesion: req.session.id});
    
    if(sesion){
        return res.redirect('/listar_contactos');
    }

    return res.redirect('/iniciar_sesion');

});

router.get('/iniciar_sesion', (req, res) => {
    let error = {message: ''};
    res.render('iniciar_sesion', {error: error});
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
    };

    if(!datosFormulario.user) {
        validateError.status = true;
        validateError.message = "Debe ingresar un usuario";
        return res.render('iniciar_sesion', {error: validateError});
    }

    if(!datosFormulario.pass) {
        validateError.status = true;
        validateError.message = "Debe ingresar una contraseña";
        return res.render('iniciar_sesion', {error: validateError});
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

    let registroSistema = {
        idUsuario: usuario._id,
        idSesion: req.session.id,
        activo: true,
        fechaHora: new Date()
    };

    const nuevaSesion = new Sistema(registroSistema);

    await nuevaSesion.save();

    req.session.isAuth = true;


    res.redirect('/listar_contactos');
    


});

router.post('/validar_registro', async (req, res) => {
    console.log('Validar registro');

    let validateError = {
        status: false,
        message: ''
    };

    var datosFormulario = req.body;

    if(!datosFormulario.name){
        validateError.message = "Debe ingresar un nombre.";
        validateError.status = true;
        return res.render('registrarse_formulario', {error: validateError});
    }
    if(!datosFormulario.user){
        validateError.message = "Debe ingresar un nombre de ususario.";
        validateError.status = true;
        return res.render('registrarse_formulario', {error: validateError});
    }
    if(!datosFormulario.pass){
        validateError.message = "Debe ingresar una contraseña.";
        validateError.status = true;
        return res.render('registrarse_formulario', {error: validateError});
    }
    if(!datosFormulario.pass2){
        validateError.message = "Debe repetir la contraseña.";
        validateError.status = true;
        return res.render('registrarse_formulario', {error: validateError});
    }

    if(datosFormulario.pass != datosFormulario.pass2){
        validateError.message = "Las contraseñas ingresadas deben coincidir.";
        validateError.status = true;
        return res.render('registrarse_formulario', {error: validateError});
    }


    let registrado = await Usuarios.findOne({usuario: datosFormulario.user});

    if(registrado){

        validateError.message = "El nombre de usuario ya existe, por favor ingrese uno diferente.";
        validateError.status = true;
        return res.render('registrarse_formulario', {error: validateError});
    }




    let hashPass = await bcrypt.hash(datosFormulario.pass, 12);

    var nuevoUsuario = {
        nombre: datosFormulario.name
        ,usuario: datosFormulario.user
        ,clave: hashPass
    };

    const usuario = new Usuarios(nuevoUsuario);
    
    await usuario.save();
    return res.redirect('/iniciar_sesion');
    

});

router.get('/registrarse', async (req, res) =>{
    let validateError = {
        status: false,
        message: ''
    };

    res.render('registrarse_formulario', {error : validateError, sesionActiva: false});
});

router.get('/cerrar_sesion', async (req, res) => {
    let sesion = await Sistema.findOne({idSesion: req.session.id});
    if(sesion){
        req.session.destroy((err) => {
            if(err) throw err;
        });
        sesion.activo = false;
        await Sistema.updateOne({_id: sesion._id}, sesion);
    }
    
    res.redirect('/');
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