import { NextRequest, NextResponse } from "next/server";
import Airtable from "airtable";

// Connexion Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY! }).base(
  process.env.AIRTABLE_BASE_ID!
);

const table = base(process.env.AIRTABLE_TABLE_ID!);

// API POST
export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // 🟢 Ceci doit venir avant tout

    const created = await base(AIRTABLE_TABLE_ID).create([
      {
        fields: {
          "Candidate Name": body.candidateName,
          "Email address": body.email,
          "Phone Number": body.phone,
          "Resume URL": body.resumeUrl,
          "Skills": body.skills,
          "Experiences": body.experiences,
          "Soft Skills": body.softSkills,
          "Profile Photo": body.profilePhoto || "",
          "Application Date": new Date().toISOString(), // Facultatif
        },
      },
    ]);

    console.log("✅ Ajout réussi dans Airtable:", created[0].id);
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("❌ Airtable error:", error);
    return NextResponse.json({ error: "Erreur Airtable" }, { status: 500 });
  }
}
