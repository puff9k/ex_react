"use client";

// Error boundary : doit être un Client Component.
// Capture les erreurs levées pendant le rendu des pages (ex : base injoignable).
import { useEffect } from "react";
import styles from "./status.module.css";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className={styles.status}>
      <p className={styles.code}>Oups</p>
      <h1>Une erreur est survenue</h1>
      <p>Veuillez réessayer dans quelques instants.</p>
      <button type="button" className={styles.retry} onClick={reset}>
        Réessayer
      </button>
    </section>
  );
}
