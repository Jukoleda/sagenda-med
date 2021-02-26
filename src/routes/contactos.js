const express = require('express');
const router = express.Router();
const Contactos = require('../model/contacto');

router.post('/insertar_contacto', async (req, res, next) => {
    const contactos = new Contactos(req.body);
    await contactos.save();
    res.redirect('/listar_contactos');
});



module.exports = router;