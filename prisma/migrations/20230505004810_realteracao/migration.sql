-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "token" INTEGER NOT NULL,
    "icon" INTEGER NOT NULL DEFAULT 0,
    "verify" INTEGER NOT NULL DEFAULT 0,
    "cards" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cards" (
    "id" SERIAL NOT NULL,
    "donoId" INTEGER NOT NULL,
    "fav" INTEGER NOT NULL DEFAULT 0,
    "livro" VARCHAR(20) NOT NULL,
    "capitulo" INTEGER NOT NULL,
    "versInicial" INTEGER NOT NULL,
    "versFinal" INTEGER NOT NULL,
    "data" VARCHAR(15) NOT NULL,
    "q1" TEXT NOT NULL,
    "q2" TEXT NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_donoId_fkey" FOREIGN KEY ("donoId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "frases" (
    "id" SERIAL NOT NULL,
    "lastUpdate" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "text" TEXT NOT NULL
);