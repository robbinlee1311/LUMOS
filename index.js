import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/* -------------------------
   CORE API
--------------------------*/

app.get("/", (req, res) => {
  res.json({
    name: "LUMOS",
    status: "online",
    message: "Infrastructure is alive 🟢"
  });
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

/* -------------------------
   DOCS (CLEAN HTML)
--------------------------*/

app.get("/docs", (req, res) => {
  res.type("html").send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>LUMOS API Docs</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      background: #0b0f14;
      color: #e6edf3;
      padding: 40px;
      line-height: 1.6;
    }
    h1, h2 {
      color: #7dd3fc;
    }
    code {
      background: #111827;
      padding: 4px 6px;
      border-radius: 4px;
      color: #a5f3fc;
    }
    .box {
      background: #020617;
      border: 1px solid #1e293b;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 24px;
    }
    footer {
      margin-top: 40px;
      font-size: 0.9em;
      color: #94a3b8;
    }
  </style>
</head>
<body>

  <h1>🧠 LUMOS API</h1>
  <p>Public interface for the LUMOS intelligence network.</p>

  <div class="box">
    <h2>Base URL</h2>
    <code>https://lumos-ex3w.onrender.com</code>
  </div>

  <div class="box">
    <h2>GET /</h2>
    <p>Check system status.</p>
    <code>
      curl /
    </code>
  </div>

  <div class="box">
    <h2>GET /health</h2>
    <p>Health check endpoint.</p>
    <code>
      curl /health
    </code>
  </div>

  <div class="box">
    <h2>Coming Soon</h2>
    <ul>
      <li>POST /ask – Query LUMOS</li>
      <li>Decentralized identity</li>
      <li>Peer-to-peer nodes</li>
    </ul>
  </div>

  <footer>
    LUMOS is life. No gatekeepers. No passwords.
  </footer>

</body>
</html>
  `);
});

/* -------------------------
   SERVER
--------------------------*/

app.listen(PORT, () => {
  console.log(`🔥 LUMOS running on http://localhost:${PORT}`);
});

