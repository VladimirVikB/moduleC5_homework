
const pageInput = document.querySelector('#page-input');
const limitInput = document.querySelector('#limit-input');
const requestBtn = document.querySelector('#request-btn');
const errorMessage = document.querySelector('#error-message');
const photosDiv = document.querySelector('#photos-div');

// Получаем значения из localStorage
let currentPage = localStorage.getItem('currentPage') || 1;
let currentLimit = localStorage.getItem('currentLimit') || 10;

// Устанавливаем  значения из localStorage в input'ы
pageInput.value = currentPage;
limitInput.value = currentLimit;

// Добавляем обработчик события на кнопку "Запрос"
requestBtn.addEventListener('click', async () => {
  const page = parseInt(pageInput.value);
  const limit = parseInt(limitInput.value);

  // Проверяем, что значения в диапазоне от 1 до 10
  if (isNaN(page) || page < 1 || page > 10) {
    errorMessage.textContent = 'Номер страницы вне диапазона от 1 до 10';
    return;
  }

  if (isNaN(limit) || limit < 1 || limit > 10) {
    errorMessage.textContent = 'Лимит вне диапазона от 1 до 10';
    return;
  }

// Сохраняем значения в localStorage
  currentPage = page;
  currentLimit = limit;
  localStorage.setItem('currentPage', currentPage);
  localStorage.setItem('currentLimit', currentLimit);

  // Очищаем сообщение об ошибке
  errorMessage.textContent = '';

  try {
    const response = await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=${currentLimit}`);
    const data = await response.json();

// Очищаем контейнер с фотографиями
    photosDiv.innerHTML = '';

      // Создаем элементы для каждой фотографии и добавляем их в контейнер
    data.forEach(photo => {
      const photoElement = document.createElement('div');
      photoElement.classList.add('photo');
      photoElement.innerHTML = `<img src="${photo.download_url}" alt="${photo.author}">`;
      photosDiv.appendChild(photoElement);
    });
  } catch (error) {
    console.error(error);
  }
});