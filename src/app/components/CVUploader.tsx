'use client';

import React, { useState } from 'react';
import { UploadDropzone } from '@uploadthing/react';
// import { ourFileRouter } from '@/app/api/uploadthing/core';

export default function UploadCV() {
  const [message, setMessage] = useState('');

  // ✅ Typage correct de `res` en fonction de la structure renvoyée par UploadThing
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
      const response = await fetch('/api/candidates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename, fileUrl }),
      });

      if (response.ok) {
        setMessage('✅ CV uploadé et stocké dans Airtable');
      } else {
        setMessage('❌ Erreur lors de l’envoi à Airtable');
      }
    } catch (error) {
      console.error('Erreur fetch :', error);
      setMessage('❌ Erreur réseau');
    }
  };

  return (
    <div className="p-4 border rounded-xl bg-white shadow">
      <h2 className="text-xl font-bold mb-4">Uploader un CV</h2>

      <UploadDropzone
        endpoint="cvUploader"
        onClientUploadComplete={handleUploadComplete}
        onUploadError={() => setMessage('❌ Erreur UploadThing')}
      />

      <p className="mt-4 text-sm text-gray-600">{message}</p>
    </div>
  );
}
