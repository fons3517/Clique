const chatForm = document.getElementById('message-form');
const message = document.getElementById('message-input');
const chatBox = document.querySelector('.chat-box');
const username = sessionStorage.getItem('username');

const socket = io();

//message from server
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  // scroll down
  chatBox.scrollTop = chatBox.scrollHeight;
});

//message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  msg = message.value;

  socket.emit('chatMessage', username, msg);

  message.value = '';
});

//output message to dom
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `
  <div class='guest uk-grid-small uk-flex-bottom uk-flex-left' uk-grid>
    <div class='uk-width-auto'>
      <div class='uk-card uk-card-body uk-card-small uk-card-secondary uk-border-rounded'>
        <p class='uk-margin-remove'>
          <span class='etc'>${message.text}</span>
        </p>
      </div>
    </div>
  </div>
<div>
  <p class='uk-text-italic uk-text-left'>${message.username} | ${message.time} </p>
</div>`;

  document.getElementById('message-container').appendChild(div);
}
