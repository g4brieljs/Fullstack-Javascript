const Viajes = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

exports.consultasHomepage = async (req, res) => {
    
    // limitando la cantidad 
    const viajes = await Viajes.findAll({limit: 3});
    const testimoniales = await Testimonial.findAll({limit: 3});

    res.render('index',{
        pagina: 'Próximos Viajes',
        clase: 'home',
        viajes,
        testimoniales
    })
}