import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  cvUploader: f({ pdf: {}, doc: {}, docx: {} })
    .onUploadComplete(({ file }) => {
      console.log("Fichier uploadé:", file);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
