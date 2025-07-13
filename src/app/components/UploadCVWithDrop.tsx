'use client';

import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "../../../uploadthing.config";
import { useState } from "react";

export default function UploadCVWithDrop() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  console.log("🔐 Clé API Airtable:", process.env.AIRTABLE_API_KEY);


  const handleUploadComplete = async (
    res: { url: string; name: string }[] | undefined
  ) => {
    const uploadedUrl = res?.[0]?.url;
    const filename = res?.[0]?.name;

    if (!uploadedUrl || !filename) {
      setMessage("❌ Erreur : informations de fichier manquantes");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/airtable-insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateName: "Jean Boisgontier",
          email: "jean@example.com",
          phone: "0600000000",
          profilePhoto: "",
          skills: "React, Node, Python",
          experiences: "5 ans dev FullStack",
          softSkills: "Rigoureux, Curieux",
          resumeUrl: uploadedUrl,
        }),
      });

      if (response.ok) {
        setMessage("✅ Candidat ajouté dans Airtable !");
      } else {
        const error = await response.json();
        setMessage("❌ Erreur Airtable : " + (error?.error || "Erreur inconnue"));
      }
    } catch (err: any) {
      console.error("Erreur API Airtable:", err);
      setMessage("❌ Exception lors de l'envoi à Airtable");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadError = (err: Error) => {
    console.error("Erreur UploadThing:", err);
    setMessage("❌ Erreur UploadThing");
  };

  return (
    <div className="bg-white border p-6 rounded-lg shadow-md max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">📤 Déposez votre CV</h2>

      <UploadDropzone<OurFileRouter>
        endpoint="cvUploader"
        onClientUploadComplete={handleUploadComplete}
        onUploadError={handleUploadError}
        className="ut-upload-dropzone w-full ut-button:bg-blue-600 ut-button:ut-readying:bg-blue-400 ut-button:ut-uploading:bg-blue-400"
      />

      {loading && <p className="mt-4 text-blue-500 text-sm">Envoi en cours...</p>}
      {message && <p className="mt-4 text-sm text-center">{message}</p>}
    </div>
  );
}
