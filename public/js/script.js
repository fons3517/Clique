// Client-side script

const joinRoomButton = document.getElementById('joinRoomButton');
const messageInput = document.getElementById('messageInput');
const roomInput = document.getElementById('roomInput');
const form = document.getElementById('form');
module.import { io } 'socket.io-client';

const socket = io('http://localhost:3001')   // No authentication needed on regular namespace here
const userSocket = io('http://localhost:3001/user', {
  auth: { token: 'Test' }    // Authorization required for this specific namespace
});
socket.on('connect', () => {
  displayMessage(`You connected with id: ${socket.id}`)
});

userSocket.on('connnect_error', error => {
  displayMessage(error)
});

socket.on('receive-message', message => {
  displayMessage(message);
});


form.addEventListener('submit', e => {
  e.preventDefault();

  const message = messageInput.value;
  const room = roomInput.value;
  if (message === '') return; {
    displayMessage(message);
    socket.emit('send message', message, room);
  };
  messageInput.value = '';
});

joinRoomButton.addEventListener('click', () => {
  const room = roomInput.value;
  socket.emit('join-room', room, message => {
    displayMessage(message); //the callback must always be the last thing you pass to a .emit
  });
});

function displayMessage(message) {
  const div = document.createElement('div');
  div.textContent = message;
  document.getElementById('message-container').append(div);
};

let count = 0;
setInterval(() => {
  socket.emit('ping', ++count) // socket.volatile.emit would tell socket not to save any incoming messages while disconnected/ otherwise without volatile, save every message to pick up where you left off at logout
}, 1000);

document.addEventListener('keydown', e => {
  if (e.target.matches('input'))
    return;

  if (e.key === 'c') socket.connect()
  if (e.key === 'd') socket.disconnect()

})