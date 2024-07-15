const fileUpload = (req, res) => {
    try {
        const coleccion = req.params.coleccion
        const id = req.params.id

        const coleccionesValidas = ['documentos','usuarios']

        if(!coleccionesValidas.includes(coleccion)) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe la colección'
            })
        }

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe el archivo a subir'
            });
          }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado al subir archivo'
        })
    }
}

const obtenerPDF = (req, res) => {

}

module.exports = {
    fileUpload,
    obtenerPDF
}