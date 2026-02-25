function middlewareDeErros(err, req, res, next) {
  // Mostra o erro completo no terminal
  console.error("======= ERRO =======");
  console.error("Mensagem:", err.message);
  console.error("Código Prisma:", err.code || "N/A");
  console.error("Stack:", err.stack);
  console.error("====================");

  // Erro do Prisma: registo não encontrado
  if (err.code === "P2025") {
    return res.status(404).json({ erro: "Registo não encontrado." });
  }

  // Erro do Prisma: campo único duplicado
  if (err.code === "P2002") {
    return res.status(409).json({ erro: "Já existe um registo com estes dados." });
  }

  // Erro do Prisma: campo desconhecido ou tipo errado
  if (err.code === "P2000" || err.code === "P2005" || err.code === "P2006") {
    return res.status(400).json({ erro: "Dados inválidos: " + err.message });
  }

  // Erro de validação lançado manualmente (tem propriedade .status)
  if (err.status) {
    return res.status(err.status).json({ erro: err.message });
  }

  // Erro genérico, mostra a mensagem real em desenvolvimento
  return res.status(500).json({
    erro: "Erro interno do servidor.",
    detalhe: err.message,
  });
}

module.exports = middlewareDeErros;