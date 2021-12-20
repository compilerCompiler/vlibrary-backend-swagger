const sql = require("./db.js");

const Persona =  function(persona){
    this.id_persona=persona.id_persona;
    this.id_usuario=persona.id_usuario;
    this.nombre=persona.nombre;
    this.profesion=persona.profesion;
    this.created=persona.created;
    this.updated=persona.updated;
}; 

Persona.create = (newPersona, result) => {
    sql.query("INSERT INTO persona SET ?", newPersona, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created persona: ", { id: res.insertId, ...newPersona });
      result(null, { id: res.insertId, ...newPersona });
    });
  };
  

  Persona.getAll = (result) => {
    let query = "SELECT Id_persona,Id_Usuario,Nombre,Profesion,Nombre_usuario,Password,Correo,Ultimo_inicio FROM persona INNER JOIN usuario using (id_usuario) WHERE persona.Id_persona NOT IN (SELECT Id_persona From administrador )";
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("personas: ", res);
      result(null, res);
    });
  };
  
  Persona.remove = (id, result) => {
    sql.query("DELETE FROM persona WHERE Id_persona = ?", id, (err, res) => {
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
  
      console.log("deleted persona with id: ", id);
      result(null, res);
    });
  };

  module.exports = Persona;