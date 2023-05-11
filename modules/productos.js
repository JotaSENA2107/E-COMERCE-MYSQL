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
const conexion = require("./bdatos");

//construimos la capa intermedia de la aplicacion MIDDLEWARD
producto.use(express.json());
producto.use(cors());
producto.options("*", cors()); //configura las ip permitidas

//Codificamos los verbos HTTP (CRUD TIPICO)

//VERBO GET LISTAR
producto.get("/productos", (req, res) => {
  conexion.query("SELECT * FROM producto", (error, respuesta) => {
    if (error) {
      throw error;
    } else {
      res.send(respuesta);
    }
  });
});

//VERBO POST INSERTAR
producto.post("/productos", (req, res) => {
  console.log(req)
  let data = {
    nombre: req.body[0].nombre,
    descripcion: req.body[0].descripcion,
    imagen: req.body[0].imagen,
    imagenes: req.body[0].imagenes,
    marca: req.body[0].marca,
    precio: req.body[0].precio,
    stock: req.body[0].stock,
    calificacion: req.body[0].calificacion,
    estado: req.body[0].estado,
    fechacreacion: req.body[0].fechacreacion
  }
  conexion.query("INSERT INTO producto SET ?", data, (error, respuesta) => {
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
    nombre: req.body[0].nombre,
    descripcion: req.body[0].descripcion,
    imagen: req.body[0].imagen,
    imagenes: req.body[0].imagenes,
    marca: req.body[0].marca,
    precio: req.body[0].precio,
    stock: req.body[0].stock,
    calificacion: req.body[0].calificacion,
    estado: req.body[0].estado,
    fechacreacion: req.body[0].fechacreacion
  };
  conexion.query(
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
producto.delete("/productos/:id=?", (req, res) => {
  let id = req.params.id;
  console.log(req)
  console.log(req.params.id)
  console.log(req.params);
  conexion.query(
    "DELETE FROM producto WHERE id = ?",
   parseFloat(id),
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
//PARA PODER HACER PUT Y DELETE LA URL ES http://localhost:4100/productos/id EJEMPLO http://localhost:4100/productos/18