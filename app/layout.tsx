// app/layout.tsx
import "./globals.css"; // si tu as un fichier de styles globaux
import { ReactNode } from "react";

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
