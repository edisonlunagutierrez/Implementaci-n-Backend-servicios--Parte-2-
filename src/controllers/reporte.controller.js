const reporteController = {};//creo un objeto para guardar los render
const Reporte = require('../models/Reporte')
const { format, utcToZonedTime } = require('date-fns-tz');

reporteController.renderNewReporteForm = (req, res) => {//Visualiza el reporte
    //res.send('reporte add'); //Eras solo para enviar un texto en la pagina y probar la ruta.
    res.render('./reportes/new-reporte');//estamos renderizanbdo el formulario de la pagina para mostrarlo
    console.log('yyyyyyyyyp:',req.user.id)
}
reporteController.crearReporte = async (req, res) => {//Crea un nuevo reporte
    console.table(req.body);//forma visual de ver lo que estoy enviando en la consola.--->>>> importante pra ver en consola los datos enviados desde el from
    try {
        // Procesar el campo ubicacion
        const ubicacion = {
            type: req.body['ubicacion.type'],
            coordinates: req.body['ubicacion.coordinates'].split(',').map(coord => parseFloat(coord.trim()))
        };
    
        // Procesar el campo senalTransitoPresente
        const senalTransitoPresente = req.body['senalTransitoPresente'] === 'true';
    
        // Crear el objeto de reporte con los datos procesados
        const nuevoReporte = new Reporte({
            localidad: req.body.localidad,
            barrio: req.body.barrio,
            descripcion: req.body.descripcion,
            fechaIncidente: req.body.fechaIncidente,
            situacionRiesgo: req.body.situacionRiesgo,
            tipoActor: req.body.tipoActor,
            ubicacion: ubicacion,
            senalTransito: {
                presente: req.body.senalTransitoPresente === 'on',
                tipo: req.body.tipo,
                funcional: req.body.funcional === 'on',
                senalPropuesta: req.body.senalPropuesta,
                argumento: req.body.argumento,
            }
            
        });
        nuevoReporte.user = req.user.id;
    
        // Guardar el nuevo reporte en la base de datos
        await nuevoReporte.save();
        
        
        req.flash('success_msg','Reporte generado de forma correcta');
        res.redirect('/reportes');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el reporte' });
    }
};
reporteController.renderReporte = async (req, res) => {//obtiene todos los reportes
    const reportes = await Reporte.find({user: req.user.id}).sort({createdAt:'desc'});//Trae todos los reportes para comensar a mostrarlos.--------------------->> Importante
    res.render('./reportes/all-reporte',{reportes});
};

reporteController.renderEditForm = async(req, res) => {//va a mostrar el formulario a editar por el id
    const reporte = await Reporte.findById(req.params.id);

    if(reporte.user != req.user.id){
        req.flash('error_msg','Usted no esta autorizado.')//--------------------->> Importante       /edit/6558fa1e8fc46221f27fa5f0
        return res.redirect('/reportes');
    }
    console.log(reporte);

    // Obtener la fecha en formato UTC
    const fechaUtc = utcToZonedTime(reporte.fechaIncidente, 'UTC');
    // Formatear la fecha en la zona horaria local
    const fechaFormateada = format(fechaUtc, 'yyyy-MM-dd', { timeZone: 'America/Bogota' });

    // Agregar lógica para los campos de checkbox
    const presente = reporte.senalTransitoPresente = reporte.senalTransito.presente;
    reporte.funcional = reporte.senalTransito.funcional;
    
    res.render('reportes/edit-reporte', { reporte, fechaFormateada, presente});
};


reporteController.updateReporte = async (req, res) => {
    console.log(req.body);

    const {
        localidad,
        barrio,
        descripcion,
        fechaIncidente,
        situacionRiesgo,
        tipoActor,
        'ubicacion.coordinates': coordinatesStr,
        'ubicacion.type': type,
        senalTransitoPresente,
        'tipo': tipoSenal,
        funcional,
        senalPropuesta,
        argumento,
    } = req.body;
    
    // Convertir la cadena a un valor booleano
    const presente = senalTransitoPresente === 'on';
    
    await Reporte.findByIdAndUpdate(req.params.id, {
        localidad,
        barrio,
        descripcion,
        fechaIncidente,
        situacionRiesgo,
        tipoActor,
        ubicacion: { type, coordinates: coordinatesStr.split(',').map(Number) },
        senalTransito: {
            presente,
            tipo: tipoSenal,
            funcional,
            senalPropuesta,
            argumento,
        },
    });
    req.flash('success_msg','Reporte actualizado de forma correcta');
    res.redirect('/reportes');
}



reporteController.deleteReporte = async(req, res) => {//ELIMIANAR el reporte por el id
    //console.log(req.params.id);//solo quiero ver si se obtiene el id
    //res.send('Reporte eliminado');
    await Reporte.findByIdAndDelete(req.params.id);
    //res.send('eliminado');
    req.flash('success_msg','Reporte eliminado de forma correcta');
    res.redirect('/reportes');
}



//Todo es exportado para poder ser accedido a routes en "index.routes.js"
module.exports = reporteController;
