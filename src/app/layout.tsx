import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "./globals.css";

// Métadonnées par défaut, surchargées page par page.
export const metadata: Metadata = {
  title: {
    default: "Ex React",
    template: "%s | Ex React",
  },
  description: "Maquette Next.js + CSS vanilla + Prisma",
};

// Layout racine : enveloppe toutes les pages (header/footer communs).
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
