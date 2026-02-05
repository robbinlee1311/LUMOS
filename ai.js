import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function chatWithAI(message) {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are LUMOS, a calm, intelligent guide." },
      { role: "user", content: message }
    ]
  });

  return response.choices[0].message.content;
}
