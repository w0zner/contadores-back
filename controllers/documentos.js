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
    const uid = req.uid
    const documento = new Documento({
        usuario: uid,
        ...req.body
    })
    console.log(documento)
    
    try{
        const documentoDB = await documento.save()

        res.json({
            ok: true,
            documento: documentoDB
        })
    }catch(error){
        res.status(500).json({
            ok: false,
            msg: 'Error al crear documento'
        })
    }
}

const editarDocumento = async (req, res=response) => {
    const id = req.params.id
    const uid = req.uid

    try{
        const documento = Documento.findById(id)
        if(!documento) {
            res.status(404).json({
                ok: true,
                msg: 'Documento no encontrado'
            })
        }

        const cambios = {
            ...req.body,
            usuario: uid
        }

        //Actualizar documento
        const documentoActualizado = await Documento.findByIdAndUpdate(id, cambios, { new: true })

        res.json({
            ok: true,
            documento: documentoActualizado
        })

    } catch(error) {
        res.status(500).json({
            ok: true,
            msg: 'Error al actualizar el documento'
        })
    }
}

const actualizarDocumento = async (req, res=response) => {
    const id = req.params.id
    const uid = req.uid

    try{
        const documento = Documento.findById(id)
        if(!documento) {
            return res.status(404).json({
                ok: true,
                msg: 'Documento no encontrado'
            })
        }

        const cambios = {
            ...req.body,
            usuario: uid
        }

        //Actualizar documento
        const documentoActualizado = await Documento.findByIdAndUpdate(id, cambios, { new: true })

        res.json({
            ok: true,
            documento: documentoActualizado
        })

    } catch(error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el documento'
        })
    }
}

const eliminarDocumento = async (req, res=response) => {
    const id = req.params.id
    try {
        const documento = await Documento.findById(id)
        if(!documento) {
            return res.status(404).json({
                ok: true,
                msg: 'Documento no encontrado'
            })
        }

        await Documento.findByIdAndDelete(id)

        res.json({
            ok: true,
            msg: 'Documento eliminado correctamente'
        })
    } catch(error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el documento'
        })
    }
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