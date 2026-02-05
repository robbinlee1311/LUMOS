import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/* -------------------------
   FRONTEND UI
--------------------------*/

app.get("/", (req, res) => {
  res.type("html").send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>LUMOS</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      background: radial-gradient(circle at top, #020617, #000);
      color: #e6edf3;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .container {
      max-width: 600px;
      width: 90%;
      background: #020617;
      border: 1px solid #1e293b;
      border-radius: 12px;
      padding: 32px;
      box-shadow: 0 0 40px rgba(56,189,248,0.15);
    }
    h1 {
      margin-top: 0;
      color: #7dd3fc;
      letter-spacing: 0.08em;
    }
    p {
      color: #94a3b8;
    }
    textarea {
      width: 100%;
      background: #020617;
      border: 1px solid #334155;
      border-radius: 8px;
      padding: 12px;
      color: #e6edf3;
      resize: none;
      margin-top: 12px;
    }
    button {
      margin-top: 16px;
      background: #38bdf8;
      color: #020617;
      border: none;
      border-radius: 8px;
      padding: 12px 20px;
      font-weight: 600;
      cursor: pointer;
    }
    button:hover {
      background: #7dd3fc;
    }
    footer {
      margin-top: 24px;
      font-size: 0.85em;
      color: #64748b;
      text-align: center;
    }
  </style>
</head>
<body>

  <div class="container">
    <h1>LUMOS</h1>
    <p>Ask. Explore. Connect. No accounts. No gatekeepers.</p>

    <textarea rows="4" placeholder="Say something to LUMOS…"></textarea>
    <button disabled>Coming Online</button>

    <footer>
      Status: <strong>LIVE</strong><br />
      <a href="/docs" style="color:#7dd3fc;text-decoration:none;">API Docs</a>
    </footer>
  </div>

</body>
</html>
  `);
});

/* -------------------------
   API
--------------------------*/

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.get("/docs", (req, res) => {
  res.type("html").send(`
    <h1>LUMOS API</h1>
    <p>See full docs here. UI-first. API expanding.</p>
  `);
});

/* -------------------------
   SERVER
--------------------------*/

app.listen(PORT, () => {
  console.log(\`🔥 LUMOS running on http://localhost:\${PORT}\`);
});

