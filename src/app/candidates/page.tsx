'use client';

import UploadCVWithDrop from '@/app/components/UploadCVWithDrop'; // ou UploadCV selon ton composant

export default function CandidatesPage() {
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">📤 Déposez votre CV</h1>
      <UploadCVWithDrop />
    </div>
  );
}
