const usuarioController = {};//creo un objeto para guardar los render
const Usuario = require('../models/Usuario');//estamos llamando al modelo de "Usuario".
const passport = require('passport');

//**********************************************************************/
usuarioController.renderRegistroForm = async (req, res) => {//Crea un nuevo Usuario
  res.render('usuarios/registro')
};

usuarioController.registro = async (req, res) => {//Crea un nuevo Usuario
  const errors = [];
  const { Nombre, Correo, Telefono, Direccion, Rol, Contrasena, Confirmar_contrasena } = req.body;

  if (Contrasena != Confirmar_contrasena) {
    errors.push({text: 'Las contraseñas no coinciden' });
  }
  if (Contrasena.length < 4) {
    errors.push({text: 'La contraseña dete tener almenos 4 caracteres' });
  }
  if (errors.length > 0) {
    res.render('usuarios/registro', {
      errors,
      Nombre,
      Correo,
      Telefono,
      Direccion,
      Rol,
    })
  }
  else {
    const correoUsuario = await Usuario.findOne({Correo: Correo});
    if (correoUsuario) {
      req.flash('error_msg', 'El correo ya esta en uso.')
      res.redirect('/usuarios/registrarse');
    }else{
      const newUsuario = new Usuario({ Nombre, Correo, Contrasena, Telefono, Direccion, Rol });//creo el usuario con los parametro obtenido
      newUsuario.Contrasena = await newUsuario.cifrarContraseña(Contrasena);
      const usuarioCreado = await newUsuario.save();//Se guarda el objeto en moongo
      req.flash('success_msg', 'El usuarios ha sido registrado')
      res.redirect('/usuarios/ingresar');
    }
  }
};

//**********************************************************************/
usuarioController.renderIngresarForm = (req, res) => {//Crea un nuevo Usuario
  res.render('usuarios/login')
};
usuarioController.ingresar = passport.authenticate('local',{
  failureRedirect:'/usuarios/ingresar',
  successRedirect:'/reportes',
  failureFlash: true
});//Ingresar
  
//Cerrar sesión
usuarioController.salir = (req, res) => {
    
  req.logout( (err) => {

      if (err) { return next(err); }
      req.flash( "success_msg" , "Session cerrada" );
      res.redirect( "/usuarios/ingresar" );

  });
}

//Todo es exportado para poder ser accedido a routes en "index.routes.js"
module.exports = usuarioController;



/*
usuarioController.crearUsuario = async (req, res) => {//Crea un nuevo Usuario
    console.table(req.body);//forma visual de ver lo que estoy enviando en la consola.--->>>> importante pra ver en consola los datos enviados desde el from
    try {
        const { Nombre, Correo, Contrasena, Telefono, Direccion, Rol } = req.body;//obtengo los parametros del curpo enviado
        console.log("Datos a guardar:", req.body);//es para ver los datos desde postama antes de guardar y ver si llegan o no.

        const newUsuario = new Usuario({ Nombre, Correo, Contrasena, Telefono, Direccion, Rol });//creo el usuario con los parametro obtenido

        //console.log(newUsuario);//Solo lo use para ver si estaba generardo el objeto para ser guardado en mongo.
        const usuarioCreado = await newUsuario.save();//Se guarda el objeto en moongo

        //res.send('nuevo Usuario creado');// se comento para poder ver el json de respuesta que esta abajo (se puede ver en postman)
        res.json(usuarioCreado);// con esto solo muestro los datos en json que se guardaron desde postman.

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear el usuario');
    }
};
*/