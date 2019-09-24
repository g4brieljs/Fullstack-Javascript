const express = require('express');
const router = express.Router();

const Viajes = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');



module.exports = function(){
    router.get('/', (req, res) => {
        const promises = [];

        // limitando la cantidad 
        promises.push(Viajes.findAll({
            limit: 3
        }))

        promises.push(Testimonial.findAll({
            limit: 3
        }))

        // pasar al promises
        const resultado = Promise.all(promises);
        
        resultado.then(resultado => res.render('index',{
            pagina: 'Próximos Viajes',
            clase: 'home',
            viajes : resultado[0],
            testimoniales : resultado[1]
        }))
        .catch(error => console.log(error))
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
        Testimonial.findAll()
            .then(testimoniales => res.render('testimoniales', {
                    pagina: 'Testimoniales',
                    testimoniales
            }));
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

        if(errores.length > 0 ){
            // mostrar la vista con errores
            res.render('testimoniales', {
                errores,
                nombre,
                correo,
                mensaje
            })
        }else{
            // almacenar en base de datos
            Testimonial.create({
                nombre,
                correo,
                mensaje
            })
            .then(testimonial => res.redirect('/testimoniales#testimonio'))
            .catch(error => console.log(error));
        }
    })

    

    return router;
}