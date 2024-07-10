const { Router } = require('express')
const { check } = require('express-validator')
const { getUsuarios, createUserio, updatedUsuario, deleteUsuario } = require('../controllers/usuarios')
const { validarCampos } = require('../middlewares/validaciones')
const router = Router()

router.get('/', getUsuarios)

router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    createUserio)

router.put('/:id', updatedUsuario)

router.delete('/:id', deleteUsuario)


module.exports = router