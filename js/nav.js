// Alterna entre secciones según el botón del menú
const botonesNav = document.querySelectorAll('.nav-btn');
const secciones = document.querySelectorAll('.section');

botonesNav.forEach(boton => {
  boton.addEventListener('click', () => {
    botonesNav.forEach(b => b.classList.remove('active'));
    secciones.forEach(s => s.classList.remove('active'));
    boton.classList.add('active');
    document.getElementById(boton.dataset.destino).classList.add('active');
  });
});