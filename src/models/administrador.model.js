const sql = require("./db.js");

const Administrador =  function(administrador){
    this.id_admi=administrador.id_admi;
    this.id_persona=administrador.id_persona;
    this.codigo_admi=administrador.codigo_admi;
    this.created=administrador.created;
    this.updated=administrador.updated;
}; 

class validationError extends Error{
  constructor (message){super(message) , this.name="validationError"};
};

Administrador.create = (newAdmi, result) => {
    sql.query("INSERT INTO administrador SET ?", newAdmi, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created admi: ", { id: res.insertId, ...newAdmi });
      result(null, { id: res.insertId, ...newAdmi });
    });
  };

  Administrador.findOne = (id, result) => {
    sql.query("SELECT Id_persona,Id_admi,Codigo_admi,Id_usuario,Nombre,Profesion FROM administrador inner join persona using (Id_persona) where Id_usuario= ?", id, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
       
        if(res[0]){ 
          console.log("usuario admi: ", res[0]);
          result(null, res);
        }else {
          
          result( new validationError("Usuario administrador no encontrado "), null);
          return;
        }
      }
    );
  };

  module.exports = Administrador;