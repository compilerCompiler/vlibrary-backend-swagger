const express = require("express");
const cors = require("cors");

const app = express();
const swaggerUi = require("swagger-ui-express");
const docs = require('./docs'); // llamando al index de docs que sirve para importar todo el swagger


var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Add swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(docs));

// simple route
app.get("/", (req, res) => {
  res.send( " <h1>  Bienvenido al Backend VLIBRARY Integrates: Luciano Paniagua, Rodrigo Viladegut, Manuel Valenzuela <h1/>" );
});

require("./routes/libro.routes.js")(app);
require("./routes/usuario.routes.js")(app);
require("./routes/reservacion.routes.js")(app);
require("./routes/persona.routes.js")(app);
require("./routes/administrador.routes.js")(app);
require("./routes/video.routes.js")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});