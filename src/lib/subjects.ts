// Utilisable côté client ET serveur : on n'importe que des *types* Prisma,
// pour ne pas embarquer le client Prisma dans le bundle navigateur.
import type { MessageSubject } from "@prisma/client";

export const SUBJECT_LABELS: Record<MessageSubject, string> = {
  QUESTION: "Question",
  FEEDBACK: "Retour",
  OTHER: "Autre",
};

export const SUBJECTS = Object.keys(SUBJECT_LABELS) as MessageSubject[];

export function isSubject(value: string): value is MessageSubject {
  return (SUBJECTS as string[]).includes(value);
}
