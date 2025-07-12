import { NextRequest, NextResponse } from "next/server";
import { utapi } from "uploadthing/server";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("file") as Blob | null;
  if (!file) {
    return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
  }

  const uploaded = await utapi.uploadFiles(file, { slug: "cvUploader" });
  if (!uploaded?.[0]?.url) {
    return NextResponse.json({ error: "Échec UploadThing" }, { status: 500 });
  }
  return NextResponse.json({ url: uploaded[0].url });
}
