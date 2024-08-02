const {response} = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario')
const { creatToken } = require('../helpers/jwt')
const { getMenu } = require('../helpers/menu')

const login = async (req, res= response) => {

    try{

        const {email, password} = req.body

        const usuarioDB = await Usuario.findOne({email})
        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            })
        }

        if(!usuarioDB.estado) {
            return res.status(403).json({
                ok: false,
                msg: 'Usuario inactivo'
            })
        }

        const passwordDB = bcrypt.compareSync(password, usuarioDB.password)
        if(!passwordDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Contraseña inconrrecta'
            })
        }

        //Generar token
        const token = await creatToken(usuarioDB.id)

        res.json({
            ok: false,
            msg: 'Usuario: [' + usuarioDB.nombre + '] logueado',
            token,
            menu: getMenu(usuarioDB.role)
        })

    } catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Favor pongase en contacto con un administrador'
        })
    }
}

const refreshToken = async (req, res= response) => {
    const uid = req.uid
    const token = await creatToken(uid)
    const usuario = await Usuario.findById(uid)

    res.json({
        ok: true,
        token,
        usuario,
        menu: getMenu(usuario.role)
    })
}

module.exports = {
    login,
    refreshToken
}