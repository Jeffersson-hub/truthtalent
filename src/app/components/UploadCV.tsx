// src/app/components/UploadCV.tsx
"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export default function UploadCV() {
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">📄 Upload CV</h2>

      <UploadButton<OurFileRouter, "cvUploader">
        endpoint="cvUploader"
        onClientUploadComplete={async (res) => {
          const url = res?.[0]?.url; // ✅ Remplace uploadedUrl par url
          const name = res?.[0]?.name;

          if (!url) {
            alert("Erreur : URL manquante");
            return;
          }

          await fetch("/api/upload-to-airtable", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              filename: name ?? "cv inconnu",
              url,
            }),
          });

          alert("✅ CV envoyé à Airtable !");
        }}
        onUploadError={(error) => {
          console.error("Erreur UploadThing :", error.message);
          alert("❌ Erreur UploadThing");
        }}
      />
    </div>
  );
}
