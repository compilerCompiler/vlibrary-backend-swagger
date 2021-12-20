const sql = require("./db.js");

const Video =  function(video){
    this.id_video=video.id_video;
    this.duracion=video.duracion;
    this.enlace=video.enlace;
    this.calidad=video.calidad;
    this.created=video.created;
    this.updated=video.updated;
    this.miniatura=video.miniatura;
}; 

Video.create = (newVideo, result) => {
    sql.query("INSERT INTO videos SET ?", newVideo, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created video: ", { id: res.insertId, ...newVideo });
      result(null, { id: res.insertId, ...newVideo });
    });
  };

  Video.getAll = (result) => {
    let query = "SELECT * FROM videos ";
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("videos: ", res);
      result(null, res);
    });
  };

  module.exports = Video;