import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function CandidaturePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p className="text-center mt-10">Accès réservé. Veuillez vous connecter.</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Importer des CVs</h1>
      {/* 👉 Composant upload ici */}
      {/* 👉 Composant liste des candidatures analysées */}
    </div>
  );
}
