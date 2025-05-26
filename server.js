const PORT = 3000;
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname)));

// مسیر اصلی
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");

  // ارسال پیام به کلاینت
  socket.emit("testFromServer", "hello from server");

  // دریافت پیام از کلاینت
  socket.on("testFromClient", (msg) => {
    console.log("message from client:", msg);
    // ارسال پیام به همه کلاینت‌ها
    io.emit("testFromServer", `get message from client: ${msg}`);
  });

  // مدیریت قطع اتصال
  socket.on("disconnect", () => {
    console.log("a client disconnect");
  });
});

server.listen(PORT, () => {
  console.log(`run server on port ${PORT}`);
});