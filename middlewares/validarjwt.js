const { response } = require('express')
const jwt = require('jsonwebtoken')

const validarToken = (req, res= response, next) => {

    const token = req.header('x-token')
    
    if(!token) {
        return res.status(400).json({
            ok: false,
            msg: 'Token requerido para realizar esta acción'
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRET_PRIVATE_KEY)
        req.uid = uid
        next()
    } catch(error) {
        return res.status(400).json({
            ok: false,
            msg: 'Token invalido'
        })
    }
}

module.exports = {
    validarToken
}