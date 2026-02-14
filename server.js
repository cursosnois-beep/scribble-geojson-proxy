import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// raiz só pra testar
app.get("/", (_, res) => res.send("ok ✅ use /geojson?id=SEU_ID"));

// aceita /geojson e /geojson/
app.get(/^\/geojson\/?$/, async (req, res) => {
  const id = req.query.id;
  if (!id) return res.status(400).send("Missing ?id=");

  const target = `https://www.scribblemaps.com/api/maps/${id}/geojson`;
  const r = await fetch(target);
  const body = await r.text();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "public, max-age=60");
  res.status(r.status).send(body);
});

app.listen(PORT, () => console.log("Listening on", PORT));