const express = require('express');//esto es para usar uno de los mondulos de "express"
const router = express.Router();//guardamos el objeto en un aconstante.

const { renderIndex,renderAbout} = require('../controllers/index.controller')//guardo en una constante el objeto con cada una de las exports


//Definimos aqui las rutas para luego ser llamadas o exportadas al archivo "index.js"
//Crearmos las rutas aqui.

router.get('/', renderIndex);//uso el export de "index.controller" para acceder al "Index"
router.get('/about',renderAbout);//uso el export de "index.controller" para acceder al "About"

module.exports = router;//eportamos el modelo
