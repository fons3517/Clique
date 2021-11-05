/* eslint-disable no-unused-vars */


// Server Initialization

// Requiring libraries including socket.io
const { readFileSync } = require('fs');
const { createServer } = require('https');
const { Server } = require('socket.io'); // Server is a model class

// Create Server
const httpServer = createServer({
  key: readFileSync('/path/to/my/key.pem'),
  cert: readFileSync('/path/to/my/cert.pem')
});
// Assigning io to the new Server instance
const io = new Server(httpServer, { /* options */ });

// This event is fired upon a new connection. The first arg is a Socket instance.
io.on('connection', (socket) => {
  // ...
});

httpServer.listen(3000);



// Client Initialization
//<script src="/socket.io/socket.io.js"></script>

const { io } = require("socket.io-client");
const socket = io();