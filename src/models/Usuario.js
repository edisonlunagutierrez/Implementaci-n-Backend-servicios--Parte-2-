const {Schema, model} = require("mongoose");

//nos sirve para cifrar la contraseña
const bcrypt = require("bcrypt");



// Definición del esquema "Usuarios"
const usuarioSchema = new Schema({
    Nombre: { type: String, required: true },
    Correo: { type: String, required: true, unique: true },
    Contrasena: { type: String, required: true },
    Telefono: { type: String },
    Direccion: { type: String },
    Rol: { type: String }
});

//metodo cifrar la contraseña
usuarioSchema.methods.cifrarContraseña = async Contrasena => {
    const salt = await bcrypt.genSalt(10);//con que cantidad de caracteres se quiere cirfrar
    return await bcrypt.hash(Contrasena,salt);//contraseña cifrada
};

//metodo para verificar la contraseña en mongo con la dada e iniciar sesion con un boolean  true o false
usuarioSchema.methods.matchPassword = function(Contrasena) {//acccedemos a la funcion del squema de usuario para tomar la contraseña de la BD y comprarala
    return bcrypt.compare(Contrasena, this.Contrasena);//compara las contraseñas 
};

module.exports = model('Usuario', usuarioSchema);
