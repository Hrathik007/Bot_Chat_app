const chatBox = document.getElementById('chatBox');
const chatInput = document.getElementById('chatInput');
const themeToggle = document.getElementById('theme-toggle');

function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  appendMessage('user', text);
  chatInput.value = '';

  setTimeout(() => {
    showTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator();
      appendMessage('bot', getBotReply(text));
    }, 1000);
  }, 500);
}

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);

  const avatar = document.createElement('img');
  avatar.src = sender === 'user'
    ? 'https://i.pravatar.cc/30?u=user'
    : 'https://i.pravatar.cc/30?u=bot';
  avatar.alt = sender;

  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  bubble.innerHTML = `
    ${text}
    <div class="timestamp">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
  `;

  msg.appendChild(avatar);
  msg.appendChild(bubble);
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function showTypingIndicator() {
  const typing = document.createElement('div');
  typing.classList.add('message', 'bot');
  typing.id = 'typing';
  typing.innerHTML = `
    <img src="https://i.pravatar.cc/30?u=bot" alt="Bot" />
    <div class="bubble">Typing...</div>
  `;
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTypingIndicator() {
  const typing = document.getElementById('typing');
  if (typing) typing.remove();
}

function getBotReply(msg) {
  const m = msg.toLowerCase();
  if (m.includes('hello') || m.includes('hi')) return "Hi there! 👋 How can I assist you?";
  if (m.includes('how are you')) return "I'm doing great! Thanks for asking.";
  if (m.includes('help')) return "You can ask me anything, I'm here to help!";
  if (m.includes('bye')) return "Goodbye! 👋 Have a nice day!";
  if (m.includes('time')) return `🕒 The time is ${new Date().toLocaleTimeString()}`;
  return "Hmm... I didn't get that. Try saying 'hello' or 'help'.";
}

chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
