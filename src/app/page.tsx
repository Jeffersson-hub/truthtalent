'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/candidates');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Bienvenue sur TruthTalent</h1>
      <p className="text-lg mb-6">Cliquez sur le bouton ci-dessous pour importer des CV</p>

      <button
        onClick={handleClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl text-lg shadow"
      >
        Candidates
      </button>
    </main>
  );
}
