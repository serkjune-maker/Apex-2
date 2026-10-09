const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const box = document.getElementById("chat-box");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const question = input.value;
  box.innerHTML += `<p><b>You:</b> ${question}</p>`;
  input.value = "";

  const reply = await askAI(question);
  box.innerHTML += `<p><b>AI:</b> ${reply}</p>`;
});

async function askAI(question) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_API_KEY_HERE"
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You are an AI and ML tutor. Explain clearly." },
        { role: "user", content: question }
      ]
    })
  });
  const data = await res.json();
  return data.choices[0].message.content;
}
