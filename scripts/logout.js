const exitLink = document.querySelectorAll('.content__head-link')[2]
exitLink.addEventListener('click', async function () {
    deleteCookie('authToken')
})

// Функция для удаления куки по имени
function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}