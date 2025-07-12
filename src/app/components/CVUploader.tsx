'use client';

import React, { useState, useCallback } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import { UploadProgress } from '../types';

interface CVUploadProps {
  onFilesUploaded: (files: File[]) => void;
}

const CVUpload: React.FC<CVUploadProps> = ({ onFilesUploaded }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files || []).filter(isCVFile);
    if (files.length > 0) processFiles(files);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(isCVFile);
    if (files.length > 0) processFiles(files);
  };

  const isCVFile = (file: File) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    return allowedTypes.includes(file.type) ||
      allowedExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
  };

  const processFiles = async (files: File[]) => {
    const newProgress: UploadProgress[] = files.map(file => ({
      fileName: file.name,
      progress: 0,
      status: 'uploading'
    }));
    setUploadProgress(newProgress);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = await uploadToBackend(file);

      setUploadProgress(prev =>
        prev.map((item, idx) =>
          idx === i
            ? {
                ...item,
                progress: 100,
                status: url ? 'completed' : 'error'
              }
            : item
        )
      );

      if (url) {
        await sendToAirtable(file.name, url); // 👈 Envoi vers Airtable
      }
    }

    onFilesUploaded(files);
  };

  const uploadToBackend = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload-from-ui", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("❌ Upload échoué:", errText);
        return null;
      }

      const data = await res.json();
      console.log("✅ URL retournée:", data.url);
      return data.url;
    } catch (err) {
      console.error("💥 Erreur upload:", err);
      return null;
    }
  };

  const sendToAirtable = async (fileName: string, resumeUrl: string) => {
    try {
      const response = await fetch("/api/airtable-insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateName: fileName.replace(/\.[^/.]+$/, ''), // Nom sans extension
          email: "non.renseigne@example.com", // valeur fictive
          phone: "",
          profilePhoto: "",
          skills: "",
          experiences: "",
          softSkills: "",
          resumeUrl: resumeUrl,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("❌ Erreur Airtable:", error);
      } else {
        console.log("✅ Candidat enregistré dans Airtable");
      }
    } catch (err) {
      console.error("💥 Exception Airtable:", err);
    }
  };

  const removeUpload = (index: number) => {
    setUploadProgress(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Téléverser des CV</h2>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Glissez-déposez vos CV ici</h3>
        <p className="text-gray-500 mb-4">ou cliquez pour sélectionner des fichiers</p>

        <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
          <FileText className="h-4 w-4 mr-2" />
          Choisir des fichiers
          <input type="file" multiple accept=".pdf,.doc,.docx" onChange={handleFileSelect} className="hidden" />
        </label>

        <p className="text-xs text-gray-400 mt-2">Formats acceptés: PDF, DOC, DOCX</p>
      </div>

      {uploadProgress.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Progression du téléversement</h3>
          <div className="space-y-3">
            {uploadProgress.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {item.status === 'completed' && <CheckCircle className="h-4 w-4 text-green-500" />}
                    {item.status === 'error' && <AlertCircle className="h-4 w-4 text-red-500" />}
                    {(item.status === 'uploading' || item.status === 'processing') && (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent" />
                    )}
                    <span className="text-sm font-medium text-gray-900">{item.fileName}</span>
                  </div>
                  <button onClick={() => removeUpload(index)} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      item.status === 'completed'
                        ? 'bg-green-500'
                        : item.status === 'error'
                        ? 'bg-red-500'
                        : 'bg-blue-500'
                    }`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>
                    {item.status === 'uploading' && 'Téléversement...'}
                    {item.status === 'processing' && 'Analyse...'}
                    {item.status === 'completed' && 'Terminé'}
                    {item.status === 'error' && 'Erreur'}
                  </span>
                  <span>{Math.round(item.progress)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CVUpload;
