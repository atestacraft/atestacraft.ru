/*
  Warnings:

  - You are about to drop the column `admin` on the `Player` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PlayerRoles" AS ENUM ('player', 'op');

-- AlterTable
ALTER TABLE "Head" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "admin",
ADD COLUMN     "role" "PlayerRoles" NOT NULL DEFAULT E'player';
