export async function onRequestPost(context) {
  const API_KEY = context.env.GROQ_API_KEY; // This pulls your SECRET
  const body = await context.request.json();

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: body.model || "llama-3.2-11b-vision-preview",
      messages: body.messages, // Pass the whole history securely
      max_tokens: 1000
    })
  });

  const result = await response.json();
  return new Response(JSON.stringify(result));
}
