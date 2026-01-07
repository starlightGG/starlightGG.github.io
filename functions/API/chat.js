export async function onRequestPost(context) {
  try {
    const API_KEY = context.env.GROQ_API_KEY;
    const body = await context.request.json();

    // Multimodal models expect an array of content (text + image)
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.2-11b-vision-preview", // Make sure this is a vision model
        messages: [
          {
            role: "user",
            content: body.content // We pass the whole content array from the frontend
          }
        ],
      }),
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
