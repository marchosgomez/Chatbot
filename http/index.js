const express = require('express')
const routes = require('./routes/chatwood.js')

// Clase que emula un servidor http para poder conectarse desde whatsapp
// Usando el puerto 3001 o el que queramos
// La aplicación utiliza json y el fichero de rutas

class ServidorHttp {
    aplicacion;
    puerto = process.env.PORT ?? 3001;

    constructor() {

    }

    crearAplicacion() {
        return (
            this.app = express()
                .use(express.json())
                .use(routes)
                .listen(this.puerto, () => console.log('Listo'))
        )
    }

    start() {
        this.crearAplicacion()
    }
}

module.exports = ServidorHttp