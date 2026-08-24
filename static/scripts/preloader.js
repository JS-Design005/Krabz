window.addEventListener('load', function() {
  const loader = document.getElementById('loader-wrapper');
  
  // Wait exactly 300 milliseconds after everything downloads ensuring the user has a smooth experience
  setTimeout(function() {
    loader.classList.add('loader-hidden');
  }, 300); 
});

// Safety Fallback: Hide loader after 3 seconds no matter what
setTimeout(function() {
  const loader = document.getElementById('loader-wrapper');
  if (!loader.classList.contains('loader-hidden')) {
    loader.classList.add('loader-hidden');
  }
}, 3000);
