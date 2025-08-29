import express from "express";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = 3000;

// Permitir recibir JSON desde frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (frontend)
app.use(express.static("frontend"));

// Rutas de autenticación
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
