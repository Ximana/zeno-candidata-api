const servico = require("./vaga.servico");
const { validarVaga } = require("../../middlewares/validacao");

async function listar(req, res, next) {
  try {
    const vagas = await servico.listarVagas();
    res.json(vagas);
  } catch (err) {
    next(err);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const vaga = await servico.buscarVagaPorId(req.params.id);
    res.json(vaga);
  } catch (err) {
    next(err);
  }
}

async function criar(req, res, next) {
  try {
    validarVaga(req.body);
    const vaga = await servico.criarVaga(req.body);
    res.status(201).json(vaga);
  } catch (err) {
    next(err);
  }
}

async function actualizar(req, res, next) {
  try {
    const vaga = await servico.actualizarVaga(req.params.id, req.body);
    res.json(vaga);
  } catch (err) {
    next(err);
  }
}

async function remover(req, res, next) {
  try {
    await servico.removerVaga(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { listar, buscarPorId, criar, actualizar, remover };