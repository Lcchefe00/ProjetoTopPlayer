import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import usuarioRoutes from "./src/routes/usuario.route.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ msg: "API rodando" });
});

app.use("/usuarios", usuarioRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});