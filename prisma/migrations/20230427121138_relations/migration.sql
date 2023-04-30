/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('agent', 'organizator', 'admin');

-- CreateEnum
CREATE TYPE "From" AS ENUM ('guest', 'agent');

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "role";

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "fio" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "organization_id" INTEGER NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guest" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "id" SERIAL NOT NULL,
    "agent_id" INTEGER NOT NULL,
    "guest_id" INTEGER NOT NULL,
    "finished" BOOLEAN NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "from" "From" NOT NULL,
    "message_text" TEXT NOT NULL,
    "conversation_id" INTEGER NOT NULL,
    "agent_id" INTEGER NOT NULL,
    "guest_id" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faq" (
    "id" SERIAL NOT NULL,
    "orgaization_id" INTEGER NOT NULL,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Qa" (
    "id" SERIAL NOT NULL,
    "question_text" TEXT NOT NULL,
    "answer_text" TEXT NOT NULL,
    "faq_id" INTEGER NOT NULL,

    CONSTRAINT "Qa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Faq_orgaization_id_key" ON "Faq"("orgaization_id");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "Guest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "Guest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faq" ADD CONSTRAINT "Faq_orgaization_id_fkey" FOREIGN KEY ("orgaization_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qa" ADD CONSTRAINT "Qa_faq_id_fkey" FOREIGN KEY ("faq_id") REFERENCES "Faq"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
