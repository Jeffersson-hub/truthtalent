// app/layout.tsx
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
      <head>
        <title>{metadata.title}</title> {/* Utilisation du titre défini dans metadata */}
        <meta name="description" content={metadata.description} /> {/* Utilisation de la description */}
      </head>
      <body>{children}</body>
    </html>
  );
}