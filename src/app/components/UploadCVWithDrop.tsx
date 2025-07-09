'use client';

import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { useState } from "react";

export default function UploadCVWithDrop() {
  const [message, setMessage] = useState("");

  const handleUploadComplete = async (
    res: { url: string; name: string }[] | undefined
  ) => {
    const uploadedUrl = res?.[0]?.url;
    const filename = res?.[0]?.name;

    if (!uploadedUrl || !filename) {
      setMessage("❌ Erreur : informations de fichier manquantes");
      return;
    }

    const response = await fetch("/api/candidates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename,
        url: uploadedUrl,
      }),
    });

    if (response.ok) {
      setMessage("✅ CV envoyé avec succès");
    } else {
      setMessage("❌ Erreur lors de l'envoi à Airtable");
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center">
      {/* Zone d'upload avec taille réduite */}
      <div className="w-full max-w-xs">
        <UploadDropzone<OurFileRouter, "cvUploader">
          endpoint="cvUploader"
          onClientUploadComplete={handleUploadComplete}
          onUploadError={(error) => {
            console.error("Erreur UploadThing :", error.message);
            setMessage("❌ Erreur UploadThing");
          }}
          appearance={{
            container:
              "border border-gray-300 rounded-xl p-4 bg-white dark:bg-gray-900 shadow",
            label:
              "text-sm text-gray-600 dark:text-gray-300 text-center",
            uploadIcon: {
              width: "60px",
              height: "60px",
            },
          }}
        />
      </div>

      {/* Message */}
      <p className="text-sm text-gray-700 dark:text-gray-300">{message}</p>

      {/* Boutons d'action */}
      <div className="flex gap-3 mt-4">
        <button className="bg-white dark:bg-gray-800 text-sm px-4 py-2 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-700 border">
          📄 Liste CV
        </button>
        <button className="bg-white dark:bg-gray-800 text-sm px-4 py-2 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-700 border">
          📊 Statistiques
        </button>
        <button className="bg-white dark:bg-gray-800 text-sm px-4 py-2 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-700 border">
          ⚙️ Paramètres
        </button>
      </div>
    </div>
  );
}
