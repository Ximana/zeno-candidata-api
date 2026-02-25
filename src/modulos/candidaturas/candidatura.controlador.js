const servico = require("./candidatura.servico");
const { validarCandidatura } = require("../../middlewares/validacao");

async function listar(req, res, next) {
  try {
    const candidaturas = await servico.listarCandidaturas();
    res.json(candidaturas);
  } catch (err) {
    next(err);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const candidatura = await servico.buscarCandidaturaPorId(req.params.id);
    res.json(candidatura);
  } catch (err) {
    next(err);
  }
}

async function criar(req, res, next) {
  try {
    validarCandidatura(req.body);
    const candidatura = await servico.criarCandidatura(req.body);
    res.status(201).json(candidatura);
  } catch (err) {
    next(err);
  }
}

async function actualizar(req, res, next) {
  try {
    const candidatura = await servico.actualizarCandidatura(req.params.id, req.body);
    res.json(candidatura);
  } catch (err) {
    next(err);
  }
}

async function remover(req, res, next) {
  try {
    await servico.removerCandidatura(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { listar, buscarPorId, criar, actualizar, remover };