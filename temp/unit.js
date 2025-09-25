function getUnitProducts() {

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

    return [
        {
            image: '/images/product-thumb.png',
            article: 777,
            wholesalePrice: 100,
            markup: 200,
            productDiscounts: 300,
            priceBeforeDiscounts: 400,
            BuyersPrice: 500,
            netPrice: 600,
            ktr: 700,
            logisticsBase: 800,
            costOfReturns: 900,
            package: 1000,
            netProfit: 1100,
            roi: 1200,
            ros: 1300
        },
        {
            image: '/images/product-thumb.png',
            article: 777,
            wholesalePrice: 100,
            markup: 200,
            productDiscounts: 300,
            priceBeforeDiscounts: 400,
            BuyersPrice: 500,
            netPrice: 600,
            ktr: 700,
            logisticsBase: 800,
            costOfReturns: 900,
            package: 1000,
            netProfit: 1100,
            roi: 1200,
            ros: 1300
        },
        {
            image: '/images/product-thumb.png',
            article: 777,
            wholesalePrice: 100,
            markup: 200,
            productDiscounts: 300,
            priceBeforeDiscounts: 400,
            BuyersPrice: 500,
            netPrice: 600,
            ktr: 700,
            logisticsBase: 800,
            costOfReturns: 900,
            package: 1000,
            netProfit: 1100,
            roi: 1200,
            ros: 1300
        },
        {
            image: '/images/product-thumb.png',
            article: 777,
            wholesalePrice: 100,
            markup: 200,
            productDiscounts: 300,
            priceBeforeDiscounts: 400,
            BuyersPrice: 500,
            netPrice: 600,
            ktr: 700,
            logisticsBase: 800,
            costOfReturns: 900,
            package: 1000,
            netProfit: 1100,
            roi: 1200,
            ros: 1300
        },
        {
            image: '/images/product-thumb.png',
            article: 777,
            wholesalePrice: 100,
            markup: 200,
            productDiscounts: 300,
            priceBeforeDiscounts: 400,
            BuyersPrice: 500,
            netPrice: 600,
            ktr: 700,
            logisticsBase: 800,
            costOfReturns: 900,
            package: 1000,
            netProfit: 1100,
            roi: 1200,
            ros: 1300
        },
        {
            image: '/images/product-thumb.png',
            article: 777,
            wholesalePrice: 100,
            markup: 200,
            productDiscounts: 300,
            priceBeforeDiscounts: 400,
            BuyersPrice: 500,
            netPrice: 600,
            ktr: 700,
            logisticsBase: 800,
            costOfReturns: 900,
            package: 1000,
            netProfit: 1100,
            roi: 1200,
            ros: 1300
        },
    ]
}



const products = getUnitProducts()


const tableSettings = {
    wholesalePrice: {
        position: 1,
        isSelected: true,
        isFixed: false,
        translate: 'Оптовая<br> цена'
    },
    markup: {
        position: 0,
        isSelected: true,
        isFixed: false,
        translate: 'Наценка'
    },
    productDiscounts: {
        position: 2,
        isSelected: true,
        isFixed: false,
        translate: 'Скидки<br> товара'
    },
    priceBeforeDiscounts: {
        position: 3,
        isSelected: true,
        isFixed: false,
        translate: 'Цена до<br> скидок'
    },
    BuyersPrice: {
        position: 4,
        isSelected: true,
        isFixed: false,
        translate: 'Цена<br> покупателя'
    },
    netPrice: {
        position: 5,
        isSelected: true,
        isFixed: false,
        translate: 'Чистая<br> цена'
    },
    ktr: {
        position: 6,
        isSelected: true,
        isFixed: false,
        translate: 'КТР'
    },
    logisticsBase: {
        position: 7,
        isSelected: true,
        isFixed: false,
        translate: 'Логистика<br> База'
    },
    costOfReturns: {
        position: 8,
        isSelected: true,
        isFixed: true,
        translate: 'Стоимость<br> возвратов'
    },
    package: {
        position: 9,
        isSelected: true,
        isFixed: false,
        translate: 'Упаковка'
    },
    netProfit: {
        position: 10,
        isSelected: false,
        isFixed: false,
        translate: 'Чистая<br> прибыль'
    },
    roi: {
        position: 11,
        isSelected: true,
        isFixed: false,
        translate: 'Roi'
    },
    ros: {
        position: 12,
        isSelected: true,
        isFixed: true,
        translate: 'Ros'
    }
}


// async function main() {
//     const products = await getUnitProducts()
//     // processingProducts()
//     renderTable(products)
// }
// main()


