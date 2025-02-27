const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario')
const { creatToken } = require('../helpers/jwt')

const getUsuarios = async (req, res= response)=> {
    const usuarios = await Usuario.find({}, 'nombre email curp telefono, role pdf estado')
    return res.json({
        ok: true,
        usuarios,
        uid: req.uid
    })
}

const getUsuario = async (req, res= response) => {
    const uid = req.params.id

    try {
        const usuario = await Usuario.findById(uid)

        if(!usuario) {
            res.status(404).json({
                ok: true,
                msg: 'No existe el usuario'
            })
        }

        res.status(200).json({
            ok: true,
            usuario
        })        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const createUserio = async(req, res=response)=> {
    const {nombre, email, password} = req.body
    
    try {
        const existeEmail = await Usuario.findOne({email})

        if(existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }

        const usuario = new Usuario(req.body)

        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password, salt)

        await usuario.save()

        //const token = await creatToken(usuario.id)

        res.status(201).json({
            ok: true,
            usuario
            //token
        })
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const updatedUsuario = async (req, res= response)=> {

    const uid = req.params.id

    try {
        const existeusuarioDB = await Usuario.findById(uid)

        if(!existeusuarioDB) {
            res.status(404).json({
                ok: true,
                msg: 'No existe el usuario'
            })
        }

        const { password, email, ...campos} = req.body

        if(existeusuarioDB.email != email) {
            const existeEmail = await Usuario.findOne({email})
            if(existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese correo'
                })
            }
        }

        campos.email = email
        campos.role = existeusuarioDB.role
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true})

        res.status(200).json({
            ok: true,
            msg: 'Usuario actualizado exitosamente!'
        })

    } catch(error) {
        console.log(error)
        res.status(500).json('Error inesperado')
    }
}

const deleteUsuario = async (req, res= response)=> {
    const uid = req.params.id

    try {
        const existeusuarioDB = await Usuario.findById(uid)

        if(!existeusuarioDB) {
            res.status(404).json({
                ok: true,
                msg: 'No existe el usuario'
            })
        }

      await Usuario.findByIdAndDelete(uid)

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado exitosamente!'
        })

    } catch(error) {
        console.log(error)
        res.status(500).json('Error inesperado')
    }
}

module.exports = {
    getUsuarios, createUserio, updatedUsuario, deleteUsuario, getUsuario
}