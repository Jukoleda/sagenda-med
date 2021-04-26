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

router.get('/insertar_contacto_formulario', isAuth, (req, res) => {
    res.render('insertar_contacto_formulario');
});

router.get('/listar_contactos', isAuth, async (req, res) => {

    let sesion = await Sistema.findOne({idSesion: req.session.id});

    if(sesion){

        let contactos = await Contactos.find({idUsuario: sesion.idUsuario});

        return res.render('listar_contactos', {contactos});
    }


    return res.redirect('/');

   
});

router.post('/modificar_contacto_formulario/', isAuth, async (req, res) => {n
    //res.send(req.body.numero);

    let sesion = await Sistema.findOne({idSesion: req.session.id});

    if(sesion){
        const datosContacto = req.body;
        const contacto = await Contactos.findOne({_id: datosContacto.id});
        res.render('modificar_contacto_formulario', {contacto});
    }
    return res.redirect('/');

});

router.post('/modificar_contacto', isAuth, async (req, res) => {
    let sesion = await Sesion.findOne({idSesion: req.session.id});

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
    let sesion = await Sesion.findOne({idSesion: req.session.id});

    if(sesion){
        const { id }  = req.body;
        let eliminar = await Contactos.deleteOne({_id: id});
        //res.json({"redirect": "listar_contactos", "estado":eliminar});
        return res.redirect('/listar_contactos');
    }

    return res.redirect('/');
});
 
module.exports = router;