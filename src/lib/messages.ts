// Couche d'accès aux données : les composants, actions et routes API
// n'appellent jamais Prisma directement, ils passent par ces fonctions.
import "server-only";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { MessageInput } from "@/lib/validation";

// Champs renvoyés par la liste : le type est déduit automatiquement par Prisma.
const messageSummarySelect = {
  id: true,
  name: true,
  subject: true,
  createdAt: true,
} satisfies Prisma.MessageSelect;

export type MessageSummary = Prisma.MessageGetPayload<{
  select: typeof messageSummarySelect;
}>;

export function getMessages({ take = 20 } = {}): Promise<MessageSummary[]> {
  return prisma.message.findMany({
    orderBy: { createdAt: "desc" },
    take,
    select: messageSummarySelect,
  });
}

export function getMessageById(id: number) {
  return prisma.message.findUnique({ where: { id } });
}

export function countMessages() {
  return prisma.message.count();
}

export function createMessage(data: MessageInput) {
  return prisma.message.create({ data });
}

export function deleteMessage(id: number) {
  return prisma.message.delete({ where: { id } });
}
