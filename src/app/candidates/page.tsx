'use client';

import { useRouter } from 'next/navigation';
import UploadCVWithDrop from '../components/UploadCVWithDrop';

export default function CandidatesPage() {
  const router = useRouter();

  return (
    <div className="p-8">
      <button
        onClick={() => router.push("/")}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Retour à l’accueil
      </button>

      <h1 className="text-2xl font-bold mb-4">👤 Envoyer un CV</h1>
      <UploadCVWithDrop />
    </div>
    
  );
}

