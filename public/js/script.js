const joinRoomButton = document.getElementById();
const messageInput = document.getElementById();
const roomInput = document.getElementById();
const form = document.getElementById();
module.import { io } 'socket.io-client';

const socket = io('https://obscure-scrubland-68562.herokuapp.com/')
socket.on('connect', () => {
  displayMessage(`You connected with id: ${socket.id}`)
  socket.on('receive-message', message => {
    displayMessage(message);
  });
});


form.addEventListener('submit', e => {
  e.preventDefault();

  const message = messageInput.value;
  const room = roomInput.value;
  if (message === '') {
    return displayMessage(message);
    socket.emit('send-message', message);
  }
  messageInput.value = '';
});

joinRoomButton.addEventListener('click', () => {
  const room = roomInput.value;
});

function displayMessage(message) {
  const div = document.createElement('div');
  div.textContent = message;
  document.getElementById('message-container').append(div);
}