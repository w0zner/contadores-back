const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario')
//const User = require('../modelos/usuario')
//const { dbFirebaseConection } = require('../database/db')


//const firestore =dbFirebaseConection()

const getUsuarios = (req, res)=> {
    console.log(req.body)
    return res.json({
        msg: 'Usuario obtenido'
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

const updatedUsuario = (req, res)=> {
    return res.json({
        msg: 'Usuario actualizado'
    })
}

const deleteUsuario = (req, res)=> {
    return res.json({
        msg: 'Usuario eliminado'
    })
}

module.exports = {
    getUsuarios, createUserio, updatedUsuario, deleteUsuario
}