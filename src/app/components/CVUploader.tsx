'use client';

import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "../../../uploadthing.config";
import { useState } from "react";

type Props = {
  onFilesUploaded: (candidate: any) => void; // à typiser selon ton modèle
};

export default function CVUpload({ onFilesUploaded }: Props) {
  const [message, setMessage] = useState("");

  const handleUploadComplete = async (res: { url: string; name: string }[] | undefined) => {
    const uploaded = res?.[0];
    if (!uploaded) {
      setMessage("❌ Fichier manquant");
      return;
    }

    // Simuler les données ou bien récupérer depuis formulaire
    const data = {
      candidateName: uploaded.name.split('.')[0], // Nom depuis le nom du fichier
      email: "nom@exemple.com",
      phone: "0600000000",
      profilePhoto: "",
      skills: "React, Node.js",
      experiences: "3 ans développeur",
      softSkills: "Curieux, Rigoureux",
      resumeUrl: uploaded.url,
    };

    await fetch("/api/airtable-insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (Response.ok) {
      const result = await Response.json();
      setMessage("✅ CV envoyé à Airtable");
      onFilesUploaded(data); // Notifie App.tsx
    } else {
      setMessage("❌ Erreur lors de l'envoi à Airtable");
    }
  };

  const handleUploadError = (error: Error) => {
    console.error("Erreur d’upload :", error);
    setMessage("❌ Erreur d'upload : " + error.message);
  };

  return (
    <div className="space-y-2">
      <UploadDropzone<OurFileRouter>
        endpoint="cvUploader"
        onClientUploadComplete={handleUploadComplete}
        onUploadError={handleUploadError}
        className="ut-upload-dropzone w-full ut-button:bg-blue-600"
      />
      {message && <p className="text-sm text-center text-gray-700">{message}</p>}
    </div>
  );
}
