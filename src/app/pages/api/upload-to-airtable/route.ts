import { NextRequest, NextResponse } from "next/server";
import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.truthtalent }).base(
  process.env.patbLdGzvKNK4GoQv!
);

export async function POST(req: NextRequest) {
  const { filename, url } = await req.json();

  try {
    await base("CVs").create([
      {
        fields: {
          Nom: filename,
          Upload: [
            {
              url,
            },
          ],
        },
      },
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Airtable error:", error);
    return NextResponse.json({ success: false, error });
  }
}
