import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  return res.sendStatus(204);
});

app.get("/health", (_, res) => res.send("ok"));
// rota raiz (pra não dar Cannot GET /)
app.get("/", (req, res) => {
  res.type("text").send("OK ✅ Use /geojson?id=vhy0OQ3skk");
});

app.get("/geojson", async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) return res.status(400).send("Missing ?id=");

    const target = `https://www.scribblemaps.com/api/maps/${id}/geojson`;

    const r = await fetch(target);
    const body = await r.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Cache-Control", "public, max-age=60");

    res.status(r.status).send(body);
  } catch (e) {
    res.status(500).send("Proxy error");
  }
});
app.get("/", (req, res) => {
  res.type("text").send("OK. Use /geojson?id=SEU_ID (ex: /geojson?id=vhy0OQ3skk)");
});

app.listen(PORT, () => console.log("Listening on", PORT));