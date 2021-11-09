async function newGroupHandler(event) {
  event.preventDefault();

  const name = document.querySelector('input[name="group-title"]').value;
  const desc = document
    .querySelector('textarea[name="group-info"]')
    .value.trim();

  const response = await fetch('/group', {
    method: 'POST',
    body: JSON.stringify({
      name,
      desc,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.new-group-form')
  .addEventListener('submit', newGroupHandler);
