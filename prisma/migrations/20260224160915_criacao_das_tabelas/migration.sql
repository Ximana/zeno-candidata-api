-- CreateEnum
CREATE TYPE "Provincia" AS ENUM ('Bengo', 'Benguela', 'Bie', 'Cabinda', 'CuandoCubango', 'CuanzaNorte', 'CuanzaSul', 'Cunene', 'Huambo', 'Huila', 'Luanda', 'LundaNorte', 'LundaSul', 'Malanje', 'Moxico', 'Namibe', 'Uige', 'Zaire');

-- CreateTable
CREATE TABLE "candidatos" (
    "id" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "bilheteIdentidade" TEXT,
    "genero" TEXT NOT NULL,
    "estadoCivil" TEXT,
    "provincia" "Provincia" NOT NULL,
    "foto" TEXT,
    "anosExperienciaInt" INTEGER NOT NULL DEFAULT 0,
    "observacoes" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "candidatos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vagas" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "departamento" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vagas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidaturas" (
    "id" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'Em análise',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "candidatoId" TEXT NOT NULL,
    "vagaId" TEXT NOT NULL,

    CONSTRAINT "candidaturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "formacoes" (
    "id" TEXT NOT NULL,
    "instituicao" TEXT NOT NULL,
    "grau" TEXT NOT NULL,
    "curso" TEXT NOT NULL,
    "anoInicio" INTEGER NOT NULL,
    "anoConclusao" INTEGER,
    "aFrequentar" BOOLEAN NOT NULL DEFAULT false,
    "pais" TEXT NOT NULL DEFAULT 'Angola',
    "candidatoId" TEXT NOT NULL,

    CONSTRAINT "formacoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "candidatos_email_key" ON "candidatos"("email");

-- AddForeignKey
ALTER TABLE "candidaturas" ADD CONSTRAINT "candidaturas_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "candidatos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidaturas" ADD CONSTRAINT "candidaturas_vagaId_fkey" FOREIGN KEY ("vagaId") REFERENCES "vagas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "formacoes" ADD CONSTRAINT "formacoes_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "candidatos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
