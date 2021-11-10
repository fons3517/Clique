const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');
const io = require('socket.io')(5346);
const http = require('http');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

//setup session
const oneDay = 1000 * 60 * 60 * 24;
const sess = {
  secret: 'supersecretsessionsecrettext',
  cookie: { maxAge: oneDay },
  resave: false,
  saveUninitialized: false,
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

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log(`Now Listening on ${PORT}`));
});

const formatMessage = require('./utils/messages');
const cliqueBot = 'cliqueBot';

io.on('connection', (socket) => {
  console.log('NEW CONNECTION');

  socket.emit('message', formatMessage(cliqueBot, 'Welcome!'));

  //broadcast when user connects
  socket.broadcast.emit(
    'message',
    formatMessage(cliqueBot, 'A user has joined the chat!')
  );

  // chat message listen
  socket.on('chatMessage', (username, msg) => {
    io.emit('message', formatMessage(username, msg));
  });

  //client disconnect
  socket.on('disconnect', () => {
    io.emit('message', formatMessage(cliqueBot, 'A user has disconnected'));
  });
});
