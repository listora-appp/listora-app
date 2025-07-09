
const OPENAI_API_KEY = "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";

async function callAI(prompt) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    })
  });
  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No result";
}

document.getElementById("flyer-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = e.target.input.value;
  const output = await callAI("Write a beautiful real estate flyer based on: " + input);
  document.getElementById("flyer-output").textContent = output;
});

document.getElementById("caption-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = e.target.input.value;
  const output = await callAI("Write a catchy social media caption for: " + input);
  document.getElementById("caption-output").textContent = output;
});

document.getElementById("email-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = e.target.input.value;
  const output = await callAI("Write a clean, professional real estate email for: " + input);
  document.getElementById("email-output").textContent = output;
});
