const path = require('path')
const fs = require('fs')

const { response } = require('express')
const { v4: uuidv4 } = require('uuid');
const actualizarPDF = require('../helpers/actualizarPDF');

const fileUpload = (req, res) => {
    try {
        const coleccion = req.params.coleccion
        const id = req.params.id

        const coleccionesValidas = ['documentos','usuarios']

        if(!coleccionesValidas.includes(coleccion)) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe la colección'
            })
        }

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe el archivo a subir'
            });
        }

        const file = req.files.pdf
        const acortarNombre = file.name.split('.')
        const extensionArchivo = acortarNombre[acortarNombre.length - 1]

        //Validar extension
        const validarExtensiones = ['pdf', 'xml', 'zip', 'rar']

        if(!validarExtensiones.includes(extensionArchivo)) {
            return res.status(400).json({
                ok: false,
                msg: 'No es una extensión válida, favor añadir un pdf, xml, zip o rar'
            });
        }

        const nombreDelArchivo = `${uuidv4()}-${acortarNombre[0]}.${extensionArchivo}`

        const path = `./uploads/${coleccion}/${nombreDelArchivo}`

        file.mv(path, (err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    ok: false,
                    msg: 'Error al subir el archivo'
                });
            }

            actualizarPDF(coleccion, id, nombreDelArchivo)
            res.json({
                ok: true,
                msg: 'El archivo se ha subido de forma exitosa!',
                archivo: nombreDelArchivo
            });
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado al subir archivo'
        })
    }
}

const obtenerPDF = (req, res=response) => {
    try {
        const coleccion = req.params.coleccion
        const archivo = req.params.pdf
    
        const pathFile = path.join(__dirname, `../uploads/${coleccion}/${archivo}`)
        console.log(pathFile)
        if(fs.existsSync(pathFile)) {
            res.sendFile(pathFile)
        } else {
            const pathFile = console.log('No se encontro el archivo solicitado')
            res.sendFile(pathFile)
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado al obtener archivo'
        })
    }
}

module.exports = {
    fileUpload,
    obtenerPDF
}