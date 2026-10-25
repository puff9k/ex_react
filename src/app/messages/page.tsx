import type { Metadata } from "next";
import Link from "next/link";
import { getMessages } from "@/lib/messages";
import { SUBJECT_LABELS } from "@/lib/subjects";
import { formatDate } from "@/lib/format";
import styles from "./messages.module.css";

export const metadata: Metadata = {
  title: "Messages",
};

// Server Component async : la requête Prisma s'exécute sur le serveur,
// pendant le rendu. Aucun fetch ni useEffect côté client.
export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <section>
      <h1>Messages reçus</h1>

      {messages.length === 0 ? (
        <p className={styles.empty}>
          Aucun message pour l&apos;instant.{" "}
          <Link href="/contact">Écrire le premier</Link>
        </p>
      ) : (
        <ul className={styles.list}>
          {messages.map((message) => (
            <li key={message.id}>
              <Link href={`/messages/${message.id}`} className={styles.item}>
                <span className={styles.name}>{message.name}</span>
                <span className={styles.badge}>
                  {SUBJECT_LABELS[message.subject]}
                </span>
                <time
                  className={styles.date}
                  dateTime={message.createdAt.toISOString()}
                >
                  {formatDate(message.createdAt)}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
