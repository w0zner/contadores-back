const { Router } = require('express')
const { getUsuarios, createUserio, updatedUsuario, deleteUsuario } = require('../controllers/usuarios')
const router = Router()

router.get('/', getUsuarios)

router.post('/', createUserio)

router.put('/:id', updatedUsuario)

router.delete('/:id', deleteUsuario)


module.exports = router