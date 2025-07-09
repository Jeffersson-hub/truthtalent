import { NextResponse } from 'next/server';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID!
);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("📥 Données reçues dans l'API :", data);

    const { nom, email, competences, fichiers } = data;

    if (!fichiers || fichiers.length === 0) {
      console.error("❌ Aucun fichier reçu");
      return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
    }

    const recordData = {
      Nom: nom,
      Email: email,
      Compétences: competences,
      Date: new Date().toISOString(),
      "piece jointe": fichiers.map((file: any) => ({
        url: file.url,
        filename: file.name,
      })),
    };

    console.log("📤 Envoi vers Airtable :", recordData);

    const airtableRes = await base(process.env.AIRTABLE_TABLE_ID!).create([
      { fields: recordData }
    ]);

    console.log("✅ Réponse Airtable :", airtableRes[0].id);

    return NextResponse.json({ success: true, recordId: airtableRes[0].id });
  } catch (err: any) {
    console.error("❌ Erreur dans API /candidates :", err);
    return NextResponse.json({ error: "Erreur API" }, { status: 500 });
  }
}
