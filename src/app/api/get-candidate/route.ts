import { NextResponse } from "next/server";
import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID!
);

export async function GET() {
  try {
    const records = await base("candidates").select({ maxRecords: 50 }).all();

    const result = records.map((record) => ({
      id: record.id,
      Nom: record.get("Nom") as string,
      resumeUrl: (record.get("resume") as any)?.[0]?.url || "",
      date: record.get("date") as string,
    }));

    return NextResponse.json({ records: result });
  } catch (err) {
    console.error("Erreur Airtable", err);
    return NextResponse.json({ error: true });
  }
}
