// pages/api/upload.js
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ message: 'Erreur de parsing' });

    const file = files.cv;
    const data = fs.readFileSync(file.filepath);

    // ➕ Traitement du CV ici (ex: envoyer à Airtable ou extraction avec Python)

    res.status(200).json({ message: 'CV reçu avec succès' });
  });
}
