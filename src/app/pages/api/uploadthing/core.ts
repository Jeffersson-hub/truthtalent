import { createUploadthing, type FileRouter } from "uploadthing/server";
 
const f = createUploadthing();

export const ourFileRouter = {
  cvUploader: f({ pdf: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      console.log("Fichier uploadé :", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
