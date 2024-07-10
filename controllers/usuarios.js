const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario')
//const User = require('../modelos/usuario')
//const { dbFirebaseConection } = require('../database/db')


//const firestore =dbFirebaseConection()

const getUsuarios = async (req, res= response)=> {
    const usuarios = await Usuario.find({}, 'nombre email curp telefono, role pdf')
    return res.json({
        ok: true,
        usuarios
    })
}

const createUserio = async(req, res=response)=> {
    const {nombre, email, password} = req.body
    

    //const plainObject = Object.assign({}, usuario);
    try {
        //const docRef = firestore.collection('prueba').doc(nombre)
        //await docRef.set(plainObject)

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

        res.status(201).json({
            ok: true,
            usuario
        })

        //res.status(201).json({usuario: docRef})
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

const deleteUsuario = (req, res)=> {
    return res.json({
        msg: 'Usuario eliminado'
    })
}

module.exports = {
    getUsuarios, createUserio, updatedUsuario, deleteUsuario
}