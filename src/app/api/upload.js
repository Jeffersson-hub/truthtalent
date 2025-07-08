// pages/api/upload.js
import formidable from 'formidable';
import fs from 'fs';

// Désactive le body parser de Next.js pour gérer le fichier manuellement
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Erreur formidable:', err);
      return res.status(500).json({ message: 'Erreur de parsing' });
    }

    const file = files.cv;
    if (!file || !file.filepath) {
      return res.status(400).json({ message: 'Fichier manquant' });
    }

    // 🔽 Lecture du fichier
    try {
      const data = fs.readFileSync(file.filepath);
      // ➕ Traitement du CV ici (ex: stocker, parser, envoyer à Airtable)
      res.status(200).json({ message: 'CV reçu avec succès' });
    } catch (err) {
      console.error('Erreur lecture fichier:', err);
      res.status(500).json({ message: 'Erreur lors de la lecture du fichier' });
    }
  });
}
