const port = process.env.PORT || 5000;
const io = require("socket.io")(port, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let figures = [];
let drawing = [];

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.emit("initData", { figures, drawing });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("draw", (data) => {
    drawing.push(data);
    socket.broadcast.emit("draw", data);
  });

  socket.on("addFigure", (figure) => {
    figures.push(figure);
    socket.broadcast.emit("addFigure", figure);
  });

  socket.on("clearCanvas", () => {
    drawing = [];
    figures = [];
    socket.broadcast.emit("clearCanvas");
  });
});
