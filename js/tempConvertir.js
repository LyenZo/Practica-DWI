const valorTemp = document.getElementById('valorTemp');
const unidadOrigen = document.getElementById('unidadOrigen');
const unidadDestino = document.getElementById('unidadDestino');
const btnConvertir = document.getElementById('btnConvertir');
const resultadoTemp = document.getElementById('resultadoTemp');

// Habilita el botón solo si los 3 campos están llenos
function verificarCampos() {
  btnConvertir.disabled = !(valorTemp.value.trim() !== '' && unidadOrigen.value !== '' && unidadDestino.value !== '');
}

valorTemp.addEventListener('input', verificarCampos);
unidadOrigen.addEventListener('change', verificarCampos);
unidadDestino.addEventListener('change', verificarCampos);

function aCelsius(valor, unidad) {
  if (unidad === 'C') return valor;
  if (unidad === 'F') return (valor - 32) * 5 / 9;
  if (unidad === 'K') return valor - 273.15;
}

function desdeCelsius(valor, unidad) {
  if (unidad === 'C') return valor;
  if (unidad === 'F') return valor * 9 / 5 + 32;
  if (unidad === 'K') return valor + 273.15;
}

const nombresUnidades = { C: 'Celsius', F: 'Fahrenheit', K: 'Kelvin' };

btnConvertir.addEventListener('click', () => {
  const valor = parseFloat(valorTemp.value);
  const celsius = aCelsius(valor, unidadOrigen.value);
  const convertido = desdeCelsius(celsius, unidadDestino.value);
  resultadoTemp.className = 'result';
  resultadoTemp.textContent = `${valor} ${nombresUnidades[unidadOrigen.value]} equivale a ${convertido.toFixed(2)} ${nombresUnidades[unidadDestino.value]}`;
});