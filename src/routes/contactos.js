const express = require('express');
const router = express.Router();
const Contactos = require('../model/contacto');
const Sistema = require('../model/sistema');


const isAuth = (req, res, next) => {
    if(req.session.isAuth) {
        next();
    } else {
        res.redirect('/iniciar_sesion');
    }
}




router.post('/insertar_contacto', isAuth, async (req, res) => {

    let sesion = await Sistema.findOne({idSesion: req.session.id});

    if(sesion){



        
        let idUsuario = sesion.idUsuario;

        const datosFormulario = req.body;

        let validateError = {
            status: false,
            message: ''
        };
        
        if(!datosFormulario.name){
            validateError.message = "Debe ingresar un nombre.";
            validateError.status = true;
            return res.render('insertar_contacto_formulario', {error: validateError, sesionActiva: req.session.isAuth});
        }
        if(!datosFormulario.detail){
            validateError.message = "Debe ingresar un detalle.";
            validateError.status = true;
            return res.render('insertar_contacto_formulario', {error: validateError, sesionActiva: req.session.isAuth});
        }
        if(!datosFormulario.number){
            validateError.message = "Debe ingresar un número de teléfono.";
            validateError.status = true;
            return res.render('insertar_contacto_formulario', {error: validateError, sesionActiva: req.session.isAuth});
        }       
    
        let registrado = await Contactos.findOne({ $and :[{idUsuario: idUsuario},{numero: datosFormulario.number}]});
    
        if(registrado){
    
            validateError.message = "El numero ingresado ya esta registrado, por favor ingrese uno diferente.";
            validateError.status = true;
            return res.render('insertar_contacto_formulario', {error: validateError, sesionActiva: req.session.isAuth});
        }
    
        var insertar = {
            idUsuario: idUsuario
            ,nombre: datosFormulario.name
            ,detalle: datosFormulario.detail
            ,numero: datosFormulario.number
        };
        const contactos = new Contactos(insertar);
        await contactos.save();
        return res.redirect('/listar_contactos');
        
    }

    return res.redirect('/');

});

router.get('/insertar_contacto_formulario', isAuth, async (req, res) => {

    let sesion = await Sistema.findOne({idSesion: req.session.id});

    if(sesion){

        let validateError = {
            status: false,
            message: ''
        };
    
        return res.render('insertar_contacto_formulario', {error: validateError, sesionActiva: req.session.isAuth});
    }


    return res.redirect('/');
   
});

router.get('/listar_contactos', isAuth, async (req, res) => {

    let sesion = await Sistema.findOne({idSesion: req.session.id});

    if(sesion){

        let contactos = await Contactos.find({idUsuario: sesion.idUsuario});

        return res.render('listar_contactos', {contactos: contactos, sesionActiva: req.session.isAuth});
    }


    return res.redirect('/');

   
});

router.post('/modificar_contacto_formulario/', isAuth, async (req, res) => {
    //res.send(req.body.numero);

    let sesion = await Sistema.findOne({idSesion: req.session.id});

    if(sesion){
        const datosContacto = req.body;
        const contacto = await Contactos.findOne({_id: datosContacto.id});
        return res.render('modificar_contacto_formulario', {contacto: contacto, sesionActiva: req.session.isAuth});
    }
    return res.redirect('/');

});

router.post('/modificar_contacto', isAuth, async (req, res) => {
    let sesion = await Sistema.findOne({idSesion: req.session.id});

    if(sesion){

        const datosFormulario = req.body;
        const datosEditados = {
            nombre: datosFormulario.name,
            detalle: datosFormulario.detail,
            numero: datosFormulario.number
        }
        await Contactos.updateOne({_id: datosFormulario.id}, datosEditados);
        return res.redirect('/listar_contactos');

    }

    return res.redirect('/');

});

router.post('/eliminar_contacto/', isAuth, async (req, res) => {
    let sesion = await Sistema.findOne({idSesion: req.session.id});

    if(sesion){
        const { id }  = req.body;
        let eliminar = await Contactos.deleteOne({_id: id});
        //res.json({"redirect": "listar_contactos", "estado":eliminar});
        return res.redirect('/listar_contactos');
    }

    return res.redirect('/');
});
 
module.exports = router;