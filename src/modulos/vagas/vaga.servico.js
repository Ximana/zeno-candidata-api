const prisma = require("../../config/database");

async function listarVagas() {
  return prisma.vaga.findMany({
    orderBy: { criadoEm: "desc" },
  });
}

async function buscarVagaPorId(id) {
  return prisma.vaga.findUniqueOrThrow({
    where: { id },
    include: { candidaturas: { include: { candidato: true } } },
  });
}

async function criarVaga(dados) {
  return prisma.vaga.create({ data: dados });
}

async function actualizarVaga(id, dados) {
  return prisma.vaga.update({ where: { id }, data: dados });
}

async function removerVaga(id) {
  return prisma.vaga.delete({ where: { id } });
}

module.exports = {
  listarVagas,
  buscarVagaPorId,
  criarVaga,
  actualizarVaga,
  removerVaga,
};