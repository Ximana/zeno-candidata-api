// Executar com: npm run db:seed

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("A popular a base de dados...");

  // Criar vagas
  const vaga1 = await prisma.vaga.create({
    data: {
      titulo: "Desenvolvedor Frontend",
      descricao: "Responsável pelo desenvolvimento de interfaces web modernas.",
      departamento: "Tecnologia",
    },
  });

  // Criar candidatos com formações
  const candidato1 = await prisma.candidato.create({
    data: {
      nomeCompleto: "Ana Paula Ferreira",
      email: "ana.ferreira@email.com",
      telefone: "+244 923 456 789",
      dataNascimento: new Date("1995-03-12"),
      bilheteIdentidade: "004567890LA041",
      genero: "Feminino",
      estadoCivil: "Solteira",
      provincia: "Luanda",
      anosExperienciaInt: 3,
      observacoes: "Candidata proativa com boa comunicação.",
      formacoes: {
        create: {
          instituicao: "Universidade Agostinho Neto",
          grau: "Licenciatura",
          curso: "Engenharia Informática",
          anoInicio: 2013,
          anoConclusao: 2017,
          aFrequentar: false,
          pais: "Angola",
        },
      },
    },
  });

  // Criar candidaturas
  await prisma.candidatura.create({
    data: {
      candidatoId: candidato1.id,
      vagaId: vaga1.id,
      estado: "Em análise",
    },
  });

  console.log("Base de dados populada com sucesso!");
}

main()
  .catch((e) => {
    console.error("Erro ao popular a base de dados:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });