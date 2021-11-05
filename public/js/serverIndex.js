/* eslint-disable quotes */
// Registering event handlers
//Each file registers its own event handlers
const httpServer = require('http').createServer();
const { Server } = require('/models/Server.js');

const registerOrderHandlers = require('./orderHandler');
const registerUserHandlers = require('./userHandler');

const onConnection = (socket) => {
  registerOrderHandlers(io, socket);
  registerUserHandlers(io, socket);
};

io.on('connection', onConnection);


// Here, each event name is located in the same place, which is great for discoverability, but could get out of hand in a medium/big application.
// const httpServer = require("http").createServer();
// const io = require("socket.io")(httpServer);

const { createOrder, readOrder } = require("./orderHandler")(io);
const { updatePassword } = require("./userHandler")(io);

const onConnection = (socket) => {
  socket.on("order:create", createOrder);
  socket.on("order:read", readOrder);

  socket.on("user:update-password", updatePassword);
}

io.on("connection", onConnection);


// Bundlers(server-side)
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


// Bundlers(client-side)
module.exports = {
  entry: "./index.js",
  output: {
    filename: "bundle.js",
  },
  mode: "production",
  node: false,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"], // ensure compatibility with older browsers
            plugins: ["@babel/plugin-transform-object-assign"], // ensure compatibility with IE 11
          },
        },
      },
      {
        test: /\.js$/,
        loader: "webpack-remove-debug", // remove "debug" package
      },
    ],
  },
};

