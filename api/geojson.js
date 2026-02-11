export default async function handler(req, res) {
  const id = req.query.id;
  if (!id) return res.status(400).send("Missing ?id=");

  const target = `https://www.scribblemaps.com/api/maps/${id}/geojson`;
  const r = await fetch(target);
  const body = await r.text();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "public, s-maxage=60");
  res.status(r.status).send(body);
}