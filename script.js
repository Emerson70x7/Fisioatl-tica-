
function navigate(section) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(section).classList.add('active');
  document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
  const activeMenuItem = Array.from(document.querySelectorAll('.menu-item')).find(item => item.textContent.toLowerCase() === section);
  if (activeMenuItem) activeMenuItem.classList.add('active');
}
function login(event) {
  event.preventDefault();
  alert('Login futuro configurado! (Funcionalidade em desenvolvimento)');
}
window.onload = function() {
  setTimeout(() => {
    document.getElementById('splash').style.display = 'none';
    document.querySelector('.app-container').style.display = 'flex';
  }, 1500);
}
