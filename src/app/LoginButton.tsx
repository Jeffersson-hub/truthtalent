'use client';

import { signIn } from 'next-auth/react';

export default function LoginButton() {
  return (
    <button onClick={() => signIn('github')} className="btn btn-primary">
      Se connecter avec GitHub
    </button>
  );
}
