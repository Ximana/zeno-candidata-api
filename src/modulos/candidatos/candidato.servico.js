const prisma = require("../../config/database");
const { enviarParaCloudinary, removerDoCloudinary } = require("../../config/cloudinary");

// Esta função recebe os dados brutos do form-data (tudo string)
// e devolve apenas os campos que o Prisma conhece, com os tipos correctos
function prepararDadosCandidato(dados) {
  return {
    // Campos de texto, usamos trim() para remover espaços
    nomeCompleto:      dados.nomeCompleto      ? dados.nomeCompleto.trim()      : undefined,
    email:             dados.email             ? dados.email.trim()             : undefined,
    telefone:          dados.telefone          ? dados.telefone.trim()          : undefined,
    bilheteIdentidade: dados.bilheteIdentidade ? dados.bilheteIdentidade.trim() : undefined,
    genero:            dados.genero            ? dados.genero.trim()            : undefined,
    estadoCivil:       dados.estadoCivil       ? dados.estadoCivil.trim()       : undefined,
    provincia:         dados.provincia         ? dados.provincia.trim()         : undefined,
    observacoes:       dados.observacoes       ? dados.observacoes.trim()       : undefined,

    // Data: converte string "1995-03-12" para objecto Date
    dataNascimento: dados.dataNascimento
      ? new Date(dados.dataNascimento)
      : undefined,

    // Número: converte string "3" para número inteiro 3
    anosExperienciaInt: dados.anosExperienciaInt !== undefined
      ? parseInt(dados.anosExperienciaInt, 10) || 0
      : undefined,
  };
}

// --- CANDIDATOS ---

async function listarCandidatos() {
  return prisma.candidato.findMany({
    include: { formacoes: true },
    orderBy: { criadoEm: "desc" },
  });
}

async function buscarCandidatoPorId(id) {
  return prisma.candidato.findUniqueOrThrow({
    where: { id },
    include: {
      formacoes: true,
      candidaturas: { include: { vaga: true } },
    },
  });
}

async function criarCandidato(dados, ficheiro) {
  // Prepara os dados, remove campos extras e converte tipos
  const dadosLimpos = prepararDadosCandidato(dados);

  // Faz upload da foto ao Cloudinary se veio um ficheiro
  let urlFoto = null;
  let publicIdFoto = null;

  if (ficheiro) {
    const nomePublico = dadosLimpos.email.replace(/[^a-zA-Z0-9]/g, "_");
    const resultado = await enviarParaCloudinary(ficheiro.buffer, nomePublico);
    urlFoto = resultado.secure_url;
    publicIdFoto = resultado.public_id;
  }

  return prisma.candidato.create({
    data: {
      ...dadosLimpos,
      foto: urlFoto,
      fotoPublicId: publicIdFoto,
    },
    include: { formacoes: true },
  });
}

async function actualizarCandidato(id, dados, ficheiro) {
  // Prepara os dados e remove os undefined para não sobrescrever com nulo
  const dadosLimpos = prepararDadosCandidato(dados);

  // Remove campos undefined do objecto
  Object.keys(dadosLimpos).forEach((chave) => {
    if (dadosLimpos[chave] === undefined) {
      delete dadosLimpos[chave];
    }
  });

  let urlFoto = undefined;
  let publicIdFoto = undefined;

  if (ficheiro) {
    // Apaga a foto antiga do Cloudinary antes de fazer upload da nova
    const candidatoActual = await prisma.candidato.findUnique({
      where: { id },
      select: { fotoPublicId: true },
    });

    if (candidatoActual?.fotoPublicId) {
      await removerDoCloudinary(candidatoActual.fotoPublicId);
    }

    const nomePublico = `candidato_${id}`;
    const resultado = await enviarParaCloudinary(ficheiro.buffer, nomePublico);
    urlFoto = resultado.secure_url;
    publicIdFoto = resultado.public_id;
  }

  return prisma.candidato.update({
    where: { id },
    data: {
      ...dadosLimpos,
      ...(urlFoto && { foto: urlFoto, fotoPublicId: publicIdFoto }),
    },
    include: { formacoes: true },
  });
}

async function removerCandidato(id) {
  const candidato = await prisma.candidato.findUnique({
    where: { id },
    select: { fotoPublicId: true },
  });

  if (candidato?.fotoPublicId) {
    await removerDoCloudinary(candidato.fotoPublicId);
  }

  return prisma.candidato.delete({ where: { id } });
}

// --- FORMAÇÕES ---

async function listarFormacoes(candidatoId) {
  return prisma.formacao.findMany({
    where: { candidatoId },
    orderBy: { anoInicio: "desc" },
  });
}

async function adicionarFormacao(candidatoId, dados) {
  return prisma.formacao.create({
    data: {
      instituicao:  dados.instituicao,
      grau:         dados.grau,
      curso:        dados.curso,
      pais:         dados.pais || "Angola",
      anoInicio:    parseInt(dados.anoInicio, 10),
      anoConclusao: dados.anoConclusao ? parseInt(dados.anoConclusao, 10) : null,
      aFrequentar:  dados.aFrequentar === true || dados.aFrequentar === "true",
      candidatoId,
    },
  });
}

async function actualizarFormacao(id, dados) {
  return prisma.formacao.update({
    where: { id },
    data: {
      instituicao:  dados.instituicao  || undefined,
      grau:         dados.grau         || undefined,
      curso:        dados.curso        || undefined,
      pais:         dados.pais         || undefined,
      anoInicio:    dados.anoInicio    ? parseInt(dados.anoInicio, 10)    : undefined,
      anoConclusao: dados.anoConclusao ? parseInt(dados.anoConclusao, 10) : null,
      aFrequentar:  dados.aFrequentar !== undefined
        ? dados.aFrequentar === true || dados.aFrequentar === "true"
        : undefined,
    },
  });
}

async function removerFormacao(id) {
  return prisma.formacao.delete({ where: { id } });
}

module.exports = {
  listarCandidatos,
  buscarCandidatoPorId,
  criarCandidato,
  actualizarCandidato,
  removerCandidato,
  listarFormacoes,
  adicionarFormacao,
  actualizarFormacao,
  removerFormacao,
};