// // app/page.tsx
// import { redirect } from "next/navigation";

// export default function Home() {
//   redirect("/dashboard");
// }
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return null; // Ou un message de redirection temporaire
}