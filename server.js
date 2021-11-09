const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');
const socketio = require('socket.io');
const http = require('http');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session(sess));

//use routes
app.use(routes);


const users = {};

io.on('connection', socket => {
  console.log('New Socket Connection. ID: ' + socket.id); // logging new connection
  socket.on('new-user', name => {
    users[socket.id] = name;
    socket.broadcast.emit('user-connected', name); // outputting 'user-connected' with name following
  });
  socket.on('chat-message', (message, room) => {
    socket.to(room).emit('recieve-message', { message: message, name: users[socket.id] }); // attatching obj w/ users socket.id and message
  });
  socket.on('join-room', room => {
    socket.join(room); //<============ May want to add authentication/check if user is in group
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id]); // user-disconnected
    delete users[socket.id]; // deleting users name from connection
  });
});

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log(`Now Listening on ${PORT}`));
});


/* Scroll down to stay at bottom of chat box
chatMessages.scrollTop = chatMessages.scrollHeight;
*/

