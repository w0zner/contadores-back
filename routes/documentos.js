const { Router} = require('express')
const { check} = require('express-validator')
const {validarCampos} = require('../middlewares/validaciones')
const {validarToken} = require('../middlewares/validarjwt')
const {getDocumentos,
    getDocumentosID,
    getMisDocumentos,
    crearDocumento,
    editarDocumento,
    actualizarDocumento,
    eliminarDocumento} = require('../controllers/documentos')

const router = Router()


router.get('/', getDocumentos)

router.get('/editar-documento/:id', getDocumentosID)
router.get('/mis-documentos/:id', getMisDocumentos)
router.post('/', crearDocumento)
router.put('/editar-documento/:id', editarDocumento)
router.put('/:id', actualizarDocumento)
router.delete('/:id', eliminarDocumento)

module.exports = router