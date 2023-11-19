const { model } = require("mongoose");
const passport = require("passport");
const localStrategy = require('passport-local').Strategy;

const Usuario = require('../models/Usuario');

// Verifica usuario registrado
passport.use(new localStrategy({
    usernameField: 'Correo',
    passwordField: 'Contrasena'
}, async (Correo, Contrasena, done) => {

    // Confirmar si existe el usuario
    try {
        const usuario = await Usuario.findOne({ Correo });
        if (!usuario) {
            return done(null, false, { message: 'No se encontró el usuario' });
        } else {
            // Confirmar contraseña
            const match = await usuario.matchPassword(Contrasena);
            if (match) {
                return done(null, usuario);
            } else {
                return done(null, false, { message: 'Contraseña incorrecta' });
            }
        }
    } catch (error) {
        return done(error);
    }
}));

// Cuando el usuario sea registrado, se guardará en la sesión del servidor
passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
});

// Cuando el usuario empiece a navegar, passport hace la consulta en la bd para verificar si el id tiene permisos de navegar
passport.deserializeUser(async (id, done) => {
    try {
        const usuario = await Usuario.findById(id);
        done(null, usuario);
        console.log(usuario);
    } catch (error) {
        done(error);
    }

});