function orderTableSettings(tableSettings) {
    for (let key in tableSettings) {
        if (tableSettings[key].isFixed) {
            tableSettings[key].position += 100
        }
    }

    // Преобразуем объект в массив
    let entries = Object.entries(tableSettings);

    // Сортируем массив по полю position
    entries.sort((a, b) => a[1].position - b[1].position);

    // Создаем новый объект с нужным порядком
    let sortedTableSettings = {};
    for (let entry of entries) {
        let key = entry[0];
        let value = entry[1];
        sortedTableSettings[key] = value;
    }

    return sortedTableSettings
}



function renderTable(products, settings) {
    document.querySelector('.table__head').innerHTML = ''
    document.querySelector('.table__body').innerHTML = ''

    let headRow = `<div class="sticky-column-left sticky-shadow-right">
        <span class="table__head-cell table__image" style="width: 60px;"><b>фото</b></span>
        <span class="table__head-cell table__article" style="width: 100px;"><b>Артикул</b></span>
    </div>`

    for (let key in settings) {
        if (settings[key].isSelected && !settings[key].isFixed) {
            let translate = settings[key].translate
            headRow += `<span class="table__head-cell table__text clickable"><b>${translate} <i class="icon"><i data-svg="/images/svg/sort.svg"></i></i></b></span>`
        }
    }

    headRow += `<div class="sticky-column-right sticky-shadow-left">`

    for (let key in settings) {
        if (settings[key].isSelected && settings[key].isFixed) {
            let translate = settings[key].translate
            headRow += `<span class="table__head-cell table__text clickable"><b>${translate} <i class="icon"><i data-svg="/images/svg/sort.svg"></i></i></b></span>`
        }
    }

    headRow += `</div>`

    document.querySelector('.table__head').innerHTML += headRow


    products.forEach(product => {

        let row = `<div class="table__row">
        <div class="sticky-column-left sticky-shadow-right">
            <div class="table__cell table__image" style="width: 60px;">
                <span><img src="${product.image}" alt=""></span>
                <i><img src="/images/product.png" alt=""></i>
            </div>
            <div class="table__cell table__article hover" style="width: 100px;"><a href="#" class="table__cell-link">${product.article}</a></div>
        </div>`


        for (let key in settings) {
            if (settings[key].isSelected && !settings[key].isFixed) {
                row += `<div class="table__cell table__text"><span>${product[key]}</span></div>`
            }
        }

        row += `<div class="sticky-column-right sticky-shadow-left">`

        for (let key in settings) {
            if (settings[key].isSelected && settings[key].isFixed) {
                row += `<div class="table__cell table__text"><span>${product[key]}</span></div>`
            }
        }

        row += `</div>`

        document.querySelector('.table__body').innerHTML += row

    })
}

let sortedSettings = orderTableSettings(tableSettings)
renderTable(products, sortedSettings)


const tableConstructorBtn = document.querySelector('#table-constructor-btn')
const tableConstructor = document.querySelector('#table-constructor')
const tableConstructorCloseBtn = document.querySelector('#table-constructor__close')
const tableConstructorFields = document.querySelector('.table-constructor__all .table-constructor__fields')


tableConstructorBtn.addEventListener('click', () => {
    tableConstructor.classList.add('open')
})


tableConstructorCloseBtn.addEventListener('click', () => {
    tableConstructor.classList.remove('open')
})



function renderFields(settings) {

    tableConstructorFields.innerHTML = ''

    for (let key in settings) {

        let option = settings[key]
        let checked = option.isSelected ? 'checked' : ''
        let optionName = settings[key].translate
        let optionNameFormatted = optionName.replace(/<\s*br\s*>/gi, '')

        let field = `<div class="table-constructor__field">
                        <div class="checkbox">
                            <label class="table-constructor__field-tigger">
                                <input type="checkbox" ${checked} value="" data-column="${option.position}" class="table-constructor__field-input">
                                <span><i><i data-svg="/images/svg/check.svg"></i></i> <b>${optionNameFormatted}</b></span>
                            </label>
                        </div>
                        <div class="table-constructor__drag"><i data-svg="/images/svg/drag-indicator.svg"></i></div>
                    </div>`

        tableConstructorFields.innerHTML += field
    }

    
    initConstructorFields()

}

renderFields(sortedSettings)



function initConstructorFields() {
    const tableConstructorFields = document.querySelector('.table-constructor__all .table-constructor__fields')
    console.log(tableConstructorFields);
}
