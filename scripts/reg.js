// document.addEventListener('DOMContentLoaded', async () => {
//     const loadingScreen = document.getElementById('loading-screen');
//     const regForm = document.querySelector('#reg-form')

//     // Показываем загрузочный экран
//     regForm.style.display = 'none'
//     loadingScreen.style.display = 'flex';

//     const token = getCookie('authToken');
//     const expiresDate = getCookieExpiration('authToken')


//     console.log(expiresDate);

//     if (token) {
//         try {
//             // const response = await fetch('/server/auth.php', {
//             const response = await fetch('/server/auth.php', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded'
//                 },
//                 body: `authToken=${encodeURIComponent(token)}`,
//             });

//             const result = await response.json();


//             if (result.valid) {
//                 // Токен валиден, скрываем загрузочный экран и переходим на дашборд
//                 loadingScreen.style.display = 'none';
//                 window.location.href = '/dashboard.html';
//             } else {
//                 // Токен невалиден, очищаем состояние авторизации и показываем форму
//                 // clearAuthState();

//                 // deleteCookie('authToken')


//                 loadingScreen.style.display = 'none';
//                 regForm.style.display = 'flex'
//             }
//         } catch (err) {
//             console.error(err);
//             // clearAuthState();

//             // deleteCookie('authToken')

//             loadingScreen.style.display = 'none';
//             regForm.style.display = 'flex'
//         }
//     } else {
//         // Токен отсутствует, прячем загрузочный экран и показываем форму авторизации
//         loadingScreen.style.display = 'none';
//         regForm.style.display = 'flex'
//     }
// });



function getCookie(name) {
    const matches = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return matches ? decodeURIComponent(matches[2]) : undefined;
}



// Функция для получения expiresDate из определенной cookie
function getCookieExpiration(cookieName) {
    // Регулярное выражение для выбора конкретной куки
    const regex = new RegExp(`${cookieName}=([^;]+)`);
    const matches = document.cookie.match(regex);


    if (matches && matches[1]) {
        // Полностью считываем cookie
        const fullCookieValue = matches[1];


        // Ищем Expires=
        const expiresMatch = fullCookieValue.match(/Expires=(.*)/i);

        if (expiresMatch && expiresMatch[1]) {
            const expiresDate = new Date(expiresMatch[1]);
            return expiresDate;
        }
    }

    return null;
}




document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#registrationForm');

    // const requestUrl = '/server/register.php'

    // const requestUrl = 'https://fkk2jrbf-7259.euw.devtunnels.ms/api/TestUsers/Registration'
    const requestUrl = 'https://3dwrgcmx-7259.euw.devtunnels.ms/api/TestUsers/Registration'

    // Добавляем обработчик события submit
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Остановить стандартную отправку формы и перезагрузку страницы

        // Получаем введенные данные
        const name = document.querySelector('#name').value
        const mail = document.querySelector('#mail').value
        const telephone = document.querySelector('#telephone').value
        const password = document.querySelector('#password').value

        // Создаем URL-параметры для GET-запроса
        const searchParams = new URLSearchParams({
            name: name,
            mail: mail,
            telephone: telephone,
            password: password
        }).toString()


        try {
            // Выполняем GET-запрос с параметрами
            const response = await fetch(`${requestUrl}?${searchParams}`, {
                method: 'GET',
            });


            if (!response.ok) throw new Error(`Ошибка сети: ${response.status}`);

            // Парсим JSON ответ
            const data = await response.json();

            

            if (data.result && data.token.isValid) {
                // Токен успешно получен, пишем его в cookie

                writeCookie(data.token.key, data.token.expirationDate);

                // Переходим на страницу личного кабинета или любую другую защищённую страницу
                window.location.href = '/cabinet.html';
            } else {
                alert("Ошибка регистрации.");
            }
        } catch (error) {
            console.error('Ошибка:', error.message);
            alert("Что-то пошло не так. Попробуйте снова позже.");
        }
    });

    /**
     * Функция для записи токена в cookie
     */
    function writeCookie(tokenKey, expirationDate) {
        const dateObj = new Date(expirationDate);
        const expiresStr = dateObj.toUTCString(); // Преобразуем дату в нужный формат
        
        // Записываем cookie с параметрами безопасности
        // document.cookie = `authToken=${tokenKey}; Expires=${expiresStr}; Path=/; HttpOnly; Secure; SameSite=Lax`;
        document.cookie = `authToken=${tokenKey}; Expires=${expiresStr} Secure;`;
    }

});


function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}



// Предположим, что expiresDateCookie хранится в формате Unix timestamp (секунды или миллисекунды),
// например, cookie.expires=1704067200 (это эквивалентно 1 января 2024 г., 00:00:00 GMT)

// const isCookieExpired = (expiresTimestampInSecondsOrMillis) => {
//     // Конвертируем expiresTimestamp в миллисекунды, если оно указано в секундах
//     const expiresMs = Number.isInteger(expiresTimestampInSecondsOrMillis / 1000) ? expiresTimestampInSecondsOrMillis * 1000 : expiresTimestampInSecondsOrMillis;

//     // Текущие дата и время
//     const now = new Date().getTime(); // Время в миллисекундах

//     // Проверяем, истекло ли время
//     return now >= expiresMs;
// }

// // Пример использования:
// let expiresTimestamp = 1704067200; // Эквивалентно началу 2024 года
// if (isCookieExpired(expiresTimestamp)) {
//     console.log('Куки просрочены.');
// } else {
//     console.log('Куки активны.');
// }