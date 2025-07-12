// src/app/api/airtable-insert/route.ts

import { NextRequest, NextResponse } from "next/server";
import Airtable from "airtable";

Airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY });
const base = Airtable.base("appwxroq7eFUVsw9D"); // ✅ ID de la base

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log("📥 Données reçues:", body);

  try {
    const resumeAttachment = body.resumeUrl
      ? [
          {
            url: body.resumeUrl,
            filename: `cv_${body.candidateName}.pdf`,
          },
        ]
      : [];

    await base("Candidates").create({
      fields: {
        "Candidate Name": body.candidateName,
        "Email Address": body.email,
        "Phone Number": body.phone,
        "Profile Photo": body.profilePhoto || "",
        "Skills": body.skills || "",
        "Experiences": body.experiences || "",
        "Soft Skills": body.softSkills || "",
        "resumeUrl": resumeAttachment,
      },
    });

    console.log("✅ Candidat ajouté à Airtable");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Erreur Airtable:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
