// Client-side socket script
import { io } from 'socket.io-client';

const socket = io(
  'http://localhost:3001' || 'https://obscure-scrubland-68562.herokuapp.com/'
); // No authentication needed on regular namespace here
const userSocket = io('http://localhost:3001/user', {
  auth: { token: 'Test' },
}); // Authorization required for this specific namespace
userSocket.on('connnect_error', (error) => {
  displayMessage(error);
});


const messageInput = document.getElementById('messages');
const form = document.querySelector('#message-form');

const name = prompt('What is your username?');
displayMessage('You joined');
socket.emit('new-user', name);

socket.on('connect', () => {
  displayMessage(`You connected with id: ${socket.id}`);
  socket.emit('join-room', groupId); // <========================CHANGE TO GROUP ID!!!
});

socket.on('chat-message', (data) => {
  displayMessage(`${data.name}: ${data.message}`);// displaying username with message instead of socket.id
  socket.emit('send-chat-message', message)
});

socket.on('user-connected', (name) => {
  displayMessage(`${name} connected`); // Connecting on client-side
});

socket.on('user-disconnected', (name) => {
  displayMessage(`${name} disconnected`); // Disconnecting on client-side
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  displayMessage(`You: ${message}`)
  if (message === '') {
    return;
  }
  displayMessage(message);
  socket.emit('send message', message);

  messageInput.value = '';
});

function displayMessage(message) {
  const div = document.createElement('div');
  div.textContent = message;
  document.getElementById('message-container').append(div);
}

let count = 0;
setInterval(() => {
  socket.emit('ping', ++count); // socket.volatile.emit would tell socket not to save any incoming messages while disconnected/ otherwise without volatile, save every message to pick up where you left off at logout
}, 1000);
