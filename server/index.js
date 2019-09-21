// import express
const express = require('express');
// path puede acceder a lo que se conoce como fileSystem
const path = require('path');
const routes = require('./routes');

// configurar express
const app = express();

// habilitar el pug
app.set('view engine', 'pug');

// agregar las vistas
// importamos path, para acceder a los archivos del servidor
// path.join(__dirname) esto indica la carpeta en la que estamos
// './views' esta nos indica la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// Cargar carpetas statics
app.use(express.static('public'));

// mostrar el año actual
app.use((req, res, next) => {
    // crear fecha
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    return next();
});

// cargar las rutas
app.use('/', routes());

app.listen(3000);
