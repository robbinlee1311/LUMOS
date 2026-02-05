import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* =========================
   ROOT
========================= */
app.get("/", (req, res) => {
  res.send("🔥 LUMOS is alive");
});

/* =========================
   PUBLIC API DOCS
========================= */
app.get("/docs", (req, res) => {
  res.json({
    name: "LUMOS",
    version: "v1",
    baseUrl: "https://lumos-ex3w.onrender.com",
    endpoints: {
      root: "GET /",
      docs: "GET /docs",
      ai: "POST /ai",
      identity: "GET /id/new"
    }
  });
});

/* =========================
   AI ENDPOINT (SAFE STUB)
========================= */
app.post("/ai", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message required" });
  }

  // Temporary response so system never crashes
  res.json({
    reply: `LUMOS received: "${message}"`
  });
});

/* =========================
   DECENTRALIZED IDENTITY
========================= */
import crypto from "crypto";

app.get("/id/new", (req, res) => {
  const key = crypto.randomBytes(32).toString("hex");

  res.json({
    did: `did:lumos:${key.slice(0, 16)}`,
    publicKey: key
  });
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 LUMOS running on http://localhost:${PORT}`);
});

