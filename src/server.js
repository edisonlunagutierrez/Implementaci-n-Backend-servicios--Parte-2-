

// codigo del servidor (Todo el manejo que tiene que tener el server para funcionar)
const express = require('express');//esto es para usar las configuraciones de "express"
const exphbs = require('express-handlebars');//Se usa para las plantillas de handlebars
const path = require('path');//esto es para usar las configuraciones de "path"
const morgan = require('morgan');//se usa para ver la peticiones realizadas
const methodOverride = require('method-override');//se usa para los metodos "delete" ya que no es facil de usar con formulario.
const flash = require('connect-flash');//Este modulo se usa para enviar mensajes entre vistas.
const sesion = require('express-session');//Este modulo se usa para guardar esos mesajes entre vistas.
const passport = require('passport');



// --------------------------------------- INICIO Inicializaciones -----------------------------------------------------------------------
// *********************** se inicia el servidor ********************************
const app = express();
require('./config/passport');
// ******************************************************************************



// --------------------------------------- INICIO Configuraciones ------------------------------------------------------------------------
//--> se encargara de hacer lo que yo quiera express basado en algunos modulos.

// *********************** Confuguracion pára un puerto ***********************
//--> hace referencia a una variable de entorno, (Solo si el sistema cuenta con esa variable)
app.set('port', process.env.PORT || 4000); //--> Pero si no use entonces el pueto que yo quiera..
//En palabras cortas, aqui defino la variable y el valor, prar despues llevarlo al  (index.js)

// *************** Confuguracion para encontrar la carpeta views **************
//--> Optine la direccion de la ruta "src" con (__dirname) y se concatena con "/views" con "path.join" para encontrar la carpeta.
app.set('views',path.join(__dirname + '/views')); 
//*****************************************************************************


//Configura el motor de plantillas de handlebars
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',//Se especifica el Layout por defeto
    layoutsDir: path.join(app.get('views'),'layouts'),//Se especifica donde van a estar los layouts
    partialsDir: path.join(app.get('views'),'partials'),//Se especifica donde van a estar los partials
    extname: '.hbs',// Y con que extencion van a estar.
     //CODIGO AGREGADO
     runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
  },

    //FIN
}));
app.set('view engine','.hbs');//Con esto se le dice que el motor de plantillas es lo configurado arriba.
//*****************************************************************************


// ------------------------------ -------INCIO Middlewares (software intermedio) ----------------------------------------------------------
//--> Seran las funciones que se iran ejecutando a medida de que llegan las peticiones.

// *********** Middlewares para  enviar y recivir datos a travez de un formato Json **********
app.use(express.urlencoded({extended:false}));//--> cada vez que llegue datos de un formulario trata de convertirlo en JSON.
app.use(morgan('dev'));//No me acuerdo no tocas jajaja
app.use(express.json());// procesar las solicitudes JSON
app.use(methodOverride('_method'));
app.use(sesion({
    secret:'secreto',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//********************************************************************************************


// ----------------------------- INCIO Goblas variables (Variables globales) ------------------------------------------------------------
//--> Para crear algunas variables las cuales se van a poder usar en toda las rutas del proyecto
app.use((req,res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.usuario = req.user || null;
    
    console.log('usuario:', res.locals.usuario);
    console.log('usuario222222:', req.user || null); // Cambiado a req.user en lugar de req.usuario
    next();
});
//*****************************************************************************************************/


// ------------------------------------------------- INICIO Routes (rutas) -------------------------------------------------------------
//--> Solo se van a importar las rutas de que va a ser creadas en la carpeta (routes)
/*app.get('/', (req,res) => {
    res.send('Hola mundo')
});

app.get('/', (req,res) => {
    res.render('index')
});*/

app.use(require('./routes/index.routes'));//Utilizamos el archivo "index.routes.js" que esta en routes.
app.use(require('./routes/reporte.routes'));//Utilizamos el archivo "reporte.routes.js" que esta en routes.
app.use(require('./routes/usuario.routes'));//Utilizamos el archivo "usuario.routes.js" que esta en routes.

// ----------------------------------------- INCIO Static files (Archivos estaticos) ----------------------------------------------------
app.use(express.static(path.join(__dirname + '/public')));





module.exports = app;