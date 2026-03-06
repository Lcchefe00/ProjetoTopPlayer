import express from "express";
import usuarioRoutes from "./routes/usuario.route.js"
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/usuarios", usuarioRoutes);

// app("/jogos", jogoRoutes);
// app("/players", jogoRoutes);
// app("/partidas", jogoRoutes);



export default app;