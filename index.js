const express= require('express')
require('dotenv').config()
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
const { dbFirebaseConection, dbMongoConection } = require('./database/db')

//creacion del servidor
const app= express()

//const firestore = dbFirebaseConection()
dbMongoConection()

app.get('/', (req, res)=> {
    //res.send('Conexion exitosa')

    //getDocument().catch(console.error);

    res.json({
        msg: 'Conexion exitosa'
    })
})

app.listen(process.env.PORT, ()=> {
    console.log(`Conectado al puerto ${ process.env.PORT }`)
})

async function getDocument() {
    const docRef = firestore.collection('prueba').doc('probando');
    const doc = await docRef.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
    }
  }
