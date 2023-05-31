-- CreateTable
CREATE TABLE "ChatRoom" (
    "roomId" SERIAL NOT NULL,
    "users" INTEGER NOT NULL,

    CONSTRAINT "ChatRoom_pkey" PRIMARY KEY ("roomId")
);
