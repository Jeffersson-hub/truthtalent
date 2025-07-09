import { NextRequest } from "next/server";
import { base } from "@/lib/airtable";

export async function POST(req: NextRequest) {
  try {
    const { nom, email, competences, resumeUrl, filename } = await req.json();

    await base('Candidats').create([
      {
        fields: {
          Nom: nom,
          Email: email,
          Compétences: competences,
          resumeUrl,
          filename,
          date: new Date().toISOString(),
        },
      },
    ]);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: any) {
    console.error("Erreur Airtable :", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
