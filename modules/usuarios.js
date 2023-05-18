//MODULO PARA EL CRUD DE LA TABLA USUARIOS
//modulos para productos

const express = require("express");
const cors = require("cors"); //para evitar restricciones entre llamadas de sitios
const usuario = express.Router(); //trae el metodo router de express para hacer los endpoint  http://www.misitio.com/api/clietes
const conex = require("./bdatos");
//LO NUEVO
const bcrypt = require("bcryptjs"); //encriptar
const jwt = require("jsonwebtoken");
const { promisify } = require("util"); //La trae por defecto NODE JS me permite usar async/await opcion a fetch
const { error } = require("console");
const { CLIENT_RENEG_WINDOW } = require("tls");

//construimos la capa intermedia de la aplicacion MIDDLEWARD
usuario.use(express.json()); //serializa la data en JSON
usuario.use(cors()); //permite acceso de otras direcciones IP distintas a mi servicio
usuario.options("*", cors()); //configura las ip admitidas por cors , * significa que l

//codificamos los verbos http (crud tipico)

//verbo GET listar

usuario.get("/usuarios", async (req, res) => {
  try {
    conex.query(
      "SELECT id, nombre, email FROM usuarios",
      (error, respuesta) => {
        console.log(respuesta);
        res.send(respuesta);
      }
    );
  } catch (error) {
    // throw error;
    console.log(error);
  }
});

//verbo POST insertar

usuario.post("/usuarios", async (req, res) => {
  try {
    let data = {
      nombre: req.body[0].nombre,
      email: req.body[0].email,
      contrasena: bcrypt.hashSync(req.body[0].contrasena, 7),
      direccion: req.body[0].direccion,
      ciudad: req.body[0].ciudad,
      zonaPostal: req.body[0].zonaPostal,
      telefono: req.body[0].telefono,
      esAdmin: req.body[0].esAdmin,
    };
    conex.query("insert into usuario set ?", [data], (error, respuesta) => {
      //console.log(respuesta);
      res.send(" Insercion Exitosa!");
    });
  } catch (error) {
    console.log(error);
    console.log.status(404).error;
  }
});

//verbo Put Editar

usuario.put("/usuarios/:id", (req, res) => {
  let id = req.params.id;
  let datos = {
    nombre: req.body[0].nombre,
    email: req.body[0].email,
    contrasena: req.body[0].contrasena,
    direccion: req.body[0].direccion,
    ciudad: req.body[0].ciudad,
    zonaPostal: req.body[0].zonaPostal,
    telefono: req.body[0].telefono,
    esAdmin: req.body[0].esAdmin,
  };
  conex.query(
    "update usuario set ? where id = ?",
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

//verbo delete eliminar

usuario.delete("/usuarios/:id", (req, res) => {
  console.log(req.params.id);
  let id = req.params.id;
  conex.query("delete from usuario where id = ?", id, (error, respuesta) => {
    if (error) {
      console.log(`${error}`);
    } else {
      res.status(201).send(respuesta);
    }
  });
});

//LOGIN USUARIOS
usuario.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const contrasena = req.body.contrasena;
    //validamos que lleguen los datos completos
    if (!email || !contrasena) {
      console.log("Debe enviar los datos completos");
    } else {
      conex.query(
        "Select * from usuario where email = ?",
        [email],
        async (error, respuesta) => {
          if (
            respuesta.length == 0 ||
            !(await bcrypt.compare(contrasena, respuesta[0].contrasena))
          ) {
            console.log("El usuario y/o la contraseña no es correcta");
          } else {
            //Enviamos las variables al frontend  para
            console.log("Bienvenido al sistema de información");
          }
        }
      );
    }
  } catch (error) {
    console.log("Hay un error en la conexión con el server");
  }
});

module.exports = usuario;
