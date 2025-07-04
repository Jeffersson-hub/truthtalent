'use client';

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import "@uploadthing/react/styles.css";
import { UploadCV } from '@/components/UploadCV';


export default function UploadCV() {
  const handleUploadComplete = async (res: any) => {
    const file = res[0];

    // Appeler ton API pour envoyer à Airtable
    const response = await fetch("/api/upload-to-airtable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: file.name,
        url: file.url,
      }),
    });

    const data = await response.json();
    if (data.success) {
      alert("CV envoyé à Airtable ✅");
    } else {
      alert("Erreur lors de l'envoi vers Airtable ❌");
    }
  };

  return (
    <div className="p-4 border rounded-xl bg-white shadow max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Uploader un CV</h2>
      <UploadButton<OurFileRouter>
        endpoint="cvUploader"
        onClientUploadComplete={handleUploadComplete}
        onUploadError={(error) => alert(`Erreur d'upload: ${error.message}`)}
      />
    </div>
  );
}
