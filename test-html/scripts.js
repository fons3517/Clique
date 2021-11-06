window.addEventListener('DOMContentLoaded', (event) => {
  const sidebarToggle = document.body.querySelector('#sidebarToggle');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', (event) => {
      event.preventDefault();
      document.body.classList.toggle('sb-sidenav-toggled');
      localStorage.setItem(
        'sb|sidebar-toggle',
        document.body.classList.contains('sb-sidenav-toggled')
      );
    });
  }
});

$('.chat-input input').keyup(function (e) {
  if ($(this).val() == '') $(this).removeAttr('good');
  else $(this).attr('good', '');
});
