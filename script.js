const chatWindow = document.getElementById('chatWindow');
const input = document.getElementById('messageInput');
const toggleThemeBtn = document.getElementById('toggleTheme');

// Send message
function sendMessage() {
  const text = input.value.trim();
  if (text === '') return;

  appendMessage('user', text);
  input.value = '';

  // Simulate bot reply
  setTimeout(() => {
    const botReply = getBotReply(text);
    appendMessage('bot', botReply);
  }, 800);
}

// Append message to chat
function appendMessage(sender, text) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender);

  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  msgDiv.innerHTML = `
    <div>${text}</div>
    <div class="timestamp">${timestamp}</div>
  `;

  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Simulated bot logic
function getBotReply(userMsg) {
  const responses = {
    hello: "Hi there! How can I help?",
    help: "Sure! I can assist you with anything you need.",
    bye: "Goodbye! Have a great day!",
  };

  const msg = userMsg.toLowerCase();
  return responses[msg] || "I'm a bot, I didn't understand that.";
}

// Handle enter key
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// Dark mode toggle
toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
