const express= require('express')

//creacion del servidor
const app= express()

app.get('/', (req, res)=> {
    //res.send('Conexion exitosa')

    res.json({
        msg: 'Conexion exitosa'
    })
})

app.listen(5000, ()=> {
    console.log('Conectado al puerto 5000')
})
