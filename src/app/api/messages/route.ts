// Route Handler : API REST classique, utile pour un client externe
// (appli mobile, script…). Le site lui-même passe par la Server Action.
//   GET  /api/messages        → liste
//   POST /api/messages        → création (JSON)
import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { createMessage, getMessages } from "@/lib/messages";
import { validateMessage, type RawMessageInput } from "@/lib/validation";

export async function GET(request: NextRequest) {
  const take = Number(request.nextUrl.searchParams.get("take")) || 20;
  const messages = await getMessages({ take: Math.min(take, 100) });
  return NextResponse.json(messages);
}

export async function POST(request: NextRequest) {
  let body: Partial<RawMessageInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  const result = validateMessage({
    name: String(body.name ?? ""),
    email: String(body.email ?? ""),
    subject: String(body.subject ?? ""),
    content: String(body.content ?? ""),
  });

  if (!result.ok) {
    return NextResponse.json({ errors: result.errors }, { status: 422 });
  }

  const message = await createMessage(result.data);
  revalidatePath("/messages");

  return NextResponse.json(message, { status: 201 });
}
