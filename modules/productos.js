//MODULO PARA EL CRUD DE LA TABLA PRODUCTOS
//Las rutas para resolver cada verbo http
//modulo que resuelve las rutas de la api rest
//arquitectura restful
//recordar: la api rest trabaja con los verbos http
//GET, POST, PUT, DELETE, PATCH ...
//crearemos los endpoint para cada metodo
const express = require("express");
const cors = require("cors"); //para evitar restricciones entre llamadas de sitios
const producto = express.Router(); //trae el metodo router de express para hacer los endpoint  http://www.misitio.com/api/clietes
const conex = require("./bdatos");

//construimos la capa intermedia de la aplicacion MIDDLEWARD
producto.use(express.json());
producto.use(cors());
producto.options("*", cors()); //configura las ip permitidas

//Codificamos los verbos HTTP (CRUD TIPICO)

//VERBO GET LISTAR
producto.get("/productos", (req, res) => {
  conex.query("SELECT * FROM producto", (error, respuesta) => {
    if (error) {
      throw error;
    } else {
      res.send(respuesta);
    }
  });
});

//VERBO POST INSERTAR
/*ruta.post("/api/users", (req, res) => {
  let data = {
    name: req.body.name,
    lastname: req.body.lastname,
    phone: req.body.phone,
  };
  conex.query("INSERT INTO users set ?", data, (error, respuesta) => {
    if (error) {
      console.log(error);
    } else {
      res.status(201).send(respuesta);
    }
  });
});

//VERBO PUT ACTUALIZAR
ruta.put("/api/users/:id", (req, res) => {
  let id = req.params.id;
  let datos = {
    name: req.body.name,
    lastname: req.body.lastname,
    phone: req.body.phone,
  };
  conex.query(
    "UPDATE users SET ? WHERE id = ?",
    [datos, id],
    (error, respuesta) => {
      if (error) {
        console.log(error);
      } else {
        res.status(201).send(respuesta);
      }
    }
  );
});

//VERBO BORRAR
ruta.delete("/api/users/:id", (req, res) => {
  let id = req.params.id;
  conex.query("DELETE FROM users WHERE id = ?", id, (error, respuesta) => {
    if (error) {
      console.log(error);
    } else {
      res.status(201).send(respuesta);
    }
  });
});*/
module.exports = producto;
