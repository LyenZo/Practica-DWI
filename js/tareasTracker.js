let tasks = [];
let alertaMostrada = false;
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function renderTasks() {
  taskList.innerHTML = '';
  const pending = tasks.filter(t => !t.completada);
  const completed = tasks.filter(t => t.completada);

  [...pending, ...completed].forEach(task => {
    const li = document.createElement('li');
    if (task.completada) li.classList.add('completed');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completada;
    checkbox.addEventListener('change', () => {
      task.completada = checkbox.checked;
      renderTasks();
    });

    const span = document.createElement('span');
    span.textContent = task.descripcion;

    const delBtn = document.createElement('button');
    delBtn.className = 'delete';
    delBtn.textContent = '🗑';
    delBtn.addEventListener('click', () => {
      tasks = tasks.filter(t => t !== task);
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });

  verificarTareasCompletadas();
}

function verificarTareasCompletadas() {
  const todasCompletadas = tasks.length > 0 && tasks.every(t => t.completada);

  if (todasCompletadas && !alertaMostrada) {
    alertaMostrada = true;
    alert('¡Felicidades! Has completado todas tus tareas 🎉');
  }

  if (!todasCompletadas) {
    alertaMostrada = false;
  }
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === '') return;
  tasks.push({ descripcion: text, completada: false });
  taskInput.value = '';
  renderTasks();
}

taskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addTask();
});

document.getElementById('addTaskBtn').addEventListener('click', addTask);