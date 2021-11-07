// Server Initialization
// Requiring libraries including socket.io
const { instrument } = require('@socket.io/admin-ui'); //How can we implement this aspect of the application? Ask Peter
const express = require('express');
const app = express();
const https = require('https');
const server = https.createServer(app);
const { Server } = require('https');
const socketio = require('socket.io');
const io = socketio(server);
const sequelize = require('./config/connection');
const path = require('path');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');
require('dotenv').config();
const fs = require('fs');

const PORT = process.env.PORT || 3001;
//setup session
const sess = {
  secret: 'supersecretsessionsecrettext',
  cookie: { maxAge: 180000 },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
//handlebars initialization
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
//use routes
app.use(routes);

// Assigning io to the new Server instance
// const io = new Server(server); // const io = new Server(httpServer, { /* options */ });

// Runs when client connects
io.on('connection', socket => {
  console.log('New Clique Connection...');

  // Welcome current user
  socket.emit('message', 'Welcome to Clique'); // message goes to single client

  // Broadcast when user connects
  socket.broadcast.emit('message', 'A user has joined the chat'); // goes to everyone but the person connecting

  // Runs when client disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat')
  });
});

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
    console.log(n));
});

instrument(io, { auth: false }); // CHANGE TO TRUE WHEN DEPLOYING





app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// https.createServer({
//   key: fs.readFileSync('server.key'),
//   cert: fs.readFileSync('server.cert')
// }, app)
//   .listen(3001, function () {
//     console.log('Example app listening on port 3001! Go to https://localhost:3001/');
//   });

io.on('connection', (socket) => {
  socket.on('chat message', (message) => {
    console.log('chat message');
  });
});

server.listen(3000, () => {
  console.log(`Server is running on ${PORT}`);
});


// EXAMPLE: Only need authentication on userIo instance because we set up middleware for this namespace
const userIo = io.of('/user'); // creating a user namespace and using io.of to get to that namespace
userIo.on('connection', socket => {
  console.log('connected to user namespace with username ' + socket.username);
});
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
};


// sequelize.sync({ force: false }).then(() => {
//   server.listen(PORT, () => console.log(`Now Listening on ${PORT}`));
// });
