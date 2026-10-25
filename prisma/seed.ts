// Remplit la base avec des données de démo : `npm run db:seed`
// (lancé aussi automatiquement après `prisma migrate reset`).
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.message.deleteMany();

  await prisma.message.createMany({
    data: [
      {
        name: "Alice Martin",
        email: "alice@example.com",
        subject: "QUESTION",
        content: "Bonjour, quels sont vos horaires ?",
      },
      {
        name: "Bob Durand",
        email: "bob@example.com",
        subject: "FEEDBACK",
        content: "Super site, bravo !",
      },
    ],
  });

  console.log("Seed terminé.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
