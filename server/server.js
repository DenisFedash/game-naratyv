const http = require("http");
const port = process.env.PORT || 5000;
const io = require("socket.io")(port, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

const server = http.createServer();
io.attach(server);

let figures = [];
let drawing = [];

// io.on("connection", (socket) => {
//   console.log("a user connected");

//   socket.emit("initData", { figures, drawing });

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });

//   socket.on("draw", (data) => {
//     drawing.push(data);
//     socket.broadcast.emit("draw", data);
//   });

//   socket.on("addFigure", (figure) => {
//     figures.push(figure);
//     socket.broadcast.emit("addFigure", figure);
//   });

//   socket.on("clearCanvas", () => {
//     drawing = [];
//     figures = [];
//     socket.broadcast.emit("clearCanvas");
//   });
// });

let currentCanvasData;
let currentBackgroundColor;
let eraserMode = false;
let timerInterval;

io.on("connection", (socket) => {
	console.log("New client connected");

	if (currentCanvasData) {
		socket.emit("canvas-data", currentCanvasData);
	}

	if (currentBackgroundColor) {
		socket.emit("background-color", currentBackgroundColor);
	}

	if (timerInterval) {
		socket.emit("timer-update", timerInterval / 1000);
	}

	// socket.emit("eraser-mode", eraserMode);

	socket.on("canvas-data", (data) => {
		currentCanvasData = data;
		io.emit("canvas-data", data);
	});

	socket.on("get-canvas-data", () => {
		if (currentCanvasData) {
			socket.emit("canvas-data", currentCanvasData);
		}
	});

	socket.on("background-color", (color) => {
		currentBackgroundColor = color;
		io.emit("background-color", color);
	});

	socket.on("history", (teamHistory) => io.emit("history", teamHistory));

	socket.on("is-pressed", (isPressed) => io.emit("is-pressed", isPressed));

	// Обработчик изменения режима ластика
	// socket.on("eraser-mode", (mode) => {
	//   console.log("Eraser mode received:", mode);
	//   eraserMode = mode;
	//   // Отправляем состояние режима ластика всем подключенным клиентам
	//   io.emit("eraser-mode", mode);
	// });

	socket.on("start-timer", () => {
		if (!timerInterval) {
			let timer = 120; // Время в секундах
			timerInterval = setInterval(() => {
				if (timer > 0) {
					timer -= 1;
					io.emit("timer-update", timer); // Отправка обновленного времени всем клиентам
				} else {
					clearInterval(timerInterval);
					timerInterval = null;
				}
			}, 1000);
		}
	});

	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});
});
