//encargado de la conexion a la BD
const mongoose = require('mongoose');//--> solo se hace el llamado de mongoo para iniciar la conexion a la BD, nos ayuda aconectarnos atravez del metodo llamado "connect"

// Secrea la constante que va aguardar la url de la conexion a la BD
const MONGODB_URI = process.env.MONGODB_URI;
//Se utiliza la url para realizar la conexion a la BD.
mongoose.connect(MONGODB_URI,{

})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));


