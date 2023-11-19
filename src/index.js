//este va a rrancar la APP (Se podria ver como un MAIN de java)
require('dotenv').config();//--> si existe un archivo al inicio llamado .env va aleer lo que tiene y lo asigna a las variables de entorno.

// ---------------------------------------------- INICIO Conexion al servidor --------------------------------------------------------------
const app = require('./server')// Estoy importando el servidor des de (server.js) para poder usar la variable llamada 'port'

// ---------------------------------------------- INICIO Conexion ala BD -------------------------------------------------------------------
require('./database');


app.listen(app.get('port'), () => {//--> llamo a la varible para que use el puerto configurado o por defecto.
    console.log('Escuchando al servidor por el puerto: ', app.get('port'))
})
