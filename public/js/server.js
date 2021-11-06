// eslint-disable-next-line no-undef
const { instrument } = require('@socket.io/admin-ui');
const io = require('socket.io')(http);


// Only on userIo instance because we set up middleware for this namespace
const userIo = io.of('/user'); // creating a user namespace and using io.of to get to that namespace
userIo.on('connection', socket => {
  console.log('connected to user namespace with username ' + socket.username);
});

// Because
userIo.use((socket, next) => {
  if (socket.handshake.auth.token) {
    socket.username = getUserNameFromToken(socket.handshake.auth.token); //get info from token
    next();
  } else {
    next(new Error('Please send Token'));
  }
});


function getUserNameFromToken(token) {
  return token;// here we can access database in order to grab specific info an
}



io.on('connection', socket => {
  console.log(socket.id);
  socket.on('send-message', (message, room) => {
    if (room === '') {
      socket.broadcast.emit('receive-message', message); // send message to every socket but sender
    } else {
      socket.to(room).emit('receive-message', message);
    }
  });
  socket.on('join-room', (room, cb) => {
    socket.join(room); //custom name (room)
    cb(`Joined ${room}`); // passing callback with a message
  });
  socket.on('ping', n =>
    console.log(n))
});

instrument(io, { auth: false }); // CHANGE TO TRUE WHEN DEPLOYING
