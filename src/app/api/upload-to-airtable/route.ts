import { NextRequest, NextResponse } from "next/server";
import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  process.env.AIRTABLE_BASE_ID!
);

const table = base(process.env.AIRTABLE_TABLE_ID!);

export async function POST(req: NextRequest) {
  const { filename, url } = await req.json();

  try {
    await base("candidates").create([
      {
        fields: {
          Nom: filename,
          date: new Date().toISOString(),
          resume: [{ url }],
        },
      },
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Airtable error:", err);
    return NextResponse.json({ success: false });
  }
}
