// Переменные интерфейса
const cabinetForm = document.querySelector('#cabinet-form');
const modalCabinetDelete = document.querySelector('#modal-cabinet-delete');
const modalCabinetEdit = document.querySelector('#modal-cabinet-edit');
const deleteCabinetBtn = document.querySelector('#delete-cabinet');
const cancelButtons = document.querySelectorAll('.cabinet__control-decline'); // Найдем все кнопки отмены
const cabinetsList = document.querySelector('.cabinet__list-items');
const cabinetsAddedCount = document.querySelector('#cabinets-added span');

// Токен аутентификации (предположительно берется откуда-то еще)
// const cabinetToken = getCookie('authToken');

// Главная точка входа программы
(async () => {
    try {
        const cabinets = await loadCabinets();
        renderCabinets(cabinets);
        
        // Регистрация обработчиков событий
        cabinetForm.addEventListener('submit', onSubmitForm);
        deleteCabinetBtn.addEventListener('click', onDeleteButtonClick);
        cabinetsList.addEventListener('click', onCabinetAction);
        
        // Присваиваем обработчики всем кнопкам "Отменить"
        cancelButtons.forEach(button => {
            button.addEventListener('click', closeActiveModal);
        });
    } catch (err) {
        console.error('Ошибка загрузки кабинетов:', err.message);
    }
})();

// Рендеринг списка кабинетов
function renderCabinets(cabinets) {
    cabinetsList.innerHTML = '';

    if (!Array.isArray(cabinets.names)) {
        cabinetsAddedCount.textContent = '';
        return;
    }

    const count = cabinets.names.length;
    cabinetsAddedCount.textContent = `${count}/${count}`;

    cabinets.names.forEach((name, i) => {
        const timeLeft = cabinets.timeLefts[i];
        const listItem = createCabinetListItem(name, timeLeft);
        cabinetsList.append(listItem);
    });
}

// Создание отдельного элемента кабинета
function createCabinetListItem(name, daysRemaining) {
    const listItem = document.createElement('div');
    listItem.classList.add('cabinet__list-item', 'good');

    const title = document.createElement('div');
    title.classList.add('cabinet__list-title');
    title.textContent = name;

    const counter = document.createElement('div');
    counter.classList.add('cabinet__list-counter');
    counter.append(createCounterSpan(daysRemaining));

    const buttons = document.createElement('div');
    buttons.classList.add('cabinet__list-btns');
    buttons.append(...[
        createDeleteButton(),
        createRefreshButton(),
        createEditButton()
    ]);

    listItem.append(title, counter, buttons);
    return listItem;
}

// Генерация отдельных элементов UI
function createCounterSpan(text) {
    const span = document.createElement('span');
    span.textContent = text + ' дней';
    return span;
}

function createDeleteButton() {
    const button = document.createElement('span');
    button.classList.add('cabinet__list-delete');
    button.setAttribute('data-modal', 'modal-cabinet-delete');
    button.textContent = 'Удалить';
    return button;
}

function createRefreshButton() {
    const button = document.createElement('span');
    button.classList.add('cabinet__list-refresh');
    button.textContent = 'Обновить';
    return button;
}

function createEditButton() {
    const button = document.createElement('span');
    button.classList.add('cabinet__list-edit');
    button.setAttribute('data-modal', 'modal-cabinet-edit');
    button.textContent = 'Редактировать';
    return button;
}

// Основные обработчики событий
function onSubmitForm(e) {
    e.preventDefault();
    createNewCabinet();
}

function onDeleteButtonClick(e) {
    e.preventDefault();
    const cabinetName = deleteCabinetBtn.getAttribute('data-target');
    removeCabinet(cabinetName);
    hideModal(modalCabinetDelete);
}

function onCabinetAction(e) {
    const target = e.target;
    if (target.classList.contains('cabinet__list-delete')) {
        const parentItem = target.closest('.cabinet__list-item');
        const cabinetName = parentItem.querySelector('.cabinet__list-title').textContent;
        showModal(modalCabinetDelete, cabinetName);
    }
}

// Закрытие активного модального окна
function closeActiveModal() {
    const activeModals = document.querySelectorAll('.active');
    activeModals.forEach(modal => {
        hideModal(modal);
    });
}

// Управление состоянием модальных окон
function showModal(element, cabinetName) {
    element.classList.add('active');
    document.body.classList.add('shadow-overlay');
    deleteCabinetBtn.setAttribute('data-target', cabinetName);
}

function hideModal(element) {
    element.classList.remove('active');
    document.body.classList.remove('shadow-overlay');
    deleteCabinetBtn.setAttribute('data-target', '');
}

// AJAX-запросы
async function loadCabinets() {
    const endpoint = `${requestUrl}Cabinets`;
    const params = new URLSearchParams({token: cabinetToken}).toString();
    const response = await fetch(`${endpoint}?${params}`);
    const result = await response.json();
    return result;
}

async function createNewCabinet() {
    const formValues = {
        name: cabinetForm.querySelector('#cabinet-name').value.trim(),
        wbToken: cabinetForm.querySelector('#wb-token').value.trim()
    };

    const endpoint = `${requestUrl}CreateCabinet`;
    const params = new URLSearchParams({
        token: cabinetToken,
        name: formValues.name,
        tokenWB: formValues.wbToken
    }).toString();

    const response = await fetch(`${endpoint}?${params}`, { method: 'GET' });
    const result = await response.json();

    if (result.result) {
        const updatedCabinets = await loadCabinets();
        renderCabinets(updatedCabinets);
    } else {
        alert('Ошибка при создании кабинета.');
    }
}

async function removeCabinet(name) {
    const endpoint = `${requestUrl}RemoveCabinet`;
    const params = new URLSearchParams({
        name: name,
        token: cabinetToken
    }).toString();

    const response = await fetch(`${endpoint}?${params}`, { method: 'GET' });
    const result = await response.json();

    if (result.result) {
        const updatedCabinets = await loadCabinets();
        renderCabinets(updatedCabinets);
    }
}