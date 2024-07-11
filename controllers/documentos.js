const {response} = require('express')
const Documento = require('../models/documento')
const { async } = require('@firebase/util')

const getDocumentos = async (req, res=response) => {
    res.json({
        ok: true,
        msg: 'Obteniendo documentos'
    })
}

const getDocumentosID = async (req, res=response) => {
    res.json({
        ok: true,
        msg: 'Obteniendo documentos por ID'
    })
}

const getMisDocumentos = async (req, res=response) => {
    res.json({
        ok: true,
        msg: 'Obteniendo mis documentos'
    })
}

const crearDocumento = async (req, res=response) => {
    try{
        const uid = req.uid
        const documento = new Documento({
            usuario: uid,
            ...req.body
        })
        console.log(documento)

        res.json({
            ok: true,
            documento
        })
    }catch(error){
        res.status(500).json({
            ok: false,
            msg: 'Error al crear documento'
        })
    }
}

const editarDocumento = async (req, res=response) => {
    res.json({
        ok: true,
        msg: 'Obteniendo mis documentos'
    })
}

const actualizarDocumento = async (req, res=response) => {
    res.json({
        ok: true,
        msg: 'Obteniendo mis documentos'
    })
}

const eliminarDocumento = async (req, res=response) => {
    res.json({
        ok: true,
        msg: 'Obteniendo mis documentos'
    })
}

module.exports = {
    getDocumentos,
    getDocumentosID,
    getMisDocumentos,
    crearDocumento,
    editarDocumento,
    actualizarDocumento,
    eliminarDocumento
}