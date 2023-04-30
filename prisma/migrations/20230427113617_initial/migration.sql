-- CreateEnum
CREATE TYPE "role" AS ENUM ('agent', 'organizator', 'admin');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "fio" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "role" NOT NULL,
    "orgaization_id" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
