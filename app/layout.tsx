// app/layout.tsx
import "./globals.css"; // si tu as un fichier de styles globaux
import { ReactNode } from "react";
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <title>Votre Application de Recrutement</title>
      </head>
      <body>{children}</body>
    </html>
  );
}

export const metadata = {
  title: "TruthTalent",
  description: "Plateforme de recrutement basée sur les compétences",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
