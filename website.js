  
window.onload = function() {
  openMenu()
}

function openMenu() {
  document.getElementById('menu-bar').addEventListener('click', function(event) {
      const navLinks = document.getElementById('nav-links');
      navLinks.classList.toggle('show');
      
      // Prevent the click event from propagating to the document
      event.stopPropagation();
  });

  // Close the navbar when clicking anywhere outside
  document.addEventListener('click', function(event) {
      const navLinks = document.getElementById('nav-links');
      const menuBar = document.getElementById('menu-bar');
      
      if (!navLinks.contains(event.target) && !menuBar.contains(event.target)) {
          navLinks.classList.remove('show');
      }
  });
}
