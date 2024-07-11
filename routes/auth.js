const {Router}= require('express')
const {login} = require('../controllers/auth')
const {check} = require('express-validator')
const { validarCampos } = require('../middlewares/validaciones')

const router = Router()

router.post('/', 
        [
            check('email', 'Ingrese un email válido').isEmail(),
            check('password', 'Ingrese una contraseña válida'). not().isEmpty(),
            validarCampos
        ],
        login)

module.exports = router