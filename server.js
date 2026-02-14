import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// página raiz só pra testar
app.get("/", (_, res) => res.send("ok ✅ use /geojson?id=SEU_ID"));

// rota do proxy
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
    console.error(e);
    res.status(500).send("Proxy error");
  }
});

app.listen(PORT, () => console.log("Listening on", PORT));