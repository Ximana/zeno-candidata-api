const servico = require("./candidato.servico");
const { validarCandidato, validarFormacao } = require("../../middlewares/validacao");

// CANDIDATOS
async function listar(req, res, next) {
  try {
    const candidatos = await servico.listarCandidatos();
    res.json(candidatos);
  } catch (err) {
    next(err);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const candidato = await servico.buscarCandidatoPorId(req.params.id);
    res.json(candidato);
  } catch (err) {
    next(err);
  }
}

async function criar(req, res, next) {
  try {
    // Log para confirmar que o Multer processou a foto correctamente
    console.log("Campos recebidos:", Object.keys(req.body));
    console.log("Ficheiro recebido:", req.file
      ? `${req.file.originalname} (${req.file.size} bytes)`
      : "nenhum"
    );

    validarCandidato(req.body);
    const candidato = await servico.criarCandidato(req.body, req.file);
    res.status(201).json(candidato);
  } catch (err) {
    next(err);
  }
}

async function actualizar(req, res, next) {
  try {
    console.log("Actualizar, ficheiro recebido:", req.file
      ? `${req.file.originalname} (${req.file.size} bytes)`
      : "nenhum"
    );

    const candidato = await servico.actualizarCandidato(req.params.id, req.body, req.file);
    res.json(candidato);
  } catch (err) {
    next(err);
  }
}

async function remover(req, res, next) {
  try {
    await servico.removerCandidato(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

// FORMAÇÕES

async function listarFormacoes(req, res, next) {
  try {
    const formacoes = await servico.listarFormacoes(req.params.id);
    res.json(formacoes);
  } catch (err) {
    next(err);
  }
}

async function adicionarFormacao(req, res, next) {
  try {
    validarFormacao(req.body);
    const formacao = await servico.adicionarFormacao(req.params.id, req.body);
    res.status(201).json(formacao);
  } catch (err) {
    next(err);
  }
}

async function actualizarFormacao(req, res, next) {
  try {
    const formacao = await servico.actualizarFormacao(req.params.formacaoId, req.body);
    res.json(formacao);
  } catch (err) {
    next(err);
  }
}

async function removerFormacao(req, res, next) {
  try {
    await servico.removerFormacao(req.params.formacaoId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  actualizar,
  remover,
  listarFormacoes,
  adicionarFormacao,
  actualizarFormacao,
  removerFormacao,
};