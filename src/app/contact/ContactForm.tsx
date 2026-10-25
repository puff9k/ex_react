"use client";

import { useActionState } from "react";
import Link from "next/link";
import { sendMessage, type ContactFormState } from "./actions";
import { SUBJECTS, SUBJECT_LABELS } from "@/lib/subjects";
import styles from "./contact.module.css";

const initialState: ContactFormState = {
  success: false,
  errors: {},
  values: {},
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    sendMessage,
    initialState
  );
  const { errors, values } = state;

  if (state.success) {
    return (
      <p className={styles.success} role="status">
        Merci, votre message a bien été envoyé !{" "}
        <Link href="/messages">Voir les messages</Link>
      </p>
    );
  }

  return (
    <form action={formAction} className={styles.form} noValidate>
      {errors.form && <p className={styles.formError}>{errors.form}</p>}

      <div className={styles.field}>
        <label htmlFor="name">Nom</label>
        <input id="name" name="name" defaultValue={values.name} required />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={values.email}
          required
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="subject">Sujet</label>
        <select
          id="subject"
          name="subject"
          defaultValue={values.subject ?? "QUESTION"}
        >
          {SUBJECTS.map((subject) => (
            <option key={subject} value={subject}>
              {SUBJECT_LABELS[subject]}
            </option>
          ))}
        </select>
        {errors.subject && (
          <span className={styles.error}>{errors.subject}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="content">Message</label>
        <textarea
          id="content"
          name="content"
          rows={6}
          defaultValue={values.content}
          required
        />
        {errors.content && (
          <span className={styles.error}>{errors.content}</span>
        )}
      </div>

      <button type="submit" className={styles.submit} disabled={isPending}>
        {isPending ? "Envoi…" : "Envoyer"}
      </button>
    </form>
  );
}
