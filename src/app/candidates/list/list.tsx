'use client';

import { useEffect, useState } from 'react';

type Candidat = {
  id: string;
  Nom: string;
  url: string;
  date: string;
};

export default function ListCandidates() {
  const [candidats, setCandidats] = useState<Candidat[]>([]);

  useEffect(() => {
    fetch('/api/get-candidate')
      .then((res) => res.json())
      .then((data) => {
        setCandidats(data.records || []);
      });
  }, []);

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4">📄 CV reçus</h3>
      <ul className="space-y-4">
        {candidats.map((candidat) => (
          <li
            key={candidat.id}
            className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{candidat.Nom}</p>
              <p className="text-sm text-gray-500">{new Date(candidat.date).toLocaleString()}</p>
            </div>
            <a
              href={candidat.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline text-sm"
            >
              Ouvrir le CV
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
