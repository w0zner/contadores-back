const fs = require('fs')
const Documento = require('../models/documento')

const borrarPDF = (path) => {
    if(fs.existsSync(path)) {
        //sustituye el archivo
        fs.unlinkSync(path)
    }
}

const actualizarPDF = async (coleccion, id, nombreDelArchivo) => {
    let pathAnterior = ''
    switch(coleccion) {
        case 'documentos':
            const documento = await Documento.findById(id)
            if(!documento){
                console.log('No se encontro el documento por id')
                return false
            }

            pathAnterior = `./uploads/documentos/${documento.pdf}`
            borrarPDF(pathAnterior)

            documento.pdf = nombreDelArchivo
            await documento.save()

            return true
        break
    }
}


module.exports = actualizarPDF