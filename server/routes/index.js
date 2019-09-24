const express = require('express');
const router = express.Router();

/* Controllers */
const homeController = require('../controllers/homeController')
const nosotrosController = require('../controllers/nosotrosController')
const viajesController = require('../controllers/viajesController')
const testimonialesController = require('../controllers/testimonialesController')



module.exports = function(){
    router.get('/', homeController.consultasHomepage);

    router.get('/nosotros', nosotrosController.infoNosotros);

    router.get('/viajes', viajesController.mostraViajes);

    router.get('/viajes/:id', viajesController.mostrarViaje);

    router.get('/testimoniales', testimonialesController.mostrarTestimoniales);

    // Cuando se llene el form de testimonios
    router.post('/testimoniales',  testimonialesController.validadAgregarTestimoniales)

    

    return router;
}