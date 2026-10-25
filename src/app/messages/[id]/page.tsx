import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMessageById } from "@/lib/messages";
import { SUBJECT_LABELS } from "@/lib/subjects";
import { formatDate } from "@/lib/format";
import styles from "../messages.module.css";

// Route dynamique : [id] dans le nom du dossier devient params.id.
// Depuis Next 15, params est une Promise.
type Props = {
  params: Promise<{ id: string }>;
};

async function loadMessage(params: Props["params"]) {
  const { id } = await params;
  const messageId = Number(id);
  if (!Number.isInteger(messageId)) notFound();

  const message = await getMessageById(messageId);
  if (!message) notFound(); // → affiche app/not-found.tsx

  return message;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const message = await loadMessage(params);
  return { title: `Message de ${message.name}` };
}

export default async function MessagePage({ params }: Props) {
  const message = await loadMessage(params);

  return (
    <article className={styles.detail}>
      <Link href="/messages" className={styles.back}>
        ← Tous les messages
      </Link>
      <h1>{message.name}</h1>
      <p className={styles.meta}>
        <span className={styles.badge}>{SUBJECT_LABELS[message.subject]}</span>
        <a href={`mailto:${message.email}`}>{message.email}</a>
        <time dateTime={message.createdAt.toISOString()}>
          {formatDate(message.createdAt)}
        </time>
      </p>
      <p className={styles.content}>{message.content}</p>
    </article>
  );
}
