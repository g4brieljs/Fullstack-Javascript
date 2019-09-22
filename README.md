# Fullstack Javascript - Nodejs and Javascript ES6

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

# Página web | Agencia de viajes | Nodejs - Express - ES6 - Sequelize - Mysql - Pug

# Proyecto final | Nosotros

![first-triggers](https://github.com/g4brieljs/Fullstack-Javascript/blob/master/public/img/nosotros_landing.png)

# Proyecto final | Viajes

![first-triggers](https://github.com/g4brieljs/Fullstack-Javascript/blob/master/public/img/viajes_mysql.png)

### Viaje/:id

![first-triggers](https://github.com/g4brieljs/Fullstack-Javascript/blob/master/public/img/viaje_id.png)

# Proyecto final | Testimoniales

![first-triggers](https://github.com/g4brieljs/Fullstack-Javascript/blob/master/public/img/testimonios.png)


