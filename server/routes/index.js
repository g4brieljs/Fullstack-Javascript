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

    router.get('/viajes/:id', (req, res) => {
        Viajes.findByPk(req.params.id)
            .then(viaje => res.render('viaje', {
                viaje
            }))
            .catch(error => console.log(error))
    });

    router.get('/testimoniales', (req, res) => {
        res.render('testimoniales', {
            pagina: 'Testimoniales'
        });
    });

    // Cuando se llene el form de testimonios
    router.post('/testimoniales', (req, res) =>{
        // validar que todos los campos esten llenos
        let {nombre, correo, mensaje} = req.body;

        let errores = [];
        if(!nombre){
            errores.push({'Mensaje' : 'Agrega tu nombre'})
        }
        if(!correo){
            errores.push({'Mensaje' : 'Agrega tu correo'})
        }
        if(!mensaje){
            errores.push({'Mensaje' : 'Agrega tu mensaje'})
        }

        // revisar errores

        if(errores.length > 0){
            // mostrar la vista con errores
        }else{
            // almacenar en base de datos
        }
    })

    

    return router;
}