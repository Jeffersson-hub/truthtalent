// 📄 src/app/page.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Bienvenue sur TruthTalent</h1>
      <p className="text-lg mb-6">Cliquez sur le bouton ci-dessous pour importer des CV</p>

      <button
        onClick={() => router.push("/candidats")}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl text-lg shadow"
      >
        Candidats
      </button>
    </main>
  );
}
