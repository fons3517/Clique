/* eslint-disable quotes */
/* eslint-disable no-use-before-define */
// Registering a middleware#
// A middleware function has access to the Socket instance and to the next registered middleware function.

io.use((socket, next) => {
  if (isValid(socket.request)) {
    next();
  } else {
    next(new Error("invalid"));
  }
});

// You can register several middleware functions, and they will be executed sequentially:
io.use((socket, next) => {
  next();
});

io.use((socket, next) => {
  next(new Error('thou shall not pass'));
});

io.use((socket, next) => {
  // not executed, since the previous middleware has returned an error
  next();
});

