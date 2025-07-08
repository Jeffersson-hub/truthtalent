'use client';

import React, { useState } from 'react';
import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core"; // 👈 importe bien le type

export default function UploadCV() {
  const [message, setMessage] = useState('');

  const handleUploadComplete = async (
    res: { url: string; name: string }[] | undefined
  ) => {
    if (!res || res.length === 0) {
      setMessage('Aucun fichier reçu');
      return;
    }

    const file = res[0];
    const fileUrl = file.url;
    const filename = file.name;

    try {
      const response = await fetch('/api/upload-to-airtable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, url: fileUrl }),
      });

      setMessage(response.ok ? '✅ CV envoyé à Airtable' : '❌ Échec Airtable');
    } catch (err) {
      console.error(err);
      setMessage('❌ Erreur réseau');
    }
  };

  return (
    <div className="p-4 border rounded-xl bg-white shadow">
      <h2 className="text-xl font-bold mb-4">Uploader un CV</h2>

      <UploadDropzone<OurFileRouter> // ✅ Ici on passe le type générique
        endpoint="cvUploader"
        onClientUploadComplete={handleUploadComplete}
        onUploadError={() => setMessage('❌ Erreur UploadThing')}
      />

      <p className="mt-4 text-sm text-gray-600">{message}</p>
    </div>
  );
}
