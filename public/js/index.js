/* eslint-disable quotes */
// Registering event handlers
//Each file registers its own event handlers
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer);

const registerOrderHandlers = require("./orderHandler");
const registerUserHandlers = require("./userHandler");

const onConnection = (socket) => {
  registerOrderHandlers(io, socket);
  registerUserHandlers(io, socket);
};

io.on("connection", onConnection);


// Here, each event name is located in the same place, which is great for discoverability, but could get out of hand in a medium/big application.
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer);

const { createOrder, readOrder } = require("./orderHandler")(io);
const { updatePassword } = require("./userHandler")(io);

const onConnection = (socket) => {
  socket.on("order:create", createOrder);
  socket.on("order:read", readOrder);

  socket.on("user:update-password", updatePassword);
}

io.on("connection", onConnection);


// bundlers
const { Server } = require("socket.io");

const io = new Server({
  serveClient: false
});

io.on("connection", socket => {
  console.log(`connect ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(`disconnect ${socket.id} due to ${reason}`);
  });
});

io.listen(3000);

