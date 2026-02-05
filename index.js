import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------------
   OPENAI SETUP
--------------------------*/
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

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
body {margin:0;font-family:system-ui;background:#020617;color:#e6edf3;display:flex;justify-content:center;align-items:center;height:100vh;}
.container{max-width:600px;width:90%;background:#020617;border:1px solid #1e293b;border-radius:12px;padding:32px;box-shadow:0 0 40px rgba(56,189,248,0.15);}
h1{margin-top:0;color:#7dd3fc;letter-spacing:0.08em;}
textarea{width:100%;background:#020617;border:1px solid #334155;border-radius:8px;padding:12px;color:#e6edf3;margin-top:12px;resize:none;}
button{margin-top:16px;background:#38bdf8;color:#020617;border:none;border-radius:8px;padding:12px 20px;font-weight:600;cursor:pointer;}
button:hover{background:#7dd3fc;}
#response{margin-top:16px;background:#0f172a;border-radius:8px;padding:12px;min-height:60px;color:#e6edf3;white-space:pre-wrap;transition:all 0.3s ease;}
footer{margin-top:24px;font-size:0.85em;color:#64748b;text-align:center;}
</style>
</head>
<body>
<div class="container">
<h1>LUMOS</h1>
<p>Ask. Explore. Connect. No accounts. No gatekeepers.</p>
<textarea id="prompt" rows="4" placeholder="Say something to LUMOS…"></textarea>
<button id="askBtn">Ask LUMOS</button>
<div id="response"></div>
<footer>Status: <strong>LIVE</strong> | <a href="/docs" style="color:#7dd3fc;text-decoration:none;">API Docs</a></footer>
</div>

<script>
const btn = document.getElementById('askBtn');
const promptInput = document.getElementById('prompt');
const responseBox = document.getElementById('response');

btn.addEventListener('click', async () => {
  const prompt = promptInput.value.trim();
  if(!prompt) return;
  responseBox.textContent = "💡 Thinking…";
  btn.disabled = true;

  try {
    const res = await fetch('/ask', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({prompt})
    });
    const data = await res.json();
    responseBox.textContent = data.answer || "No response.";
  } catch(err) {
    responseBox.textContent = "❌ Error: " + err.message;
  }
  btn.disabled = false;
});
</script>
</body>
</html>
  `);
});

/* -------------------------
   ASK ENDPOINT (OPENAI)
--------------------------*/
app.post("/ask", async (req, res) => {
  const { prompt } = req.body;
  if(!prompt) return res.status(400).json({error:"Prompt is required"});

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{role:"user", content:prompt}],
      temperature: 0.7
    });

    res.json({answer: completion.data.choices[0].message.content});
  } catch(e) {
    console.error(e);
    res.status(500).json({error: "LUMOS failed to answer"});
  }
});

/* -------------------------
   DECENTRALIZED IDENTITY (placeholder)
--------------------------*/
app.get("/wallet-login", (req, res) => {
  res.json({msg:"Wallet login placeholder — integrate blockchain identity here"});
});

/* -------------------------
   P2P LAYER (placeholder)
--------------------------*/
app.get("/p2p-status", (req, res) => {
  res.json({msg:"P2P layer placeholder — integrate peer nodes here"});
});

/* -------------------------
   HEALTH & DOCS
--------------------------*/
app.get("/health", (req, res) => res.send("OK"));
app.get("/docs", (req, res) => res.type("html").send("<h1>LUMOS API Docs</h1><p>Full docs coming soon. /ask endpoint ready.</p>"));

/* -------------------------
   SERVER
--------------------------*/
app.listen(PORT, ()=> console.log(\`🔥 LUMOS live on http://localhost:\${PORT}\`));

