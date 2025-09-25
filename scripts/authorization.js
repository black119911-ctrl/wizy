const authForm = document.getElementById('loginForm')

authForm.addEventListener('submit', async e => {
    e.preventDefault(); // Отменяем перезагрузку страницы

    const email = document.getElementById('emailInput').value.trim();
    const password = document.getElementById('passwordInput').value.trim();

    if (!email || !password) {
        alert('Необходимо заполнить оба поля.');
        return;
    }

    const endPointUrl = requestUrl + 'Authorization'

    const params = new URLSearchParams({
        login: email,
        password: password
    }).toString();

    try {
        const response = await fetch(`${endPointUrl}?${params}`, {method: 'GET'})
        // if (!response.ok) throw new Error('Ошибка сети')
        // console.log(response);

        const data = await response.json();
    
        if (data.result && data.token.isValid) {
            writeCookie(data.token.key, data.token.expirationDate);
            window.location.href = '/cabinet.html';
        } else {
            alert("Логин или пароль неверны!");
        }

    } catch (error) {
        console.log(error);
    }

});







// document.addEventListener('DOMContentLoaded', async () => {
//     const loadingScreen = document.getElementById('loading-screen');
//     const authForm = document.querySelector('#auth-form')

//     // Показываем загрузочный экран
//     authForm.style.display = 'none'
//     loadingScreen.style.display = 'flex';

//     const token = getCookie('authToken');

//     if (token) {


//         const params = new URLSearchParams({
//             email: email,
//             password: password
//         }).toString();


//         try {
//             // const response = await fetch('/server/auth.php', {
//             const response = await fetch(`https://gnzcfxqx-7259.euw.devtunnels.ms/api/TestUsers/Authorization?${params}`, {
//             // const response = await fetch(`/server/test.php?${params}`, {
//                 method: 'GET'
//             });


//             const result = await response.json();
//             console.log(data);


//             // return;


//             if (result.valid) {
//                 // Токен валиден, скрываем загрузочный экран и переходим на дашборд
//                 loadingScreen.style.display = 'none';
//                 window.location.href = '/dashboard.html';
//             } else {
//                 // Токен невалиден, очищаем состояние авторизации и показываем форму
//                 // clearAuthState();

//                 deleteCookie('authToken')


//                 loadingScreen.style.display = 'none';
//                 authForm.style.display = 'flex'
//             }
//         } catch (err) {
//             console.error(err);
//             // clearAuthState();

//             deleteCookie('authToken')

//             loadingScreen.style.display = 'none';
//             authForm.style.display = 'flex'
//         }
//     } else {
//         // Токен отсутствует, прячем загрузочный экран и показываем форму авторизации
//         loadingScreen.style.display = 'none';
//         authForm.style.display = 'flex'
//     }
// });


/*

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}


function getCookie(name) {
    const matches = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return matches ? decodeURIComponent(matches[2]) : undefined;
}

function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        sameSite: 'strict',
        secure: true,
        expires: new Date(Date.now() + 3600 * 1000),
        ...options
    };

    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    Object.entries(options).forEach(([key, value]) => {
        updatedCookie += '; ' + key;
        if (value !== true) {
            updatedCookie += '=' + value;
        }
    });

    document.cookie = updatedCookie;
}

function removeCookie(name) {
    setCookie(name, '', { expires: '-1 day' });
}

function clearAuthState() {
    removeCookie('authToken');
}

*/