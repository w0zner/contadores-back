const {Router}= require('express')
const {login, refreshToken} = require('../controllers/auth')
const {check} = require('express-validator')
const { validarCampos } = require('../middlewares/validaciones')
const {validarToken} = require('../middlewares/validarjwt')

const router = Router()

router.post('/', 
        [
            check('email', 'Ingrese un email válido').isEmail(),
            check('password', 'Ingrese una contraseña válida'). not().isEmpty(),
            validarCampos
        ],
        login)
    
router.get('/refreshToken', validarToken, refreshToken)

module.exports = router