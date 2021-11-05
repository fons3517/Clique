const io = require('socket.io')(httpServer);

io.on('connection', socket => {
  console.log(socket.id);
  socket.on('send-message', (message) => {
    io.emit('receive-message', message) // send message to every single sockets, even sender
    socket.broadcast.emit('receive-message', message); // send message to every socket but sender
    console.log(message);
  });
});