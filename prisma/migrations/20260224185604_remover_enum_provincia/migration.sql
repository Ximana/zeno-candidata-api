/*
  Warnings:

  - Changed the type of `provincia` on the `candidatos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "candidatos" DROP COLUMN "provincia",
ADD COLUMN     "provincia" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Provincia";
