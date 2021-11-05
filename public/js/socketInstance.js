
// The Socket Instance
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

