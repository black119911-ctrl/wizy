const cabinetForm = document.querySelector('#cabinet-form')

cabinetForm.addEventListener('submit', async e => {
    e.preventDefault()

    const cabinetName = cabinetForm.querySelector('#cabinet-name').value.trim()
    const wbToken = cabinetForm.querySelector('#wb-token').value.trim()
    const cabinetToken = getCookie('authToken')
    const endpoint = `${requestUrl}CreateCabinet`

    const params = new URLSearchParams({
        token: cabinetToken,
        name: cabinetName,
        tokenWB: wbToken,
    }).toString()

    const response = await fetch(`${endpoint}?${params}`, {method: 'GET'})
    const data = await response.json();

    
    if (data.result) {
        getCabinets()
    }

})


async function getCabinets() {
    const cabinetsList = document.querySelector('.cabinet__list-items')
    const cabinetsAdded = document.querySelector('#cabinets-added span')

    // cabinetsList.innerHTML = ''

    const endpoint = `${requestUrl}Cabinets`
    const cabinetToken = getCookie('authToken')

    const params = new URLSearchParams({
        token: cabinetToken,
    }).toString()

    const response = await fetch(`${endpoint}?${params}`, {method: 'GET'})
    const cabinets = await response.json()


    if (cabinets.names.length === 0) {
        return
    }

    let cabinetsQty = cabinets.names.length

    cabinetsAdded.textContent = `${cabinetsQty} / ${cabinetsQty}`

    for (let index = 0; index < cabinets.names.length; index++) {

        let cabinetListItem = document.createElement('div')
        cabinetListItem.classList.add('cabinet__list-item')
        cabinetListItem.classList.add('good')

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

}
getCabinets()