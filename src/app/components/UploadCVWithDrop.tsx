"use client";

import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export default function UploadCVWithDrop() {
  return (
    <div className="max-w-xl mx-auto p-6 border border-gray-300 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">📤 Déposez votre CV ou utilisez le bouton</h2>

      <UploadDropzone<OurFileRouter>
        endpoint="cvUploader"
        onClientUploadComplete={async (res) => {
          const uploadedUrl = res?.[0]?.uploadedUrl;
          const filename = res?.[0]?.name;

          if (!uploadedUrl || !filename) {
            alert("Erreur : données d’upload incomplètes.");
            return;
          }

          // Envoie vers Airtable
          const apiRes = await fetch("/api/candidates", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ filename, url: uploadedUrl }),
          });

          const apiData = await apiRes.json();
          if (apiData.success) {
            alert("CV envoyé et enregistré dans Airtable ✅");
          } else {
            alert("Erreur lors de l’enregistrement dans Airtable ❌");
          }
        }}
        onUploadError={(error) => {
          console.error("Erreur UploadThing :", error);
          alert("Erreur lors de l’upload du fichier.");
        }}
        config={{
          mode: "auto", // permet drag and drop + bouton combiné
        }}
      />
    </div>
  );
}
