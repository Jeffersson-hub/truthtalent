'use client';

import { useState } from "react";

export default function UploadCV() {
  const [files, setFiles] = useState<File[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);

    // ⬇️ Ici tu peux envoyer vers ton API de parsing CV
  };

  return (
    <div className="border border-dashed border-gray-400 p-6 rounded-lg">
      <input type="file" multiple accept=".pdf,.doc,.docx" onChange={handleUpload} />
      <ul className="mt-4">
        {files.map((file, i) => (
          <li key={i}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
}
