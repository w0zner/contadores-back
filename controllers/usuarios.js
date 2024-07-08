const getUsuarios = (req, res)=> {
    console.log(req.body)
    return res.json({
        msg: 'Usuario obtenido'
    })
}

const createUserio = (req, res)=> {
    return res.json({
        msg: 'Usuario agregado'
    })
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