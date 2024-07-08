const mongoose= require('mongoose')
const admin = require('firebase-admin');
require('dotenv').config()
process.env.NODE_TLS_REJECT_UNAUTHORIZED = process.env.NODE_TLS_REJECT_UNAUTHORIZED;

const dbMongoConection = async() => {
    try{
        
        await mongoose.connect(process.env.MONGODB_STRING_CONNECTION)
                    .then(()=> console.log('Se conecto a la Base de datos MongoDB'))
                    .catch((err)=> console.log('MongoDB connection error ', err))
        
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

const dbFirebaseConection = ()=> {
    try {

        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
          });
          
          const firestore = admin.firestore();

          console.log('Firebase inicializado con éxito');

          return firestore
    } catch(error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = {
    dbFirebaseConection,
    dbMongoConection
}