import { NextResponse } from "next/server";
import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY! }).base(
  process.env.AIRTABLE_BASE_ID!
);

type Candidat = {
  id: string;
  Nom: string;
  resumeUrl: string;
  date?: string;
};

export async function GET() {
  try {
    const records = await base("candidates").select({ maxRecords: 50 }).all();

    const result: Candidat[] = records.map((record) => {
      const resumeField = record.get("resume") as Airtable.Attachment[] | undefined;

      return {
        id: record.id,
        Nom: (record.get("Nom") as string) || "Sans nom",
        resumeUrl: resumeField?.[0]?.url || "",
        date: record.get("date") as string,
      };
    });

    return NextResponse.json({ records: result });
  } catch (err) {
    console.error("Erreur Airtable", err);
    return NextResponse.json({ error: true });
  }
}
