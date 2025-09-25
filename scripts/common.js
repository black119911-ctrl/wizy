// const requestUrl = 'https://ckk04414-7259.euw.devtunnels.ms/api/TestUsers/'
// const requestUrl = 'https://3dwrgcmx-7259.euw.devtunnels.ms/api/TestUsers/'
// const requestUrl = 'https://nkcq9k82-7259.euw.devtunnels.ms/api/TestUsers/'
// const requestUrl = 'https://t74gqp3x-7259.euw.devtunnels.ms/api/TestUsers/'
// const requestUrl = 'https://hkm93x42-7259.euw.devtunnels.ms/api/TestUsers/'
// const requestUrl = 'https://q1tks8nd-7259.euw.devtunnels.ms/api/TestUsers/'
const requestUrl = 'https://glgtl6cg-7259.euw.devtunnels.ms/api/TestUsers/'
// const requestUrl = 'https://glgtl6cg-7259.euw.devtunnels.ms/api/TestUsers/'
const cabinetToken = getCookie('authToken');

function writeCookie(tokenKey, expirationDate) {
    const dateObj = new Date(expirationDate)
    const expiresStr = dateObj.toUTCString()
    // document.cookie = `authToken=${tokenKey}; Expires=${expiresStr}; Path=/; HttpOnly; Secure; SameSite=Lax`;
    document.cookie = `authToken=${tokenKey}; Expires=${expiresStr} Secure;`;
}

function getCookie(name) {
    const matches = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return matches ? decodeURIComponent(matches[2]) : undefined;
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}


const selectedCabinetName = document.querySelector('.content__head-link strong')
const cabinetsDropdownList = document.querySelector('#cabinets-dropdown-list ul')



function saveCabinetsLocalStorage(cabinets) {
    let jsonCabinets = JSON.stringify(cabinets)
    localStorage.setItem('wizycabinets', jsonCabinets)
}


function getLocalStorageCabinets() {
    let stringCabinets = localStorage.getItem('wizycabinets')
    return JSON.parse(stringCabinets)
}


function saveSelectedCabinetState(guid) {
    localStorage.setItem('wizySelectedGuid', guid)
}


function getSelectedCabinetState() {
    return localStorage.getItem('wizySelectedGuid')
}




function renderCabinetsDropdown(cabinets) {

    cabinetsDropdownList.innerHTML = ''

    if (cabinets.names.length > 0) {

        // let lastCabinetName = cabinets.names[cabinets.names.length - 1]
        // selectedCabinetName.textContent = lastCabinetName

        let selectedGuid = getSelectedCabinetState()


        for (let index = 0; index < cabinets.names.length; index++) {
            let li = document.createElement('li')
            let a = document.createElement('a')
            a.href = '#'
            a.textContent = cabinets.names[index]
            a.setAttribute('data-guid', cabinets.tokens[index])
            li.append(a)
            cabinetsDropdownList.append(li)

            if (selectedGuid == a.dataset.guid) {
                selectedCabinetName.textContent = cabinets.names[index]
            }
        }

    } else {
        selectedCabinetName.textContent = 'Не выбран'
    }

    initCabinetsDropdown(cabinets)

}


function initCabinetsDropdown(cabinets) {
    const cabinetsDropdownListItems = document.querySelectorAll('#cabinets-dropdown-list ul li a')

    cabinetsDropdownListItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault()

            let selectedGuid = this.dataset.guid
            saveSelectedCabinetState(selectedGuid)


            for (let index = 0; index < cabinets.names.length; index++) {
                if (selectedGuid == cabinets.tokens[index]) {
                    selectedCabinetName.textContent = cabinets.names[index]
                }
            }


            closeCabinetsDropdown()

            let unitTable = document.querySelector('.table__body')

            if (unitTable) {
                getUnit()
            }

        })
    })

}


function closeCabinetsDropdown() {
    let parentBlock = cabinetsDropdownList.closest('.content__head-block')
    parentBlock.classList.remove('active')
    cabinetsDropdownList.parentElement.classList.remove('open')
}


async function selectCabinet(name) {
    const endPointUrl = `${requestUrl}SelectCabinet`
    const params = new URLSearchParams({
        name: name,
        token: cabinetToken
    }).toString()

    const response = await fetch(`${endPointUrl}?${params}`, { method: 'GET' })
    const data = await response.json()

    if (data.result) {
        selectedCabinetName.textContent = name

        const cabinets = await getCabinetsData()
        renderCabinetsDropdown(cabinets)

    } else {
        alert('Возникла ошибка')
    }
}




