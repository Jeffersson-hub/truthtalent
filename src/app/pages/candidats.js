export default async function handler(req, res) {
  const response = await fetch("https://api.airtable.com/v0/appwxroq7eFUVsw9D/tblcmW4PCUH99ZJ12", {
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
    },
  });

  const data = await response.json();
  res.status(200).json(data);
}
