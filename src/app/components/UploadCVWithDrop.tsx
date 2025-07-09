// ✅ src/app/components/UploadCVWithDrop.tsx
'use client';

import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { useState } from "react";

export default function UploadCVWithDrop() {
  const [message, setMessage] = useState('');

  const handleUploadComplete = async (res: { url: string; name: string }[] | undefined) => {
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
    <div className="flex flex-col gap-4 items-center">
      <UploadDropzone<OurFileRouter, "cvUploader">
        endpoint="cvUploader"
        onClientUploadComplete={handleUploadComplete}
        onUploadError={(error) => {
          console.error("Erreur UploadThing :", error.message);
          setMessage("❌ Erreur UploadThing");
        }}
        appearance={{
          container: "w-60 border border-gray-300 rounded-xl shadow p-4 bg-white dark:bg-gray-800",
          button: "bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg",
          label: "text-sm text-gray-600 dark:text-gray-300 mt-2 text-center",
        }}
      />

      <p className="text-sm text-gray-500 dark:text-gray-300">{message}</p>

      {/* ✅ Préparation pour les 3 boutons/icônes futurs */}
      <div className="flex gap-4 mt-6">
        <button className="bg-gray-100 dark:bg-gray-700 text-sm px-4 py-2 rounded shadow hover:bg-gray-200 dark:hover:bg-gray-600">
          📄 Liste CV
        </button>
        <button className="bg-gray-100 dark:bg-gray-700 text-sm px-4 py-2 rounded shadow hover:bg-gray-200 dark:hover:bg-gray-600">
          📊 Statistiques
        </button>
        <button className="bg-gray-100 dark:bg-gray-700 text-sm px-4 py-2 rounded shadow hover:bg-gray-200 dark:hover:bg-gray-600">
          ⚙️ Paramètres
        </button>
      </div>
    </div>
  );
}
