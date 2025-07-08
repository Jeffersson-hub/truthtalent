'use client';

import React, { useState } from 'react';

export default function UploadCV() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected || selected.length === 0) return;

    const file = selected[0]; // un seul fichier
    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setMessage('');

    const res = await fetch('/api/upload-cv', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      setMessage('CV envoyé et stocké dans Airtable ✅');
    } else {
      setMessage('Erreur lors de l’envoi ❌');
    }

    setUploading(false);
  };

  return (
    <div className="p-4 border rounded-xl bg-white shadow">
      <h2 className="text-xl font-bold mb-4">Uploader un CV</h2>
      <input type="file" accept=".pdf,.doc,.docx" onChange={handleUpload} />
      <p className="mt-4 text-sm text-gray-600">{uploading ? 'Envoi...' : message}</p>
    </div>
  );
}
