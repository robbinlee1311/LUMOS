import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createUser, getUsers } from "./users.js";
import { chatWithAI } from "./ai.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// User routes
app.get("/users", (req, res) => {
  res.json(getUsers());
});

app.post("/users", (req, res) => {
  try {
    const user = createUser(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// AI route
app.post("/ai", async (req, res) => {
  try {
    const { message } = req.body;
    const reply = await chatWithAI(message);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥 LUMOS running on http://localhost:${PORT}`);
});

