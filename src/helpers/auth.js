const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Usted no esta autorizado o no se ha registrado en la pagina.");
    res.redirect("/usuarios/ingresar")
  };

  module.exports = helpers;
