// Funções simples para validar os dados recebidos no body

// Lança um erro com status HTTP definido
function lancarErro(mensagem, status = 400) {
  const err = new Error(mensagem);
  err.status = status;
  throw err;
}

// Valida os campos obrigatórios do candidato
function validarCandidato(dados) {
  const { nomeCompleto, email, telefone, dataNascimento, genero, provincia } = dados;

  if (!nomeCompleto || !nomeCompleto.trim()) {
    lancarErro("O campo nomeCompleto é obrigatório.");
  }
  if (!email || !email.trim()) {
    lancarErro("O campo email é obrigatório.");
  }
  if (!telefone || !telefone.trim()) {
    lancarErro("O campo telefone é obrigatório.");
  }
  if (!dataNascimento) {
    lancarErro("O campo dataNascimento é obrigatório.");
  }
  if (!genero || !genero.trim()) {
    lancarErro("O campo genero é obrigatório.");
  }
  if (!provincia || !provincia.trim()) {
    lancarErro("O campo provincia é obrigatório.");
  }
}

// Valida os campos obrigatórios da vaga
function validarVaga(dados) {
  const { titulo, departamento } = dados;

  if (!titulo || !titulo.trim()) {
    lancarErro("O campo titulo é obrigatório.");
  }
  if (!departamento || !departamento.trim()) {
    lancarErro("O campo departamento é obrigatório.");
  }
}

// Valida os campos obrigatórios da candidatura
function validarCandidatura(dados) {
  const { candidatoId, vagaId } = dados;

  if (!candidatoId) {
    lancarErro("O campo candidatoId é obrigatório.");
  }
  if (!vagaId) {
    lancarErro("O campo vagaId é obrigatório.");
  }
}

// Valida os campos obrigatórios de uma formação
function validarFormacao(dados) {
  const { instituicao, grau, curso, anoInicio } = dados;

  if (!instituicao || !instituicao.trim()) {
    lancarErro("O campo instituicao é obrigatório.");
  }
  if (!grau || !grau.trim()) {
    lancarErro("O campo grau é obrigatório.");
  }
  if (!curso || !curso.trim()) {
    lancarErro("O campo curso é obrigatório.");
  }
  if (!anoInicio) {
    lancarErro("O campo anoInicio é obrigatório.");
  }
}

module.exports = {
  validarCandidato,
  validarVaga,
  validarCandidatura,
  validarFormacao,
};