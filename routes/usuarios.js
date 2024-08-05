const { Router } = require('express')
const { check } = require('express-validator')
const { getUsuarios, createUserio, updatedUsuario, deleteUsuario, getUsuario } = require('../controllers/usuarios')
const { validarCampos } = require('../middlewares/validaciones')
const { validarToken } = require('../middlewares/validarjwt')
const router = Router()

router.get('/', validarToken , getUsuarios)

router.get('/:id', validarToken , getUsuario)

router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ], 
    createUserio)

router.put('/:id', 
    [
        validarToken,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    updatedUsuario)

router.delete('/:id', validarToken, deleteUsuario)


module.exports = router