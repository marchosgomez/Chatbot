const express = require('express')
const controlador = express.Router()

// Se utiliza express para controlar los mensajes recibidos y enviados
// pre -> pregunta enviada por el usuario
// res -> respuesta a enviar al usuario

const mensajes = async(pre, res) => {
    const texto = pre.body
    console.log (texto)
    res.send(texto)
}
controlador.post ('./chatwood', mensajes)

module.exports = controlador