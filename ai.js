import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Returns personalized earning/skill plan
export async function discoverOpportunity(profile) {
  const prompt = `
You are an AI economic advisor.
Analyze this person and suggest:
1. Best income paths
2. Skills to learn
3. First 30-day action plan

User profile:
${JSON.stringify(profile, null, 2)}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.6,
  });

  return response.choices[0].message.content;
}

