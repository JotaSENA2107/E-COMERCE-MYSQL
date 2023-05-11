//PUERTA DE ENTRADA DE LA APP
//PRINCIPIO SPR (SINGLE RESPONSABILITY)

const express = require("express");
const app = express(); //creamos nuestra aplicacion llamando el metodo constructor de express

app.use("/", require("./modules/productos")); //redirigimos al modulo rutas  donde se redirige el modulo de producto
app.use("/", require("./modules/usuarios"));

app.listen("4100", () => {
  console.log("Aplicacion ejecutandose en : http://localhost:4100");
});