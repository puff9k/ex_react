// Validation partagée par la Server Action et la route API.
import type { MessageSubject } from "@prisma/client";
import { isSubject } from "@/lib/subjects";

export type MessageInput = {
  name: string;
  email: string;
  subject: MessageSubject;
  content: string;
};

// Valeurs brutes saisies (pas encore validées) : tout est string.
export type RawMessageInput = Record<keyof MessageInput, string>;

export type FieldErrors = Partial<Record<keyof MessageInput | "form", string>>;

export type ValidationResult =
  | { ok: true; data: MessageInput }
  | { ok: false; errors: FieldErrors };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateMessage(raw: RawMessageInput): ValidationResult {
  const name = raw.name.trim();
  const email = raw.email.trim();
  const content = raw.content.trim();
  const errors: FieldErrors = {};

  if (!name) errors.name = "Le nom est requis.";
  if (!EMAIL_REGEX.test(email)) errors.email = "Adresse e-mail invalide.";
  if (!isSubject(raw.subject)) errors.subject = "Sujet invalide.";
  if (content.length < 10) errors.content = "10 caractères minimum.";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: { name, email, subject: raw.subject as MessageSubject, content },
  };
}
