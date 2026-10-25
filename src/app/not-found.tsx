import Link from "next/link";
import styles from "./status.module.css";

// Affiché pour toute URL inconnue, ou quand une page appelle notFound().
export default function NotFound() {
  return (
    <section className={styles.status}>
      <p className={styles.code}>404</p>
      <h1>Page introuvable</h1>
      <p>La page demandée n&apos;existe pas ou a été supprimée.</p>
      <Link href="/">Retour à l&apos;accueil</Link>
    </section>
  );
}
