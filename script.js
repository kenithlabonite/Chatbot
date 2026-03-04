const API_KEY = "AIzaSyBZ4zBsjTsnkuTUsF3OXUOsg6q19EVwVLM";

async function sendMessage() {
  const inputField = document.getElementById("user-input");
  const text = inputField.value.trim();
  if (!text) return;

  addMessage(text, "user");
  inputField.value = "";

  const reply = await generateReply(text);
  addMessage(reply, "bot");
}

function addMessage(content, sender) {
  const chatBox = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.textContent = content;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function generateReply(promptText) {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: promptText }]
            }
          ]
        })
      }
    );

    const result = await response.json();
    return result.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
  } catch (err) {
    console.error(err);
    return "Error connecting to Gemini API.";
  }
}
