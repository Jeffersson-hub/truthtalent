import "./globals.css"; // fichier de styles globaux
import { ReactNode } from "react";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "TruthTalent",
  description: "Plateforme de recrutement basée sur les compétences",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}