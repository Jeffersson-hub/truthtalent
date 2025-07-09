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
      setMessage("❌ Erreur : informations manquantes");
      return;
    }

    const response = await fetch("/api/candidates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename, url: uploadedUrl }),
    });

    setMessage(response.ok ? "✅ CV envoyé avec succès" : "❌ Erreur lors de l'envoi à Airtable");
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
          container: "w-52 h-44 rounded-xl border border-gray-300 shadow bg-white dark:bg-gray-900 flex items-center justify-center",
          uploadIcon: "w-12 h-12 text-gray-500",
          label: "text-xs text-center text-gray-600 dark:text-gray-300 mt-2",
        }}
      />

      <p className="text-sm text-gray-600 dark:text-gray-300">{message}</p>

      <div className="flex gap-3 mt-6">
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