async function getCabinetsData() {
    const endPointUrl = `${requestUrl}Cabinets`;
    // Создаем объект headers и добавляем туда токен

    const headers = new Headers();
    headers.append('Authorization', cabinetToken);

    const response = await fetch(endPointUrl, {
        method: 'GET',
        headers: headers,   // Передаем заголовки здесь
    });

    const cabinets = await response.json();
    return cabinets;
}


async function main() {
    const cabinets = await getCabinetsData()
    saveCabinetsLocalStorage(cabinets)
    renderCabinetsDropdown(cabinets)
}
main()




async function getUnit() {


    /*

    const endPointUrl = `${requestUrl}CabinetUnits`
    const cabinetToken = getCookie('authToken')
    const storageGuid = getSelectedCabinetState()

    const headers = new Headers({
        Authorization: `${cabinetToken}`
    });

    const params = new URLSearchParams({
        guid: storageGuid
    }).toString()

    const response = await fetch(`${endPointUrl}?${params}`, {
        method: 'GET',
        headers: headers
    })

    const data = await response.json()

    if (!data) return

    */

    // const unitProducts = data.result


    const unitProducts = [
        {
            consumerPrice: 100,
            logisticPrice: 200,
            storagePrice: 300,
            totalLogisticPrice: 400,
            commissionWB: 500,
            tax: 600,
            storage45Days: 700,
            grossIncome: 800,
            revenue: 900,
            grossProfit: 1000,
            netProfit: 1100,
            roi: 1200,
            ros: 1300,
            spp: 1400,
            markup: 1500,
        },
        {
            consumerPrice: 100,
            logisticPrice: 200,
            storagePrice: 300,
            totalLogisticPrice: 400,
            commissionWB: 500,
            tax: 600,
            storage45Days: 700,
            grossIncome: 800,
            revenue: 900,
            grossProfit: 1000,
            netProfit: 1100,
            roi: 1200,
            ros: 1300,
            spp: 1400,
            markup: 1500,
        },
        {
            consumerPrice: 100,
            logisticPrice: 200,
            storagePrice: 300,
            totalLogisticPrice: 400,
            commissionWB: 500,
            tax: 600,
            storage45Days: 700,
            grossIncome: 800,
            revenue: 900,
            grossProfit: 1000,
            netProfit: 1100,
            roi: 1200,
            ros: 1300,
            spp: 1400,
            markup: 1500,
        },
        {
            consumerPrice: 100,
            logisticPrice: 200,
            storagePrice: 300,
            totalLogisticPrice: 400,
            commissionWB: 500,
            tax: 600,
            storage45Days: 700,
            grossIncome: 800,
            revenue: 900,
            grossProfit: 1000,
            netProfit: 1100,
            roi: 1200,
            ros: 1300,
            spp: 1400,
            markup: 1500,
        },
        {
            consumerPrice: 100,
            logisticPrice: 200,
            storagePrice: 300,
            totalLogisticPrice: 400,
            commissionWB: 500,
            tax: 600,
            storage45Days: 700,
            grossIncome: 800,
            revenue: 900,
            grossProfit: 1000,
            netProfit: 1100,
            roi: 1200,
            ros: 1300,
            spp: 1400,
            markup: 1500,
        },
        {
            consumerPrice: 100,
            logisticPrice: 200,
            storagePrice: 300,
            totalLogisticPrice: 400,
            commissionWB: 500,
            tax: 600,
            storage45Days: 700,
            grossIncome: 800,
            revenue: 900,
            grossProfit: 1000,
            netProfit: 1100,
            roi: 1200,
            ros: 1300,
            spp: 1400,
            markup: 1500,
        },
        {
            consumerPrice: 100,
            logisticPrice: 200,
            storagePrice: 300,
            totalLogisticPrice: 400,
            commissionWB: 500,
            tax: 600,
            storage45Days: 700,
            grossIncome: 800,
            revenue: 900,
            grossProfit: 1000,
            netProfit: 1100,
            roi: 1200,
            ros: 1300,
            spp: 1400,
            markup: 1500,
        },
        {
            consumerPrice: 100,
            logisticPrice: 200,
            storagePrice: 300,
            totalLogisticPrice: 400,
            commissionWB: 500,
            tax: 600,
            storage45Days: 700,
            grossIncome: 800,
            revenue: 900,
            grossProfit: 1000,
            netProfit: 1100,
            roi: 1200,
            ros: 1300,
            spp: 1400,
            markup: 1500,
        },
        {
            consumerPrice: 100,
            logisticPrice: 200,
            storagePrice: 300,
            totalLogisticPrice: 400,
            commissionWB: 500,
            tax: 600,
            storage45Days: 700,
            grossIncome: 800,
            revenue: 900,
            grossProfit: 1000,
            netProfit: 1100,
            roi: 1200,
            ros: 1300,
            spp: 1400,
            markup: 1500,
        },
        {
            consumerPrice: 100,
            logisticPrice: 200,
            storagePrice: 300,
            totalLogisticPrice: 400,
            commissionWB: 500,
            tax: 600,
            storage45Days: 700,
            grossIncome: 800,
            revenue: 900,
            grossProfit: 1000,
            netProfit: 1100,
            roi: 1200,
            ros: 1300,
            spp: 1400,
            markup: 1500,
        },
        {
            consumerPrice: 100,
            logisticPrice: 200,
            storagePrice: 300,
            totalLogisticPrice: 400,
            commissionWB: 500,
            tax: 600,
            storage45Days: 700,
            grossIncome: 800,
            revenue: 900,
            grossProfit: 1000,
            netProfit: 1100,
            roi: 1200,
            ros: 1300,
            spp: 1400,
            markup: 1500,
        },
        {
            consumerPrice: 100,
            logisticPrice: 200,
            storagePrice: 300,
            totalLogisticPrice: 400,
            commissionWB: 500,
            tax: 600,
            storage45Days: 700,
            grossIncome: 800,
            revenue: 900,
            grossProfit: 1000,
            netProfit: 1100,
            roi: 1200,
            ros: 1300,
            spp: 1400,
            markup: 1500,
        },
        {
            consumerPrice: 100,
            logisticPrice: 200,
            storagePrice: 300,
            totalLogisticPrice: 400,
            commissionWB: 500,
            tax: 600,
            storage45Days: 700,
            grossIncome: 800,
            revenue: 900,
            grossProfit: 1000,
            netProfit: 1100,
            roi: 1200,
            ros: 1300,
            spp: 1400,
            markup: 1500,
        },
        {
            consumerPrice: 100,
            logisticPrice: 200,
            storagePrice: 300,
            totalLogisticPrice: 400,
            commissionWB: 500,
            tax: 600,
            storage45Days: 700,
            grossIncome: 800,
            revenue: 900,
            grossProfit: 1000,
            netProfit: 1100,
            roi: 1200,
            ros: 1300,
            spp: 1400,
            markup: 1500,
        },
        {
            consumerPrice: 100,
            logisticPrice: 200,
            storagePrice: 300,
            totalLogisticPrice: 400,
            commissionWB: 500,
            tax: 600,
            storage45Days: 700,
            grossIncome: 800,
            revenue: 900,
            grossProfit: 1000,
            netProfit: 1100,
            roi: 1200,
            ros: 1300,
            spp: 1400,
            markup: 1500,
        },
    ]

    document.querySelector('.table__body').innerHTML = ''

    unitProducts.forEach(product => {

        let row = `	<div class="table__row">
                        <div class="table__cell table__image" style="width: 60px;">
                            <span><img src="images/product-thumb.png" alt=""></span>
                            <i><img src="images/product.png" alt=""></i>
                        </div>
                        <div class="table__cell table__article hover" style="width: 100px;"><a href="#" class="table__cell-link">${product.consumerPrice}</a></div>
                        <div class="table__cell table__text"><span>${product.logisticPrice}</span></div>
                        <div class="table__cell table__text"><span>${product.storagePrice}</span></div>
                        <div class="table__cell table__text"><span>${product.totalLogisticPrice}</span></div>
                        <div class="table__cell table__text"><span>${product.commissionWB}</span></div>
                        <div class="table__cell table__text"><span>${product.tax}</span></div>
                        <div class="table__cell table__text"><span>${product.storage45Days}</span></div>
                        <div class="table__cell table__text"><span>${product.grossIncome}</span></div>
                        <div class="table__cell table__text"><span>${product.revenue}</span></div>
                        <div class="table__cell table__text"><span>${product.grossProfit}</span></div>
                        <div class="table__cell table__text"><span>${product.netProfit}</span></div>
                        <div class="table__cell table__text"><span>${product.roi}</span></div>
                        <div class="table__cell table__text good"><span>${product.ros}</span></div>
                        <div class="table__cell table__text bad"><span>${product.spp}</span></div>
                        <div class="table__cell table__text"><span>${product.markup}</span></div>
                    </div>`

        document.querySelector('.table__body').innerHTML += row

    });

    // updateStickyOffsets()
    // tableStickyCells()
}


// table__cell table__text sticky-cell sticky-shadow-left