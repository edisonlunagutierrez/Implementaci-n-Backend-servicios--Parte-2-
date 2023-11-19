const indexController = {};//creo un objeto para guardar los render

indexController.renderIndex = (req,res) => {//Visualiza el index
    res.render('index');
}
indexController.renderAbout = (req,res) => {//Visualiza el about
    res.render('about');
}

//Todo es exportado para poder ser accedido a routes en "index.routes.js"
module.exports = indexController;