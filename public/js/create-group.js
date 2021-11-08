async function createGroupHandler(event) {
  event.preventDefault();

  document.location.replace('/dashboard/create');
}

document
  .querySelector('#create-new-group')
  .addEventListener('click', createGroupHandler);
