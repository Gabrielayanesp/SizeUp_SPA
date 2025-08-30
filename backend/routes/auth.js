import express from "express";
import connection from "../connection.js";

const router = express.Router();

// REGISTER
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send("Faltan datos");

  connection.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) return res.status(500).send("Error en la BD");
      if (results.length > 0) return res.status(400).send("El usuario ya existe");

      connection.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, password],
        (err) => {
          if (err) return res.status(500).send("Error al registrar");
          res.send("Registro exitoso, ahora inicia sesión");
        }
      );
    }
  );
});

// LOGIN
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send("Faltan datos");

  connection.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (err) return res.status(500).send("Error en la BD");
      if (results.length === 0) return res.status(401).send("Credenciales inválidas");

      res.send("ok"); // todo correcto → el frontend redirige
    }
  );
});

export default router;
