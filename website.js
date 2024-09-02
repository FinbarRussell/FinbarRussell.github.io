  // handles the dropdown menu
  document.querySelector('.menu-toggle').addEventListener('click', function() {
    const dropdown = document.getElementById('dropdown');
    dropdown.classList.toggle('show');
  });

  // Close the dropdown if clicked outside
  window.onclick = function(event) {
    if (!event.target.matches('.menu-toggle') && !event.target.matches('.menu-toggle *')) {
      const dropdown = document.getElementById('dropdown');
      if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
      }
    }
  }