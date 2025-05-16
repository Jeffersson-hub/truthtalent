export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          TruthTalent – Dashboard Recrutement
        </h1>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <section className="bg-blue-500 text-white p-6 rounded-2xl shadow-lg hover:bg-blue-600 transition">
          <h2 className="text-xl font-semibold mb-2">Candidatures</h2>
          <p>Voir et gérer les candidatures reçues</p>
        </section>

        <section className="bg-green-500 text-white p-6 rounded-2xl shadow-lg hover:bg-green-600 transition">
          <h2 className="text-xl font-semibold mb-2">Offres d&apos;emploi</h2>
          <p>Créer ou modifier les annonces de recrutement</p>
        </section>

        <section className="bg-pink-500 text-white p-6 rounded-2xl shadow-lg hover:bg-pink-600 transition">
          <h2 className="text-xl font-semibold mb-2">Analytique</h2>
          <p>Suivi des performances de recrutement</p>
        </section>
      </main>
    </div>
  );
}