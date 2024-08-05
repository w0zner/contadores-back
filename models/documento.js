const {Schema, model} = require('mongoose')

const DocumentoSchema = Schema({
    nombre:{
        type: String,
        required: true
    }, 
    pdf: {
        type: String
    },
    fecha: {
        type: String
    },
    estado: {
        type: String,
        default: 'INCOMPLETO'
    },
    tipo: {
        type: String,
        default: 'FACTURA'
    },
    observacion: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    usuarioCreacion: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
})

DocumentoSchema.method('toJSON', function() {
    const {__v,  ...object} = this.toObject()
    return object
})

module.exports = model('Documento', DocumentoSchema)