const { response } = require('express')
const User = require('../modelos/usuario')
const { dbFirebaseConection } = require('../database/db')


const firestore =dbFirebaseConection()

const getUsuarios = (req, res)=> {
    console.log(req.body)
    return res.json({
        msg: 'Usuario obtenido'
    })
}

const createUserio = async (req, res=response)=> {
    const {nombre, email, password} = req.body
    const usuario = new User(req.body)

    const plainObject = Object.assign({}, usuario);
    try {
        const docRef = firestore.collection('prueba').doc(nombre)
        await docRef.set(plainObject)

        res.status(201).json({usuario: docRef})
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