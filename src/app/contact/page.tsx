import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <section className={styles.page}>
      <h1>Contact</h1>
      <p className={styles.intro}>Une question ? Laissez-nous un message.</p>
      <ContactForm />
    </section>
  );
}
