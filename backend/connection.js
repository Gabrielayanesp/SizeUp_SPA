import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "TU_USUARIO",
  password: "TU_CONTRASEÑA",
  database: "TU_BASE_DE_DATOS",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Conectado a MySQL");
});

export default connection;
