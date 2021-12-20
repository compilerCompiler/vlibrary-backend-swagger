const sql = require("./db.js");

// constructor
const Usuario = function(usuario) {
  this.id_usuario = usuario.id_usuario;
  this.nombre_usuario = usuario.nombre_usuario;
  this.password = usuario.password; // Cambiar a password
  this.correo = usuario.correo;
  this.ultimo_inicio = usuario.ultimo_inicio;
  this.created = usuario.created;
  this.updated = usuario.updated;
};

class validationError extends Error{
  constructor (message){super(message) , this.name="validationError"};
};

Usuario.create = (newUsuario, result) => {
  sql.query("INSERT INTO usuario SET ?", newUsuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUsuario });
    result(null, { id: res.insertId, ...newUsuario });
  });
};

// Usuario findOne
Usuario.findOne = (login, result) => {
  sql.query(
    "SELECT * FROM usuario WHERE Nombre_usuario = ? and Password = ?",
    [login.nombre_usuario, login.password],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
     
      //update last_login
      if(res[0]){ 
        sql.query(
          "UPDATE usuario SET Ultimo_inicio = ? WHERE Id_usuario = ?",
          [new Date(),res[0].Id_usuario],
          (err, resUpdate) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }
            console.log("usuarios: ", res[0]);
            // console.log("updated user: ", { id: id_usuario, ...login });
            result(null, res[0]);
          }
        );
       
      }else {
        
        result( new validationError("Usuario incorrecto "), null);
        return;
      }
    }
  );
};

Usuario.remove = (id, result) => {
  sql.query("DELETE FROM usuario WHERE Id_usuario = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found book with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted usuario with id: ", id);
    result(null, res);
  });
};

Usuario.getAll = (result) => {
  let query = "SELECT * FROM usuario";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("usuarios: ", res);
    result(null, res);
  });
};

module.exports = Usuario;