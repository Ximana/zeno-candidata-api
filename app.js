const express = require("express");
const cors = require("cors");

const candidatoRotas = require("./modulos/candidatos/candidato.rotas");
const vagaRotas = require("./modulos/vagas/vaga.rotas");
const candidaturaRotas = require("./modulos/candidaturas/candidatura.rotas");
const middlewareDeErros = require("./middlewares/erros");

const app = express();

// Middlewares globais
app.use(cors());

// Aplicar express.json() apenas nas rotas que recebem JSON puro.
app.use("/api/vagas", express.json());
app.use("/api/candidaturas", express.json());

// Verifica estado da API
app.get("/", (req, res) => {
  res.json({ mensagem: "API funcional!" });
});

// Rotas
app.use("/api/candidatos", candidatoRotas);
app.use("/api/vagas", vagaRotas);
app.use("/api/candidaturas", candidaturaRotas);

// Erros (deve ser sempre o último)
app.use(middlewareDeErros);

module.exports = app;