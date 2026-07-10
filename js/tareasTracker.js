let tareas = [];
let alertaMostrada = false;
const entradaTarea = document.getElementById('entradaTarea');
const listaTareas = document.getElementById('listaTareas');

// Reconstruye la lista visual a partir del arreglo de tareas
function renderizarTareas() {
  listaTareas.innerHTML = '';
  const pendientes = tareas.filter(t => !t.completada);
  const completadas = tareas.filter(t => t.completada);

  [...pendientes, ...completadas].forEach(tarea => {
    const li = document.createElement('li');
    if (tarea.completada) li.classList.add('completada');

    const casilla = document.createElement('input');
    casilla.type = 'checkbox';
    casilla.checked = tarea.completada;
    casilla.addEventListener('change', () => {
      tarea.completada = casilla.checked;
      renderizarTareas();
    });

    const texto = document.createElement('span');
    texto.textContent = tarea.descripcion;

    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'eliminar';
    btnEliminar.textContent = '🗑';
    btnEliminar.addEventListener('click', () => {
      tareas = tareas.filter(t => t !== tarea);
      renderizarTareas();
    });

    li.appendChild(casilla);
    li.appendChild(texto);
    li.appendChild(btnEliminar);
    listaTareas.appendChild(li);
  });

  verificarTareasCompletadas();
}

// Muestra una alerta una sola vez al completar todas las tareas
function verificarTareasCompletadas() {
  const todasCompletadas = tareas.length > 0 && tareas.every(t => t.completada);

  if (todasCompletadas && !alertaMostrada) {
    alertaMostrada = true;
    alert('¡Felicidades! Has completado todas tus tareas 🎉');
  }

  if (!todasCompletadas) {
    alertaMostrada = false;
  }
}

function agregarTarea() {
  const texto = entradaTarea.value.trim();
  if (texto === '') return;
  tareas.push({ descripcion: texto, completada: false });
  entradaTarea.value = '';
  renderizarTareas();
}

entradaTarea.addEventListener('keydown', e => {
  if (e.key === 'Enter') agregarTarea();
});

document.getElementById('btnAgregarTarea').addEventListener('click', agregarTarea);