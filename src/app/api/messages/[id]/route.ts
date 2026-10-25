//   GET    /api/messages/:id  → détail
//   DELETE /api/messages/:id  → suppression
import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { deleteMessage, getMessageById } from "@/lib/messages";

type Context = {
  params: Promise<{ id: string }>;
};

async function parseId(params: Context["params"]) {
  const id = Number((await params).id);
  return Number.isInteger(id) ? id : null;
}

export async function GET(_request: NextRequest, { params }: Context) {
  const id = await parseId(params);
  const message = id === null ? null : await getMessageById(id);

  if (!message) {
    return NextResponse.json({ error: "Message introuvable." }, { status: 404 });
  }
  return NextResponse.json(message);
}

export async function DELETE(_request: NextRequest, { params }: Context) {
  const id = await parseId(params);
  if (id === null) {
    return NextResponse.json({ error: "Identifiant invalide." }, { status: 400 });
  }

  try {
    await deleteMessage(id);
  } catch (error) {
    // P2025 : code d'erreur Prisma "enregistrement introuvable"
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "Message introuvable." }, { status: 404 });
    }
    throw error;
  }

  revalidatePath("/messages");
  revalidatePath(`/messages/${id}`);
  return new NextResponse(null, { status: 204 });
}
