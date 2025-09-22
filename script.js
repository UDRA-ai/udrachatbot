const form = document.getElementById('chatForm');
const promptEl = document.getElementById('prompt');
const messages = document.getElementById('messages');

function addMessage(text, cls) {
  const div = document.createElement('div');
  div.className = 'msg ' + cls;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = promptEl.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  promptEl.value = '';

  const loading = document.createElement('div');
  loading.className = 'msg ai';
  loading.textContent = 'Thinking...';
  messages.appendChild(loading);

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: text })
    });

    const data = await res.json();
    loading.remove();
    addMessage(data.reply || "No reply", 'ai');
  } catch (err) {
    loading.remove();
    addMessage("Error: " + err.message, 'ai');
  }
});
