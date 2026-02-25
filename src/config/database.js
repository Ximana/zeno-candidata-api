// Cria uma única instância do PrismaClient para toda a aplicação

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = prisma;