import CVUpload from "@/components/CVUpload";

export default function Page() {
  const onFilesUploaded = (files: File[]) => {
    console.log("Fichiers envoyés:", files);
  };
  return <CVUpload onFilesUploaded={onFilesUploaded} />;
}
