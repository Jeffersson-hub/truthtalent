"use client";

import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export default function UploadCVWithDrop() {
  return (
    <div className="p-6 border rounded-xl shadow bg-white text-center">
      <h2 className="text-xl font-bold mb-4">📤 Déposez votre CV ou utilisez le bouton</h2>

      <UploadDropzone<OurFileRouter, "cvUploader">
        endpoint="cvUploader"
        onClientUploadComplete={async (res) => {
          const url = res?.[0]?.url; // ✅ PAS uploadedUrl
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

          alert("✅ CV envoyé avec succès !");
        }}
        onUploadError={(error) => {
          console.error("Erreur UploadThing :", error.message);
          alert("❌ Erreur UploadThing");
        }}
        appearance={{
          button: "ut-button:bg-green-600 ut-button:text-white",
          label: "text-lg text-gray-700 dark:text-gray-100",
          container: "max-w-md mx-auto p-6 border border-gray-300 rounded-xl shadow-md bg-white dark:bg-gray-800",
        }}
      />
    </div>
  );
}
