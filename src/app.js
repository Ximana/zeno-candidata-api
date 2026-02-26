const express = require("express");
const cors = require("cors");
const path    = require("path");

const candidatoRotas = require("./modulos/candidatos/candidato.rotas");
const vagaRotas = require("./modulos/vagas/vaga.rotas");
const candidaturaRotas = require("./modulos/candidaturas/candidatura.rotas");
const middlewareDeErros = require("./middlewares/erros");

const app = express();

// --- Middlewares globais ---
app.use(cors());           // Permite pedidos do frontend
app.use(express.json({ limit: "10mb" }));  // Limite maior para aceitar fotos em base64

// Rota inicial com uma pagina html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pagina-api.html"));
});

// --- Rotas dos módulos ---
app.use("/api/candidatos", candidatoRotas);
app.use("/api/vagas", vagaRotas);
app.use("/api/candidaturas", candidaturaRotas);

// --- Middleware de erros (deve ser sempre o último) ---
app.use(middlewareDeErros);

module.exports = app;