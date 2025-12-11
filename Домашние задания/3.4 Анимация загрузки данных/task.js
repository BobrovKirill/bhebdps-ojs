document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const itemsContainer = document.getElementById('items');
    const refreshBtn = document.getElementById('refresh-btn');
    const timestampEl = document.getElementById('timestamp');
    const errorEl = document.getElementById('error');

    // Ключи для localStorage
    const CACHE_KEY = 'currency_data_cache';
    const CACHE_TIMESTAMP_KEY = 'currency_data_timestamp';
    const CACHE_DURATION = 5 * 60 * 1000; // 5 минут в миллисекундах

    // Показать анимацию загрузки
    function showLoader() {
        loader.classList.add('loader_active');
        errorEl.style.display = 'none';
    }

    // Скрыть анимацию загрузки
    function hideLoader() {
        loader.classList.remove('loader_active');
    }

    // Показать ошибку
    function showError() {
        errorEl.style.display = 'block';
    }

    // Форматирование числа (округление до 4 знаков после запятой)
    function formatValue(value) {
        return Number(value).toFixed(4);
    }

    // Форматирование даты
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('ru-RU');
    }

    // Сохранение данных в кэш
    function saveToCache(data, timestamp) {
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(data));
            localStorage.setItem(CACHE_TIMESTAMP_KEY, timestamp.toString());
        } catch (e) {
            console.error('Ошибка сохранения в localStorage:', e);
        }
    }

    // Получение данных из кэша
    function getFromCache() {
        try {
            const cachedData = localStorage.getItem(CACHE_KEY);
            const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

            if (!cachedData || !cachedTimestamp) {
                return null;
            }

            const now = Date.now();
            const cacheAge = now - parseInt(cachedTimestamp);

            // Проверяем, не устарели ли данные (больше 5 минут)
            if (cacheAge > CACHE_DURATION) {
                return null;
            }

            return {
                data: JSON.parse(cachedData),
                timestamp: parseInt(cachedTimestamp),
                isFresh: cacheAge < 10000 // менее 10 секунд считаем свежими
            };
        } catch (e) {
            console.error('Ошибка чтения из localStorage:', e);
            return null;
        }
    }

    // Отображение данных на странице
    function displayData(data) {
        // Очищаем контейнер
        itemsContainer.innerHTML = '';

        if (!data || !data.response || !data.response.Valute) {
            itemsContainer.innerHTML = '<p>Нет данных о курсах валют</p>';
            return;
        }

        const valutes = data.response.Valute;

        // Создаем элементы для каждой валюты
        for (const key in valutes) {
            const valute = valutes[key];

            // Создаем контейнер для валюты
            const itemEl = document.createElement('div');
            itemEl.className = 'item';

            // Код валюты
            const codeEl = document.createElement('div');
            codeEl.className = 'item__code';
            codeEl.textContent = valute.CharCode;

            // Значение валюты
            const valueEl = document.createElement('div');
            valueEl.className = 'item__value';
            valueEl.textContent = formatValue(valute.Value);

            // Валюта (рубль)
            const currencyEl = document.createElement('div');
            currencyEl.className = 'item__currency';
            currencyEl.textContent = 'руб.';

            // Добавляем элементы в контейнер
            itemEl.appendChild(codeEl);
            itemEl.appendChild(valueEl);
            itemEl.appendChild(currencyEl);

            // Добавляем валюту в основной контейнер
            itemsContainer.appendChild(itemEl);
        }

        // Обновляем время последнего обновления
        if (data.date) {
            timestampEl.textContent = `Данные актуальны на: ${formatDate(data.date)}`;
        }
    }

    // Загрузка данных с сервера
    async function loadDataFromServer() {
        showLoader();

        try {
            const response = await fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Сохраняем данные в кэш
            saveToCache(data, Date.now());

            // Отображаем данные
            displayData(data);
            hideLoader();

            return data;
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);

            // Пытаемся загрузить данные из кэша
            const cached = getFromCache();

            if (cached) {
                displayData(cached.data);
                timestampEl.textContent += ' (данные из кэша)';
                hideLoader();
            } else {
                showError();
                hideLoader();
            }
        }
    }

    // Инициализация при загрузке страницы
    function init() {
        // Проверяем, есть ли свежие данные в кэше
        const cached = getFromCache();

        if (cached && cached.isFresh) {
            // Используем кэшированные данные, если они свежие (< 10 секунд)
            displayData(cached.data);
            timestampEl.textContent += ' (данные из кэша)';

            // Все равно загружаем свежие данные в фоне
            loadDataFromServer();
        } else if (cached) {
            // Показываем старые данные из кэша
            displayData(cached.data);
            timestampEl.textContent += ' (данные из кэша, загрузка актуальных...)';

            // Загружаем свежие данные
            loadDataFromServer();
        } else {
            // Нет данных в кэше, загружаем с сервера
            loadDataFromServer();
        }
    }

    // Обработчик кнопки обновления
    refreshBtn.addEventListener('click', function() {
        loadDataFromServer();
    });

    // Инициализируем приложение
    init();
}); document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const itemsContainer = document.getElementById('items');
    const refreshBtn = document.getElementById('refresh-btn');
    const timestampEl = document.getElementById('timestamp');
    const errorEl = document.getElementById('error');

    // Ключи для localStorage
    const CACHE_KEY = 'currency_data_cache';
    const CACHE_TIMESTAMP_KEY = 'currency_data_timestamp';
    const CACHE_DURATION = 5 * 60 * 1000; // 5 минут в миллисекундах

    // Показать анимацию загрузки
    function showLoader() {
        loader.classList.add('loader_active');
        errorEl.style.display = 'none';
    }

    // Скрыть анимацию загрузки
    function hideLoader() {
        loader.classList.remove('loader_active');
    }

    // Показать ошибку
    function showError() {
        errorEl.style.display = 'block';
    }

    // Форматирование числа (округление до 4 знаков после запятой)
    function formatValue(value) {
        return Number(value).toFixed(4);
    }

    // Форматирование даты
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('ru-RU');
    }

    // Сохранение данных в кэш
    function saveToCache(data, timestamp) {
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(data));
            localStorage.setItem(CACHE_TIMESTAMP_KEY, timestamp.toString());
        } catch (e) {
            console.error('Ошибка сохранения в localStorage:', e);
        }
    }

    // Получение данных из кэша
    function getFromCache() {
        try {
            const cachedData = localStorage.getItem(CACHE_KEY);
            const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

            if (!cachedData || !cachedTimestamp) {
                return null;
            }

            const now = Date.now();
            const cacheAge = now - parseInt(cachedTimestamp);

            // Проверяем, не устарели ли данные (больше 5 минут)
            if (cacheAge > CACHE_DURATION) {
                return null;
            }

            return {
                data: JSON.parse(cachedData),
                timestamp: parseInt(cachedTimestamp),
                isFresh: cacheAge < 10000 // менее 10 секунд считаем свежими
            };
        } catch (e) {
            console.error('Ошибка чтения из localStorage:', e);
            return null;
        }
    }

    // Отображение данных на странице
    function displayData(data) {
        // Очищаем контейнер
        itemsContainer.innerHTML = '';

        if (!data || !data.response || !data.response.Valute) {
            itemsContainer.innerHTML = '<p>Нет данных о курсах валют</p>';
            return;
        }

        const valutes = data.response.Valute;

        // Создаем элементы для каждой валюты
        for (const key in valutes) {
            const valute = valutes[key];

            // Создаем контейнер для валюты
            const itemEl = document.createElement('div');
            itemEl.className = 'item';

            // Код валюты
            const codeEl = document.createElement('div');
            codeEl.className = 'item__code';
            codeEl.textContent = valute.CharCode;

            // Значение валюты
            const valueEl = document.createElement('div');
            valueEl.className = 'item__value';
            valueEl.textContent = formatValue(valute.Value);

            // Валюта (рубль)
            const currencyEl = document.createElement('div');
            currencyEl.className = 'item__currency';
            currencyEl.textContent = 'руб.';

            // Добавляем элементы в контейнер
            itemEl.appendChild(codeEl);
            itemEl.appendChild(valueEl);
            itemEl.appendChild(currencyEl);

            // Добавляем валюту в основной контейнер
            itemsContainer.appendChild(itemEl);
        }

        // Обновляем время последнего обновления
        if (data.date) {
            timestampEl.textContent = `Данные актуальны на: ${formatDate(data.date)}`;
        }
    }

    // Загрузка данных с сервера
    async function loadDataFromServer() {
        showLoader();

        try {
            const response = await fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Сохраняем данные в кэш
            saveToCache(data, Date.now());

            // Отображаем данные
            displayData(data);
            hideLoader();

            return data;
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);

            // Пытаемся загрузить данные из кэша
            const cached = getFromCache();

            if (cached) {
                displayData(cached.data);
                timestampEl.textContent += ' (данные из кэша)';
                hideLoader();
            } else {
                showError();
                hideLoader();
            }
        }
    }

    // Инициализация при загрузке страницы
    function init() {
        // Проверяем, есть ли свежие данные в кэше
        const cached = getFromCache();

        if (cached && cached.isFresh) {
            // Используем кэшированные данные, если они свежие (< 10 секунд)
            displayData(cached.data);
            timestampEl.textContent += ' (данные из кэша)';

            // Все равно загружаем свежие данные в фоне
            loadDataFromServer();
        } else if (cached) {
            // Показываем старые данные из кэша
            displayData(cached.data);
            timestampEl.textContent += ' (данные из кэша, загрузка актуальных...)';

            // Загружаем свежие данные
            loadDataFromServer();
        } else {
            // Нет данных в кэше, загружаем с сервера
            loadDataFromServer();
        }
    }

    // Обработчик кнопки обновления
    refreshBtn.addEventListener('click', function() {
        loadDataFromServer();
    });

    // Инициализируем приложение
    init();
});