import Link from "next/link";
import NavLink from "./NavLink";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { href: "/", label: "Accueil" },
  { href: "/messages", label: "Messages" },
  { href: "/contact", label: "Contact" },
];

// Server Component : seul NavLink (qui a besoin du pathname) est côté client.
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          Ex React
        </Link>
        <nav>
          <ul className={styles.nav}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
