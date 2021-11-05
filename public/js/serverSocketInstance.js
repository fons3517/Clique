/* eslint-disable no-unused-vars */

// The Socket Instance (server-side)
// Socket#id
// Each new connection is assigned a random 20-characters id, which is then synced with the value on the client-side.

// server-side
io.on('connection', (socket) => {
  console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
});

// client-side
socket.on('connect', () => {
  console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
});

socket.on('disconnect', () => {
  console.log(socket.id); // undefined
});

// Socket#connected
// This attribute describes whether the socket is currrently connected to the server.
socket.on('connect', () => {
  console.log(socket.connected); // true
});

socket.on('disconnect', () => {
  console.log(socket.connected); // false
});



// Upon creation, the Socket joins the room identified by its own id, which means you can use it for private messaging:
io.on('connection', socket => {
  socket.on('private message', (anotherSocketId, msg) => {
    socket.to(anotherSocketId).emit('private message', socket.id, msg);
  });
});
// Note: you can't overwrite this identifier, as it is used in several parts of the Socket.IO codebase.



// Socket#handshake
// This object contains some details about the handshake that happens at the beginning of the Socket.IO session.

// {
//   headers: /* the headers of the initial request */
//   query: /* the query params of the initial request */
//   auth: /* the authentication payload */
//   time: /* the date of creation (as string) */
//   issued: /* the date of creation (unix timestamp) */
//   url: /* the request URL string */
//   address: /* the ip of the client */
//   xdomain: /* whether the connection is cross-domain */
//   secure: /* whether the connection is secure */
// }

// Example
// {
//   "headers": {
//     "user-agent": "xxxx",
//       "accept": "*/*",
//         "host": "example.com",
//           "connection": "close"
//   },
//   "query": {
//     "EIO": "4",
//       "transport": "polling",
//         "t": "NNjNltH"
//   },
//   "auth": {
//     "token": "123"
//   },
//   "time": "Sun Nov 22 2020 01:33:46 GMT+0100 (Central European Standard Time)",
//     "issued": 1606005226969,
//       "url": "/socket.io/?EIO=4&transport=polling&t=NNjNltH",
//         "address": "::ffff:1.2.3.4",
//           "xdomain": false,
//             "secure": true
// }

// Socket#rooms#
// This is a reference to the rooms the Socket is currently in.

io.on('connection', (socket) => {
  console.log(socket.rooms); // Set { <socket.id> }
  socket.join('room1');
  console.log(socket.rooms); // Set { <socket.id>, "room1" }
});



// Socket#data
// An arbitrary obj that can be used in conjunction with the fetchSockets() utility method
// server A
io.on('connection', (socket) => {
  socket.data.username = 'alice';
});

// server B
const sockets = io.fetchSockets();
console.log(sockets[0].data.username); // "alice"


// Socket middlewares
//Those middlewares looks a lot like the usual middlewares, except that they are called for each incoming packet:
// eslint-disable-next-line no-unused-vars
socket.use(([event, ...args], next) => {
  // do something with the packet (logging, authorization, rate limiting...)
  // do not forget to call next() at the end
  next();
});



//disconnect
// This event is fired by the Socket instance upon disconnection.
io.on('connection', (socket) => {
  socket.on('disconnect', (reason) => {
    // ...
  });
});


// disconnecting
// this event is similar to disconnect but is fired a bit earlier, when the Socket#rooms set is not empty yet
io.on('connection', (socket) => {
  socket.on('disconnecting', (reason) => {
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        socket.to(room).emit('user has left', socket.id);
      }
    }
  });
});