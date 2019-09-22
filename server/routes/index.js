const express = require('express');
const router = express.Router();

const Viajes = require('../models/Viajes');



module.exports = function(){
    router.get('/', (req, res) => {
        res.render('index', {
            pagina: 'Bienvenido a Agencia'
        });
    });

    router.get('/nosotros', (req, res) => {
        res.render('nosotros', {
            pagina: 'Sobre Nosotros'
        });
    });

    router.get('/viajes', (req, res) => {
       Viajes.findAll()
            .then(viajes => res.render('viajes',{
                pagina: 'Próximos Viajes',
                viajes
            }))
            .catch(error => console.log(error))
    });

    

    return router;
}