import { NextRequest, NextResponse } from "next/server";
import Airtable from "airtable";

// Connexion Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  process.env.AIRTABLE_BASE_ID!
);

const table = base(process.env.AIRTABLE_TABLE_ID!); // ✅ On réutilise cette constante

// API POST
export async function POST(req: NextRequest) {
  // const { filename, url } = await req.json();
  const { filename } = await req.json();

  try {
    await table.create([
      {
        fields: {
          Nom: filename,
          resume: [
            {
              url: resumeUrl,
              filename: filename,
              type: "application/pdf", // ou "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            },
          ] as Airtable.Attachment[],
        },
      },
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Airtable error:", err);
    return NextResponse.json({ success: false, error: (err as Error).message });
  }
}
