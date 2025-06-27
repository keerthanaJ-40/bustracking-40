const io = require("socket.io")(3000, {
    cors: {
      origin: "*",
    }
  });
  
  io.on("connection", (socket) => {
    console.log("Client connected");
  
    socket.on("locationUpdate", (data) => {
      console.log(`Bus ${data.busNumber}:`, data.latitude, data.longitude);
      io.emit("locationUpdate", data); // Broadcast to all clients
    });
  });
  