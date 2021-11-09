async function viewGroupHandler(event) {
  event.preventDefault();

  document.location.replace('/dashboard/group');
}

document
  .querySelector('#groups-button')
  .addEventListener('click', viewGroupHandler);
