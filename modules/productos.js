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
producto.post("/productos", (req, res) => {
  let data = {
    nombre: req.body.nombre2,
    descripcion: req.body.descripcion2,
    imagen: req.body.imagen2,
    imagenes: req.body.imagenes2,
    marca: req.body.marca2,
    precio: req.body.precio2,
    stock: req.body.stock2,
    calificacion: req.body.calificacion2,
    estado: req.body.estado2,
    fechacreacion: req.body.fechacreacion2,
  };
  conex.query("INSERT INTO producto SET ?", data, (error, respuesta) => {
    if (error) {
      console.log(error);
    } else {
      res.status(201).send(respuesta);
    }
  });
});

//VERBO PUT ACTUALIZAR
producto.put("/productos/:id", (req, res) => {
  let id = req.params.id;
  let datos = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    imagen: req.body.imagen,
    imagenes: req.body.imagenes,
    marca: req.body.marca,
    precio: req.body.precio,
    stock: req.body.stock,
    calificacion: req.body.calificacion,
    estado: req.body.estado,
    fechaCreacion: req.body.fechaCreacion,
  };
  conex.query(
    "update producto set ? where id = ?",
    [datos, id],
    (error, respuesta) => {
      if (error) {
        console.log(`${error}`);
      } else {
        res.status(201).send(respuesta);
      }
    }
  );
});

//VERBO BORRAR
producto.delete("/productos/:id", (req, res) => {
  let id = req.params.id;
  console.log(req.params.id);
  conex.query(
    "DELETE FROM producto WHERE id = ?",
    parseInt(id),
    (error, respuesta) => {
      if (error) {
        console.log(error);
      } else {
        res.status(201).send(respuesta);
      }
    }
  );
});
module.exports = producto;
