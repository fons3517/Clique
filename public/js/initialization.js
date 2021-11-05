/* eslint-disable no-unused-vars */
// Initialization

// Requiring libraries including socket.io
const { readFileSync } = require('fs');
const { createServer } = require('https');
const { Server } = require('socket.io');

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



