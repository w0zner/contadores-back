
const getMenu = (role) => {
    const menu = [
        {
            titulo: 'Perfil',
            icono: 'mdi mdi-home',
            url: '/dashboard/perfil'
        }
        /*
        ,
        {
            titulo: 'Mis Documentos',
            icono: 'mdi mdi-cloud-download',
            url: '/dashboard/documentos/mis-documentos/123'
        }
        */
    ]

    if(role === 'USER_ROLE') {
        menu.unshift({titulo: 'Mis Documentos', icono: 'mdi mdi-cloud-download', url: '/dashboard/documentos/mis-documentos/123'})
    }
    if(role === 'ADMIN_ROLE') {
        menu.unshift({titulo: 'Usuarios', icono: 'mdi mdi-account-multiple', url: '/dashboard/usuarios'})
        menu.unshift({titulo: 'Nuevo Documento', icono: 'mdi mdi-file', url: '/dashboard/nuevo-documento'})
        menu.unshift({titulo: 'Documentos Generales', icono: 'mdi mdi-folder-lock-open', url: '/dashboard/documentos'})
        //menu.unshift({titulo: 'Mis Documentos', icono: 'mdi mdi-cloud-download', url: '/dashboard/documentos/mis-documentos/123'})
    }

    return menu
}

module.exports = {
    getMenu
}