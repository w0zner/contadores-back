const express= require('express')
require('dotenv').config()
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
const { dbFirebaseConection, dbMongoConection } = require('./database/db')

//creacion del servidor
const app= express()

dbMongoConection()

app.use(express.json())

app.use('/login', require('./routes/auth'))
app.use('/usuarios', require('./routes/usuarios'))
app.use('/buscar', require('./routes/buscar'))
app.use('/documentos', require('./routes/documentos'))
app.use('/upload', require('./routes/upload'))

app.listen(process.env.PORT, ()=> {
    console.log(`Conectado al puerto ${ process.env.PORT }`)
})