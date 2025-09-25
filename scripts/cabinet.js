const cabinetForm = document.querySelector('#cabinet-form')
const modalCabinetDelete = document.querySelector('#modal-cabinet-delete')
const modalCabinetEdit = document.querySelector('#modal-cabinet-edit')
const deleteCabinetBtn = document.querySelector('#delete-cabinet')
const cabinetControlDeclineBtn = document.querySelectorAll('.cabinet__control-decline')


cabinetForm.addEventListener('submit', e => {
    e.preventDefault()
    createCabinet()
})

deleteCabinetBtn.addEventListener('click', function (e) {
    e.preventDefault()
    let cabinetGuid = this.dataset.target
    removeCabinet(cabinetGuid)
    hideCabinetsRemovePopup()
})

cabinetControlDeclineBtn.forEach(btn => {
    btn.addEventListener('click', hideCabinetsRemovePopup)
})


async function init() {
    const cabinets = await getCabinetsData()    
    renderCabinetsList(cabinets)
}
init()


async function removeCabinet(guid) {
    const endPointUrl = `${requestUrl}RemoveCabinet`;

    const headers = new Headers();
    headers.append('Authorization', cabinetToken);
    
    const params = new URLSearchParams({ guid });

    try {
        const response = await fetch(`${endPointUrl}?${params.toString()}`, {
            method: 'GET',
            headers: headers,
        });
        
        const data = await response.json();
        
        if (data.result) {
            const cabinets = await getCabinetsData()
            saveCabinetsLocalStorage(cabinets)
            
            let selectedGuidStorage = getSelectedCabinetState()

            if (selectedGuidStorage == guid) {
                let lastCabinetsGuid = cabinets.tokens[cabinets.tokens.length - 1]
                saveSelectedCabinetState(lastCabinetsGuid)
            }

            renderCabinetsList(cabinets);
            renderCabinetsDropdown(cabinets);
        }
    } catch (err) {
        console.error("Ошибка удаления кабинета:", err.message);
    }
}



async function createCabinet() {
    const cabinetName = cabinetForm.querySelector('#cabinet-name').value.trim();
    const wbToken = cabinetForm.querySelector('#wb-token').value.trim();
    const endPointUrl = `${requestUrl}CreateCabinet`;

    const headers = new Headers({
        Authorization: `${cabinetToken}`
    });

    const params = new URLSearchParams({
        name: cabinetName,
        tokenWB: wbToken,
    }).toString();

    try {
        const response = await fetch(`${endPointUrl}?${params}`, {
            method: 'GET',
            headers: headers,
        });

        const data = await response.json();

        if (data.result) {
            const cabinets = await getCabinetsData(); // Предположительно асинхронная функция
            saveCabinetsLocalStorage(cabinets)

            let lastIndex = cabinets.tokens.length - 1
            let guid = cabinets.tokens[lastIndex]

            saveSelectedCabinetState(guid)

            renderCabinetsList(cabinets);
            renderCabinetsDropdown(cabinets);
        } else {
            alert('Возникла ошибка');
        }
    } catch (err) {
        console.error(err); // Обработка ошибок сети или JSON парсинга
        alert('Ошибка соединения');
    }
}

function initCabinets() {
    const cabinetsList = document.querySelector('.cabinet__list-items')

    cabinetsList.addEventListener('click', e => {
        let target = e.target

        if (target.classList.contains('cabinet__list-delete')) {
            let parentItem = target.closest('.cabinet__list-item')
            let cabinetGuid = parentItem.dataset.guid

            showCabinetsRemovePopup(cabinetGuid)

        } else if (target.classList.contains('cabinet__list-edit')) { }

    })

}

function renderCabinetsList(cabinets) {

    const cabinetsList = document.querySelector('.cabinet__list-items')
    const cabinetsAdded = document.querySelector('#cabinets-added span')
    cabinetsList.innerHTML = ''

    if (cabinets.names.length === 0) {
        cabinetsAdded.textContent = ''
        return
    }

    let cabinetsQty = cabinets.names.length
    cabinetsAdded.textContent = `${cabinetsQty} / ${cabinetsQty}`


    for (let index = 0; index < cabinets.names.length; index++) {

        let cabinetListItem = document.createElement('div')
        cabinetListItem.classList.add('cabinet__list-item')
        cabinetListItem.classList.add('good')
        cabinetListItem.setAttribute('data-guid', cabinets.tokens[index])

        let cabinetListTitle = document.createElement('div')
        cabinetListTitle.classList.add('cabinet__list-title')
        cabinetListTitle.textContent = cabinets.names[index]

        let cabinetListCounter = document.createElement('div')
        cabinetListCounter.classList.add('cabinet__list-counter')

        let cabinetListCounterSpan = document.createElement('span')
        cabinetListCounterSpan.textContent = cabinets.timeLefts[index] + ' дней'

        cabinetListItem.append(cabinetListTitle)
        cabinetListCounter.append(cabinetListCounterSpan)
        cabinetListItem.append(cabinetListCounter)

        let cabinetListBtns = document.createElement('div')
        cabinetListBtns.classList.add('cabinet__list-btns')

        let cabinetListDelete = document.createElement('span')
        cabinetListDelete.classList.add('cabinet__list-delete')
        cabinetListDelete.setAttribute('data-modal', 'modal-cabinet-delete')
        cabinetListDelete.textContent = 'Удалить'
        cabinetListBtns.append(cabinetListDelete)

        let cabinetListRefresh = document.createElement('span')
        cabinetListRefresh.classList.add('cabinet__list-refresh')
        // cabinetListRefresh.setAttribute('data-modal', 'modal-cabinet-delete')
        cabinetListRefresh.textContent = 'Обновить'
        cabinetListBtns.append(cabinetListRefresh)

        let cabinetListEdit = document.createElement('span')
        cabinetListEdit.classList.add('cabinet__list-edit')
        cabinetListEdit.setAttribute('data-modal', 'modal-cabinet-edit')
        cabinetListEdit.textContent = 'Редактировать'
        cabinetListBtns.append(cabinetListEdit)

        cabinetListItem.append(cabinetListBtns)
        cabinetsList.append(cabinetListItem)
    }

    initCabinets()
}

function showCabinetsRemovePopup(cabinetGuid) {
    deleteCabinetBtn.setAttribute('data-target', cabinetGuid)
    modalCabinetDelete.classList.add('active')
    document.body.classList.add('shadow-overlay')
}

function hideCabinetsRemovePopup() {
    deleteCabinetBtn.setAttribute('data-target', '')
    modalCabinetDelete.classList.remove('active')
    document.body.classList.remove('shadow-overlay')
}