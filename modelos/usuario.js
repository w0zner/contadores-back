const collectionName = 'users'; // Nombre de la colección en Firestore

class User {

  constructor({nombre, email, password, password2=null, pdf='', curp='', telefono='', role='USER_ROLE'} = {}) {
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    this.password2 = password2;
    this.pdf = pdf;
    this.curp = curp;
    this.telefono = telefono;
    this.role = role;
  }

}

module.exports = User;