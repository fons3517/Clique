document.getElementById('close-button').addEventListener('click', function () {
  document.getElementById('chat-hide').style.visibility = 'hidden';
  document.querySelector('.chat-input').style.visibility = 'hidden';
});

document.getElementById('show-chat').addEventListener('click', function () {
  document.getElementById('chat-hide').style.visibility = 'visible';
  document.querySelector('.chat-input').style.visibility = 'visible';
});
