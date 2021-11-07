/* eslint-disable no-unused-vars */




// Setup through
const express = require('express');
const https = require('https');
const app = express();

// Initialization from documentation
const { readFileSync } = require('fs');
const { createServer } = require('https');
const { Server } = require('socket.io'); // Server is a model class


app.get('/', function (req, res) {
  res.send('hello world');
});

// Create Server
https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
  .listen(3000, function () {
    console.log('Example app listening on port 3001! Go to https://localhost:3001/')
  });




// This event is fired upon a new connection. The first arg is a Socket instance.
io.on('connection', (socket) => {
  // ...
});

httpServer.listen(3001);
