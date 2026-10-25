import styles from "../status.module.css";

// Affiché automatiquement (via Suspense) pendant que les pages
// de /messages attendent leurs données.
export default function Loading() {
  return (
    <div className={styles.status} aria-busy="true">
      <div className={styles.spinner} />
      <p>Chargement…</p>
    </div>
  );
}
