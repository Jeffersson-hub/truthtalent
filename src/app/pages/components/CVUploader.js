// components/CVUploader.js
import { useState } from 'react';

export default function CVUploader() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('cv', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();
    setStatus(result.message);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="ml-2 bg-blue-600 text-white px-4 py-1 rounded">
        Upload
      </button>
      {status && <p className="mt-2 text-sm text-gray-700">{status}</p>}
    </div>
  );
}
