"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

type Props = {
  href: string;
  children: React.ReactNode;
};

export default function NavLink({ href, children }: Props) {
  const pathname = usePathname();
  // "/messages/3" doit aussi activer le lien "/messages".
  const isActive =
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={isActive ? `${styles.link} ${styles.active}` : styles.link}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
