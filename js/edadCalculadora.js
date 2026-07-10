const selectDia = document.getElementById('dia');
const selectMes = document.getElementById('mes');
const selectAnio = document.getElementById('anio');
const nombresMeses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

// Genera opciones de día, mes y año
for (let d = 1; d <= 31; d++) {
  const opcion = document.createElement('option');
  opcion.value = d;
  opcion.textContent = d;
  selectDia.appendChild(opcion);
}

nombresMeses.forEach((nombreMes, indice) => {
  const opcion = document.createElement('option');
  opcion.value = indice + 1;
  opcion.textContent = nombreMes;
  selectMes.appendChild(opcion);
});

const anioActual = new Date().getFullYear();
for (let a = anioActual; a >= anioActual - 120; a--) {
  const opcion = document.createElement('option');
  opcion.value = a;
  opcion.textContent = a;
  selectAnio.appendChild(opcion);
}

document.getElementById('btnCalcularEdad').addEventListener('click', () => {
  const dia = parseInt(selectDia.value);
  const mes = parseInt(selectMes.value);
  const anio = parseInt(selectAnio.value);
  const divResultado = document.getElementById('resultadoEdad');
  const diasEnElMes = new Date(anio, mes, 0).getDate();

  if (dia > diasEnElMes) {
    divResultado.className = 'result error';
    divResultado.textContent = 'Fecha inválida para el mes seleccionado';
    return;
  }

  const fechaNacimiento = new Date(anio, mes - 1, dia);
  const hoy = new Date();

  if (fechaNacimiento > hoy) {
    divResultado.className = 'result error';
    divResultado.textContent = 'La fecha no puede ser futura';
    return;
  }

  let anios = hoy.getFullYear() - fechaNacimiento.getFullYear();
  let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
  if (hoy.getDate() < fechaNacimiento.getDate()) diferenciaMeses--;
  if (diferenciaMeses < 0) { anios--; diferenciaMeses += 12; }

  divResultado.className = 'result';
  divResultado.innerHTML = `Tienes <strong>${anios} años y ${diferenciaMeses} meses</strong>`;
});