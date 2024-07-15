const {response} = require('express')
const Usuario = require('../models/usuario')
const Documento = require('../models/documento')

const getBuscar = async (req, res=response) => {
    try {
        const palabra= req.params.buscar
        const regExp = new RegExp(palabra, 'i')


        const [usuarios, documentos] = await Promise.all([
            Usuario.find({nombre: regExp}),
            Documento.find({nombre: regExp})
        ]) 

        res.json({
            ok: true,
            msg: 'Palabra buscada: ' + palabra,
            usuarios,
            documentos
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado al buscar'
        })
    }
}

const getDocumentos = async(req, res=response) => {
    try {
        const tabla = req.params.tabla
        const buscar = req.params.buscar
        const regExp = new RegExp(buscar, 'i')

        let data = []
        
        switch(tabla) {
            case 'documentos':
                data = await Documento.find({nombre: regExp}).populate('usuario', 'nombre email pdf')
                break
            case 'usuarios':
                data = await Usuario.find({nombre: regExp})
                //.populate('documentos', 'nombre fecha pdf')
                break
            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'Tabla no existente'
                })
        }

        res.json({
            ok: true,
            resultado: data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado al buscar'
        })
    }
}

module.exports = {
    getBuscar,
    getDocumentos
}