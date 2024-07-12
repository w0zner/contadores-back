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

//Crear documento después de crear el documento
router.post('/', 
[
    validarToken,
    check('nombre', 'el nombre del documento es requerido').not().isEmpty(),
    validarCampos
], 
crearDocumento)

//Actualizar documento después de crear el documento
router.put('/:id',
[
    validarToken,
    check('nombre', 'el nombre del documento es requerido').not().isEmpty(),
    validarCampos
],
actualizarDocumento)

//Actualizar documento seleccionado
router.put('/editar-documento/:id',
[
    validarToken,
    check('nombre', 'el nombre del documento es requerido').not().isEmpty(),
    validarCampos
],
editarDocumento)

router.delete('/:id',
[
    validarToken
],
eliminarDocumento)

module.exports = router