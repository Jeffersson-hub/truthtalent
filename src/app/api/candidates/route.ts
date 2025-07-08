import { NextResponse } from 'next/server';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY! }).base(
  process.env.AIRTABLE_BASE_ID!
);

// 👉 Type personnalisé pour les données attendues du front
type IncomingData = {
  filename: string;
  fileUrl: string;
};

export async function POST(req: Request) {
  try {
    const body: IncomingData = await req.json();
    const { filename, fileUrl } = body;

    if (!filename || !fileUrl) {
      return NextResponse.json({ error: 'Nom de fichier ou URL manquant' }, { status: 400 });
    }

    await base('Candidats').create([
      {
        fields: {
          Nom: filename,
          resume: [
            {
              url: fileUrl,
              filename,
              type: 'application/pdf', // ou adapte dynamiquement si nécessaire
            },
          ] as Airtable.Attachment[],
        },
      },
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Erreur ajout Airtable:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
