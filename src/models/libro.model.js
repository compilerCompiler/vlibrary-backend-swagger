const sql = require("./db.js");

// constructor
const Libro = function(libro) {
  this.id_libro=libro.id_libro;
  this.titulo = libro.titulo;
  this.autor = libro.autor;
  this.foto_url=libro.foto_url;
  this.sinopsis=libro.sinopsis;
  this.estado=libro.estado;
  this.reservado=libro.reservado;
  this.created=libro.created;
  this.updated=libro.updated;

};

Libro.create = (newLibro, result) => {
  sql.query("INSERT INTO libro SET ?", newLibro, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created book: ", { id: res.insertId, ...newLibro });
    result(null, { id: res.insertId, ...newLibro });
  });
};

Libro.findSome = (findSelection, result) => {
  sql.query("SELECT * FROM libro WHERE titulo LIKE '%"+findSelection.titulo+"%' OR autor LIKE '%"+findSelection.autor+"%'",
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("error: ",res);
    result(null,res)
  });
};

Libro.getAll = (result) => {
  let query = "SELECT * FROM libro";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("books: ", res);
    result(null, res);
  });
};

Libro.remove = (id, result) => {
  sql.query("DELETE FROM libro WHERE Id_libro = ?", id, (err, res) => {
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

    console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};



module.exports = Libro;