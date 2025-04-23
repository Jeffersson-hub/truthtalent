export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-center">TruthTalent – Dashboard Recrutement</h1>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <section className="bg-blue p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Candidatures</h2>
          <p>Voir et gérer les candidatures reçues</p>
        </section>
        <section className="bg-green p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Offres d&apos;emploi</h2>
          <p>Créer ou modifier les annonces de recrutement</p>
        </section>
        <section className="bg-pink p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Analytique</h2>
          <p>Suivi des performances de recrutement</p>
        </section>
      </main>
    </div>
  );
}
