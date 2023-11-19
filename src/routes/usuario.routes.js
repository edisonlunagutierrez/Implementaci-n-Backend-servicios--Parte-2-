const express = require('express');//esto es para usar uno de los mondulos de "express"
const router = express.Router();//guardamos el objeto en un aconstante.

const { renderRegistroForm, renderIngresarForm, registro, ingresar, salir} = require('../controllers/usuario.controller');


router.get('/usuarios/registrarse', renderRegistroForm);
router.post('/usuarios/registrarse', registro);

router.get('/usuarios/ingresar', renderIngresarForm);
router.post('/usuarios/ingresar', ingresar);


router.get('/usuarios/salir', salir);


module.exports = router;//eportamos el modelo


/*
const { crearUsuario

} = require('../controllers/usuario.controller');//guardo en una constante el objeto con cada una de las exports

router.post('/usuario/new-usuario', crearUsuario);//envia el reporte
*/
