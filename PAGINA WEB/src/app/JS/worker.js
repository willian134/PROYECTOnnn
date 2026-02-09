export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return new Response("xChatGPT Image Server Running");
    }

    const { prompt } = await request.json();

    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer TU_API_KEY"
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt: prompt,
        size: "1024x1024"
      })
    });

    const data = await res.json();

    return new Response(JSON.stringify({
      image: data.data[0].url
    }), {
      headers: { "Content-Type": "application/json" }
    });
  }
};
