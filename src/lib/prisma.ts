import { PrismaClient } from "@prisma/client";

// Singleton : en dev, le hot reload de Next ré-exécute les modules,
// ce qui créerait une nouvelle connexion à chaque sauvegarde.
// On garde donc l'instance sur globalThis.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
