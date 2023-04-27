//Чтобы выглядело красиво нужно подключить стили.

// скрипт срабатывает раньше чем DOM загружен
document.addEventListener('DOMContentLoaded', function() {
    function getImages(limit, callback, onError) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `https://picsum.photos/v2/list?limit=${limit}`);

        xhr.onload = function () {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.response);
                callback(data);
            } else {
                onError('Ошибка загрузки изображений');
            }
        };
        xhr.onerror = function () {
            onError('Ошибка сети');
        };
        xhr.send();
    }

    const input = document.querySelector('input');
    const btn = document.querySelector('button');
    const resultNode = document.getElementById('result-request');

    function showResult(data) {
        let html = '';
        data.forEach(function (item) {
            html += `
              <div class="card">
                <img src="${item.download_url}" alt="${item.author}" height="200px">
                <p>${item.author}</p>
              </div>
            `;
        });
        resultNode.innerHTML = html;
    }

    function onError(message) {
        resultNode.innerHTML = message;
    }

    btn.addEventListener('click', function () {
        const limit = input.value;
        if (limit < 1 || limit > 10) {
            onError('Число вне диапазона от 1 до 10');
        } else {
            getImages(limit, showResult, onError);
        }
    });
});

