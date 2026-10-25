"use server";

// Server Action : exécutée uniquement côté serveur, appelée directement
// par le formulaire (pas besoin de route API).
import { revalidatePath } from "next/cache";
import { createMessage } from "@/lib/messages";
import {
  validateMessage,
  type FieldErrors,
  type RawMessageInput,
} from "@/lib/validation";

export type ContactFormState = {
  success: boolean;
  errors: FieldErrors;
  values: Partial<RawMessageInput>;
};

// Signature imposée par useActionState : (étatPrécédent, formData) => nouvelÉtat
export async function sendMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw: RawMessageInput = {
    name: formData.get("name")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    subject: formData.get("subject")?.toString() ?? "",
    content: formData.get("content")?.toString() ?? "",
  };

  // On revalide toujours côté serveur : la validation HTML du navigateur
  // se contourne facilement.
  const result = validateMessage(raw);
  if (!result.ok) {
    return { success: false, errors: result.errors, values: raw };
  }

  try {
    await createMessage(result.data);
  } catch (error) {
    console.error("createMessage failed:", error);
    return {
      success: false,
      errors: { form: "Une erreur est survenue, réessayez plus tard." },
      values: raw,
    };
  }

  // Invalide le cache de /messages pour que le nouveau message y apparaisse.
  revalidatePath("/messages");

  return { success: true, errors: {}, values: {} };
}
