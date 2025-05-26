const socket = io("http://localhost:3000");
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");

// اتصال به سرور
socket.on("connect", () => {
  addMessage("وصل شد به سرور", "client");
});

// دریافت پیام از سرور
socket.on("testFromServer", (msg) => {
  addMessage(`پیام از سرور: ${msg}`, "server");
});

// ارسال پیام به سرور
function sendMessage() {
  const message = messageInput.value;
  if (message.trim()) {
    socket.emit("testFromClient", message);
    addMessage(`پیام به سرور: ${message}`, "client");
    messageInput.value = "";
  }
}

// اضافه کردن پیام به صفحه
function addMessage(message, type) {
  const messageElement = document.createElement("div");
  messageElement.className = `message ${type}`;
  messageElement.textContent = message;
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// ارسال پیام
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});
