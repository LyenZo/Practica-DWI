const daySelect = document.getElementById('day');
const monthSelect = document.getElementById('month');
const yearSelect = document.getElementById('year');
const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

for (let d = 1; d <= 31; d++) {
  const opt = document.createElement('option');
  opt.value = d;
  opt.textContent = d;
  daySelect.appendChild(opt);
}

months.forEach((m, i) => {
  const opt = document.createElement('option');
  opt.value = i + 1;
  opt.textContent = m;
  monthSelect.appendChild(opt);
});

const currentYear = new Date().getFullYear();
for (let y = currentYear; y >= currentYear - 120; y--) {
  const opt = document.createElement('option');
  opt.value = y;
  opt.textContent = y;
  yearSelect.appendChild(opt);
}

document.getElementById('ageBtn').addEventListener('click', () => {
  const day = parseInt(daySelect.value);
  const month = parseInt(monthSelect.value);
  const year = parseInt(yearSelect.value);
  const resultDiv = document.getElementById('ageResult');
  const daysInMonth = new Date(year, month, 0).getDate();

  if (day > daysInMonth) {
    resultDiv.className = 'result error';
    resultDiv.textContent = 'Fecha inválida para el mes seleccionado';
    return;
  }

  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  if (birthDate > today) {
    resultDiv.className = 'result error';
    resultDiv.textContent = 'La fecha no puede ser futura';
    return;
  }

  let years = today.getFullYear() - birthDate.getFullYear();
  let monthsDiff = today.getMonth() - birthDate.getMonth();
  if (today.getDate() < birthDate.getDate()) monthsDiff--;
  if (monthsDiff < 0) { years--; monthsDiff += 12; }

  resultDiv.className = 'result';
  resultDiv.innerHTML = `Tienes <strong>${years} años y ${monthsDiff} meses</strong>`;
});