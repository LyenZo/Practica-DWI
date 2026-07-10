const tempValue = document.getElementById('tempValue');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const convertBtn = document.getElementById('convertBtn');
const tempResult = document.getElementById('tempResult');

function checkTempFields() {
  convertBtn.disabled = !(tempValue.value.trim() !== '' && fromUnit.value !== '' && toUnit.value !== '');
}

tempValue.addEventListener('input', checkTempFields);
fromUnit.addEventListener('change', checkTempFields);
toUnit.addEventListener('change', checkTempFields);

function toCelsius(value, unit) {
  if (unit === 'C') return value;
  if (unit === 'F') return (value - 32) * 5 / 9;
  if (unit === 'K') return value - 273.15;
}

function fromCelsius(value, unit) {
  if (unit === 'C') return value;
  if (unit === 'F') return value * 9 / 5 + 32;
  if (unit === 'K') return value + 273.15;
}

const unitNames = { C: 'Celsius', F: 'Fahrenheit', K: 'Kelvin' };

convertBtn.addEventListener('click', () => {
  const value = parseFloat(tempValue.value);
  const celsius = toCelsius(value, fromUnit.value);
  const converted = fromCelsius(celsius, toUnit.value);
  tempResult.className = 'result';
  tempResult.textContent = `${value} ${unitNames[fromUnit.value]} equivale a ${converted.toFixed(2)} ${unitNames[toUnit.value]}`;
});