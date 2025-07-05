// src/app/components/UploadCV.tsx
"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export default function UploadCV() {
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">📄 Upload CV</h2>

      <UploadButton<OurFileRouter>
        endpoint="cvUploader"
        onClientUploadComplete={async (res) => {
          const url = res?.[0]?.uploadedUrl;

          if (!url) {
            alert("Erreur : URL manquante");
            return;
          }

          await fetch("/api/candidates", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              filename: "nom-du-fichier.pdf", // tu peux récupérer le vrai nom ici
              url,
            }),
          });

          alert("CV envoyé !");
        }}
        onUploadError={(error) => {
          console.error("Erreur UploadThing :", error.message);
          alert("Erreur UploadThing");
        }}
      />
    </div>
  );
}
