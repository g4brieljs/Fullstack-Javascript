# Fullstack Javascript - Nodejs, Express, Sequelize, MySQL, ES6, ES7, MVC

Me llamo Gabriel Jiménez y he estado realizando el curso de Javascript Completo, he aprendido a usar las características más nuevas de Javascript, como Aync await, callbacks, Arrows functions, Spread operators, FETCH apis, Arrays Methods, Module,y un largo etc, también cree multiples proyectos con Javascript vanilla, y ReactJS, ahora este proyecto es un Fullstack Javascript, con Nodejs, Express, Sequelize, MySQL, ES6.


# Table contents

- [What is MVC](#project-mvc---model-view-controller)
- [Características de nuestro proyecto](#características-de-nuestro-proyecto)
- [Agregando las Vistas](#agregando-las-vistas-with-pug)
- [MySql - Sequelize](#características-de-nuestro-proyecto)
- [Agregando los Modelos](#agregando-las-vistas-with-pug)
- [Agreando los Controladores](#agreando-controladores-controloller)
- [Agregando Async Await ](#agregando-async-await-a-nuestro-proyecto)
- [Primera versión de la página](#página-web--agencia-de-viajes--nodejs---express---es6---sequelize---mysql---pug)
- [Agregandole Login - Singup - Dashboard al proyecto](#login--singup--dashboard--siguiente-nivel-a-nuestro-proyecto)

# Project MVC - MODEL VIEW CONTROLLER

### Model

Los modelos son los que se conectan a la base datos para poder enviar estos datos a las vistas.

### View

Las vista son es la muestra de los datos del modelo.

### Controller

El controlador se encarga de interactuar con el modelo, traer los datos, y indicar que vista se mostrará y en dónde.

# Características de nuestro proyecto

**First** install nodejs, and npm.

**Second** to start a package.json with command `npm init`.

**Third** install devpendecies:
- **body-parser** nodejs lo requiere para presentar ciertas informaciones.
- **Nodemon** verifica los cambios del servidor.
- **Express** es el servidor que utilizamos localmente, si tienes experiencia con php, es como Xamp.

### Configurando el servidor de express

Nodejs tiene la característica que utiliza la importación por modulos.

```js
// import express
const express = require('express');

// configurar express
const app = express();
// .use permite usar todos los verbos de HTTP, como delete, post, etc
// .get solo responde a el mismo
// app.get('/')
app.use('/', (req, res) => {
    res.send('Hello, world');
});

app.listen(3000);
```

# Express routing

Para organizar mejor nuestro código del backend, creamos una carpeta llamada routes en el server y agregamos un index.js para importar las rutas desde allí.

**Importante** en nuestra carpeta routes ahí definimos el tipo de http que se usa, en este caso un get, y en nuestro index.js principal, importamos estas rutas con un .use, para que así pueda aceptar cualquier tipo de verbo http, como delete, post, get, etc.

```js
const express = require('express');
const router = express.Router();

module.exports = function(){
    router.get('/', (req, res) => {
        res.send('Inicio');
    });

    router.get('/nosotros', (req, res) => {
        res.send('Nosotros');
    });

    return router;
}
```

# Agregando las vistas with pug

Primero creamos nuestra carpeta donde irán nuestras vistas, es decir, nuestras páginas webs, luego instalamos el Template engine,en mi caso es pug, pronto haré un tutorial con React, luego vamos a instalar pug como dependecia, luego en nuestro index.js del servidor vamos a require path, para acceder a las vistas.

```js
// path puede acceder a lo que se conoce como fileSystem
const path = require('path');

// agregar las vistas
// importamos path, para acceder a los archivos del servidor
// path.join(__dirname) esto indica la carpeta en la que estamos
// './views' esta nos indica la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));
```

Luego en nuestros routes en vez de send, usamos render, y colocamos el nombre de la carpeta de la página web:

```js
res.render('index');
```

# Agregar una Master page en Nodejs

Creamos un caperta llamada layout, o como desees, la llamamos así, para saber que ahí estarán todos los código reutilizables, recordandonos a PHP, este index principal por decirlo así, lo importaremos a nuestras páginas:

Lenguaje pug:
```pug
    extends ../layout/index
    block contenido
        h1 Hola
```

# Agregar archivos statics en nodejs

Para agregar archivos estaticos como hojas de estilos css, imagenes, etc, configuramos en nuestro server nodejs, con el framework express:

```js
app.use(express.static('public'));
```

# Agregar Javascript a nuestros Template 

La forma que se recomienda es con algo que se llama **locals**, esto se consideran como variables que Express pasará por los archivos

```js
res.locals.nuevoObjeto = 'Hola';
console.log(res.locals);

return next();
```

Estas variables podras leerlas en tus templates

# Agregando variables a nuestros views

Podemos mandarle variables desde nuestros routes:

Como puedes ver el primer parametro del router es en el enlace, y el segundo son opciones, en este caso mandamos una variable llamda pagina.
```js
    router.get('/nosotros', (req, res) => {
        res.render('nosotros', {
            pagina: 'Sobre Nosotros'
        });
    });
```

La agregamos con `#{pagina}`.

# Agregando base de datos | MySql - Sequelize 

Sequelize es un OMR, nos permite almacenar datos, y soporta conexion co base de datos como MySql, Postgres, etc.

```js
$ npm install --save mysql2 sequelize
```

# Creando modelos

Los modelos siempre estaran en contacto con tu base de datos.

Para definir el mapeo entre un modelo y las tablas de la base de datos, usas `define` method.

```js
const Project = Sequelize.define('project',{
    title: Sequelize.STRING,
    description: Sequelize.TEXT
})
```

# Usando Post en nodejs - Express

Para solicitar archivos del servidor usamos `.get`, y para enviar datos al servidor, usamos `.post`

```js
router.post('/testimoniales', (req, res) =>{
    console.log(req.body)
})
```

Y con bodyParser podemos leer esos datos:

```js
app.use(bodyParse.urlencoded({extended: true}));
```

# Promises in Nodejs 

Necesitamos enviar dos consultas de la base datos a nuestra página web:

Lo primero:

Creamos una array llamado promises, donde se guardarán nuestras promesas:
```js
const promises = [];
```

Lo segundo:

Creamos nuestras promesas:
```js
// Con promises.push mandamos nuestros modelos a el array
// Luego consultamos el primer modelo y con .findAll buscamos todos nuestras tablas de la base dedatos
// limit: 3 lo que hará es mandarnos solo 3 objetos, si tenemos más de 5 blogs solo nos mandará 3
promises.push(Modelo1.findAll({
    limit: 3
}))

promises.push(Modelo2.findAll({
    limit: 3
}))
```

Lo tercer:

```js
// pasar al promises
const resultado = Promise.all(promises);
```

Lo cuarto:

```js
// Colocamos todas las promesas con el .then
resultado.then()
```

Lo quinto:

Ahora vamos a decirle en que orden enviarnos nuestros datos de la base de datos:

```js
model1 : resultado[0],
model2 : resultado[1]
```

# Agreando Controladores Controloller

Los controladores permitirán manejar las consultas de la base de datos para mostrarlas en nuestras vistas, cuando creamos un modelo el cual nos permite conectarnos a los datos de la base de datos, podemos manejar esos datos con los controllers de la siguiente manera:

Primero creamos una carpeta llamada controllers, esto nos permitirá almacenar todas nuestros controladores y tendremos una organización más fácil.

Solicitamos nuestro modal:
```js
const Modelo1 = require('../models/Modelo1');
```
Solicitar datos:

Por ejemplo aquí solicitamos nuestros dos modelos con una promesa, de esta manera tenemos los datos de la base datos y podemos imprimirlas en las vistas:

Con `exports.NombredelMetodo` podemos exportar el bloque de código que esta manipulando los datos de la base dedatos que solicitamos arriba con `require('../models/Modelo1');`:

```js
exports.metodoconDosconsultas = (req, res) => {
    const promises = [];

    // limitando la cantidad 
    promises.push(Modelo1.findAll({
        limit: 3
    }))

    promises.push(Modelo2.findAll({
        limit: 3
    }))

    // pasar al promises
    const resultado = Promise.all(promises);

    // aqui el orden en como se mostraran nuestras pormesas:
    resultado.then(resultado => res.render('index',{
        pagina: 'Pagina web',
        // orden
        modelo1 : resultado[0],
        modelo2 : resultado[1]
    }))
    .catch(error => console.log(error))
}
```

Ahora vamos a importarla en nuestras rutas:
```js
router.get('/', archivoController.metodoconDosconsultas);
```

# Agregando Async Await a nuestro proyecto

Por default Sequelize es una herramienta que envia promesas, pero desde la versión 8 de Nodejs ya soporta Async Await.

**IMPORTANTE** Siempre que se consulte a la base de datos es más recomendable usar **Async Await**

Ventajas:
- Permite que sea más legible le código, más compacto.
- Ganaras más performance

**Con Promises**
```js
exports.metodoconDosconsultas = (req, res) => {
    const promises = [];

    // limitando la cantidad 
    promises.push(Modelo1.findAll({limit: 3}))
    promises.push(Modelo2.findAll({limit: 3}))

    // pasar al promises
    const resultado = Promise.all(promises);

    // aqui el orden en como se mostraran nuestras pormesas:
    resultado.then(resultado => res.render('index',{
        pagina: 'Pagina web',
        // orden
        modelo1 : resultado[0],
        modelo2 : resultado[1]
    }))
    .catch(error => console.log(error))
}
```

**Async Await**
```js
exports.metodoconDosconsultas = async (req, res) => {

    // limitando la cantidad 
    const modelo1 = await Modelo1.findAll({limit: 3});
    const modelo2 = await Modelo2.findAll({limit: 3})
    
    res.render('index',{
        pagina: 'Pagina web',
        // Object literal Enhancment  
        modelo1,
        modelo2 
    })
}
```

# Página web | Agencia de viajes | Nodejs - Express - ES6 - Sequelize - Mysql - Pug

# Proyecto final | Home

![home](https://github.com/g4brieljs/Fullstack-Javascript/blob/master/public/img/home-agencia.png)


# Proyecto final | Nosotros

![nosotros](https://github.com/g4brieljs/Fullstack-Javascript/blob/master/public/img/nosotros_landing.png)

# Proyecto final | Viajes

![viajes](https://github.com/g4brieljs/Fullstack-Javascript/blob/master/public/img/viajes_mysql.png)

### Viaje/:id

![viaje/id](https://github.com/g4brieljs/Fullstack-Javascript/blob/master/public/img/viaje_id.png)

# Proyecto final | Testimoniales

![testimoniales](https://github.com/g4brieljs/Fullstack-Javascript/blob/master/public/img/testimonios.png)

# Login / Singup / Dashboard / Siguiente nivel a nuestro proyecto


