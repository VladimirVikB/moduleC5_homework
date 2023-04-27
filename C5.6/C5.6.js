
const input1 = document.querySelector('#input1');
const input2 = document.querySelector('#input2');
const button = document.querySelector('#button');
const clearButton = document.querySelector('#clearButton');
const result = document.querySelector('#result');

// Проверка на вхождение в диапазон
function checkInput(num) {
  return num >= 100 && num <= 300;
}

//Запрос
async function handleClick() {

  const num1 = Number(input1.value);
  const num2 = Number(input2.value);

  if (isNaN(num1) || isNaN(num2) || !checkInput(num1) || !checkInput(num2)) {
    result.innerHTML = 'Одно из чисел вне диапазона от 100 до 300';
  } else {
    const url = `https://picsum.photos/${num1}/${num2}`;
    try {
      const response = await fetch(url);
      const img = document.createElement('img');
      img.src = response.url;
      result.appendChild(img);
    } catch (error) {
      console.log(error);
    }
  }
}
// Очистка формы
function clearForm() {
  input1.value = '';
  input2.value = '';
  result.innerHTML = '';
}

button.addEventListener('click', handleClick);
clearButton.addEventListener('click', clearForm);