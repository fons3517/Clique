
// The Server Instance
// Server#engine
// A reference to the underlying Engine.IO server.
// It can be used to fetch the number of currently connected clients:
const count = io.engine.clientsCount;
// may or may not be similar to the count of Socket instances in the main namespace, depending on your usage
const count2 = io.of("/").sockets.size;

// Or to generate a custom session ID(the sid query parameter):

const uuid = require('uuid');

io.engine.generateId = (req) => {
  return uuid.v4(); // must be unique across all Socket.IO servers
};



// fetchSockets(): returns the matching socket instances
// return all Socket instances
const sockets = await io.fetchSockets();

// return all Socket instances in the "room1" room of the main namespace
const sockets = await io.in("room1").fetchSockets();

// return all Socket instances in the "room1" room of the "admin" namespace
const sockets = await io.of("/admin").in("room1").fetchSockets();

// this also works with a single socket ID
const sockets = await io.in(theSocketId).fetchSockets();



// socketsJoin(): makes the matching socket instances join the specified rooms
// make all Socket instances join the "room1" room
io.socketsJoin('room1');

// make all Socket instances in the "room1" room join the "room2" and "room3" rooms
io.in('room1').socketsJoin(['room2', 'room3']);

// make all Socket instances in the "room1" room of the "admin" namespace join the "room2" room
io.of('/admin').in('room1').socketsJoin('room2');

// this also works with a single socket ID
io.in(theSocketId).socketsJoin('room1');



// ̀socketsLeave(): makes the matching socket instances leave the specified rooms
// make all Socket instances leave the "room1" room
io.socketsLeave('room1');

// make all Socket instances in the "room1" room leave the "room2" and "room3" rooms
io.in('room1').socketsLeave(['room2', 'room3']);

// make all Socket instances in the "room1" room of the "admin" namespace leave the "room2" room
io.of('/admin').in('room1').socketsLeave('room2');

// this also works with a single socket ID
io.in(theSocketId).socketsLeave('room1');



// disconnectSockets(): makes the matching socket instances disconnect
// make all Socket instances disconnect
io.disconnectSockets();

// make all Socket instances in the "room1" room disconnect (and discard the low-level connection)
io.in('room1').disconnectSockets(true);

// make all Socket instances in the "room1" room of the "admin" namespace disconnect
io.of('/admin').in('room1').disconnectSockets();

// this also works with a single socket ID
io.of('/admin').in(theSocketId).disconnectSockets();

// The 'sockets' variable is an array of objects exposing a subset of the usual Socket class:
for (const socket of sockets) {
  console.log(socket.id);
  console.log(socket.handshake);
  console.log(socket.rooms);
  console.log(socket.data); // this attribute is an arbitrary obj that can be used to share information between Socket.IO servers:

  // server A
  io.on("connection", (socket) => {
    socket.data.username = "alice";
  });
  // server B
  const sockets = await io.fetchSockets();
  console.log(sockets[0].data.username); // "alice"

  socket.emit(/* ... */);
  socket.join(/* ... */);
  socket.leave(/* ... */);
  socket.disconnect(/* ... */);
}



// serverSideEmit(): allows to emit events to the other Socket.IO servers of the cluster, in a multi-verse setup
//Syntax
io.serverSideEmit("hello", "world");

// Add on the receiving side:
io.on("hello", (arg1) => {
  console.log(arg1); // prints "world"
});

//Acknowledgements are supported too:
// server A
io.serverSideEmit("ping", (err, responses) => {
  console.log(responses[0]); // prints "pong"
});

// server B
io.on("ping", (cb) => {
  cb("pong");
});

// Notes:
// the 'connection', 'connect' and 'new_namespace' strings are reserved and cannot be used in your application.
// you can send any number of arguments, but binary structures are currently not supported(the array of arguments will be JSON.stringify - ed)
