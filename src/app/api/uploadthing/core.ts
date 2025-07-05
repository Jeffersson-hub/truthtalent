// src/app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next"; // ✅

const f = createUploadthing();

export const ourFileRouter = {
  cvUploader: f({ pdf: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      console.log("✅ Fichier reçu :", file.url);
      return { uploadedUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

console.log("🔐 UploadThing App ID:", process.env.UPLOADTHING_APP_ID);
console.log("🔐 UploadThing Secret:", process.env.UPLOADTHING_SECRET);
