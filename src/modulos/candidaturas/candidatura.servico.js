const prisma = require("../../config/database");

async function listarCandidaturas() {
  return prisma.candidatura.findMany({
    include: {
      candidato: { select: { id: true, nomeCompleto: true, email: true, foto: true } },
      vaga: { select: { id: true, titulo: true, departamento: true } },
    },
    orderBy: { criadoEm: "desc" },
  });
}

async function buscarCandidaturaPorId(id) {
  return prisma.candidatura.findUniqueOrThrow({
    where: { id },
    include: { candidato: true, vaga: true },
  });
}

async function criarCandidatura(dados) {
  // Extrai apenas os campos que o Prisma aceita no create
  const { candidatoId, vagaId, estado } = dados;

  return prisma.candidatura.create({
    data: {
      candidatoId,
      vagaId,
      estado: estado || "Em análise",
    },
    include: { candidato: true, vaga: true },
  });
}

async function actualizarCandidatura(id, dados) {
  // Extrai apenas os campos válidos, ignora candidato, vaga, id, criadoEm, etc.
  const { candidatoId, vagaId, estado } = dados;

  const dataActualizar = {};
  if (candidatoId) dataActualizar.candidatoId = candidatoId;
  if (vagaId)      dataActualizar.vagaId      = vagaId;
  if (estado)      dataActualizar.estado      = estado;

  return prisma.candidatura.update({
    where: { id },
    data: dataActualizar,
    include: { candidato: true, vaga: true },
  });
}

async function removerCandidatura(id) {
  return prisma.candidatura.delete({ where: { id } });
}

module.exports = {
  listarCandidaturas,
  buscarCandidaturaPorId,
  criarCandidatura,
  actualizarCandidatura,
  removerCandidatura,
};