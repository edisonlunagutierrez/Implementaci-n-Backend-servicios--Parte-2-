const express = require('express');//esto es para usar uno de los mondulos de "express"
const router = express.Router();//guardamos el objeto en un aconstante.

const { renderNewReporteForm, 
        crearReporte, 
        renderReporte, 
        renderEditForm, 
        updateReporte, 
        deleteReporte 
    } = require('../controllers/reporte.controller');//guardo en una constante el objeto con cada una de las exports


//autenticacion para que no pongan en la url de la ruta
const {isAuthenticated} = require('../helpers/auth');

//nuevo reporte
router.get('/reportes/add', isAuthenticated ,renderNewReporteForm);//Renderiza un nuevo formulario para poder generar un reporte
router.post('/reportes/new-reporte', isAuthenticated ,crearReporte);//envia el reporte

//obtener todos los respotes
router.get('/reportes',isAuthenticated , renderReporte);//obtener todos los reportes

//Editar reportes
router.get('/reportes/edit/:id',isAuthenticated ,renderEditForm);//esta es para mostrar el formulario

router.put('/reportes/edit/:id',isAuthenticated ,updateReporte);//esta es para mostrar el formulario

//Elimanar Reportes
router.delete('/reportes/delete/:id',isAuthenticated , deleteReporte)//se elemina el reporte por el id





module.exports = router;//eportamos el modelo