const {Router}=require('express')
const { validarToken } = require('../middlewares/validarjwt')
const { fileUpload, obtenerPDF } = require('../controllers/upload')

const router = Router()

router.put('/:coleccion/:id', validarToken, fileUpload)
router.get('/:coleccion/:pdf', obtenerPDF)

module.exports = router
