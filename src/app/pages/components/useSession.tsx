'use client';

import { useSession } from 'next-auth/react';

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return <p>Vous devez être connecté</p>;
  }

  return <p>Bienvenue {session.user?.name}</p>;
}
