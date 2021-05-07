const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
	cors: {
		origin: "*",
	},
});
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

io.on("connection", (socket) => {
	socket.on("join", ({ name, room }) => {
		const { user } = addUser({ id: socket.id, name, room });

		socket.emit("message", {
			user: "admin",
			text: `${user.name}, welcome to room ${user.room}.`,
		});
		socket.broadcast
			.to(user.room)
			.emit("message", { user: "admin", text: `${user.name} has joined!` });

		socket.join(user.room);

		io.to(user.room).emit("roomData", {
			room: user.room,
			room: getUsersInRoom(user.room),
		});
	});

	socket.on("sendMessage", (message) => {
		const user = getUser(socket.id);

		io.to(user.room).emit("message", { user: user.name, text: message });
	});

	socket.on("disconnect", () => {
		const user = removeUser(socket.id);

		if (user) {
			io.to(user.room).emit("message", {
				user: "Admin",
				text: `${user.name} has left.`,
			});
			io.to(user.room).emit("roomData", {
				room: user.room,
				users: getUsersInRoom(user.room),
			});
		}
	});
});

app.get("/", (req, res) => {
	res.send("serv is up n running");
});
app.use(cors());

const PORT = 5000;
server.listen(PORT, () => console.log(`Serv running on ${PORT}`));
