const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimoniales =  async (req, res) => {
    const testimoniales = await Testimonial.findAll()
    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales
    })
}

exports.validadAgregarTestimoniales =  async (req, res) =>{
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
        const testimoniales = await Testimonial.findAll()
        res.render('testimoniales', {
            errores,
            nombre,
            correo,
            mensaje,
            pagina: 'Testimoniales',
            testimoniales
        })
    }else{
        // almacenar en base de datos
        Testimonial.create({
            nombre,
            correo,
            mensaje
        })
        res.redirect('/testimoniales#testimonio')
    }
}