const sidebar = document.querySelector('.sidebar')
const sidebarBtn = document.querySelector('.sidebar__btn')
const marginalGoods = document.querySelector('#marginal-goods')
const marginalParentFull = document.querySelector('#marginal-parent-full')
const marginalParentAdaptive = document.querySelector('#marginal-parent-adaptive')
const dashboardContentLeft = document.querySelector('.dashboard__content-left')
const dashboardContentRight = document.querySelector('.dashboard__content-right')
const dashboardContentLeftBottomItems = document.querySelectorAll('.dashboard__content-left__bottom-item')
const marginalGoodsTopTitle = document.querySelector('.marginal-goods__top-title')
const dashboardContentLeftBottomWrap = document.querySelector('.dashboard__content-left__bottom-wrap')
const marginalGoodsTopSubtitle = document.querySelector('.marginal-goods__top-subtitle')
const marginalGoodsTop = document.querySelector('.marginal-goods__top')
const marginalGoodsContentFirstInfoTitle = document.querySelector('.marginal-goods__content-first-info-title')
const marginalGoodsContentFirstInfoArticle = document.querySelector('.marginal-goods__content-first-info-article')
const marginalGoodsContentFirstInfoPrice = document.querySelector('.marginal-goods__content-first-info-price')
const marginalGoodsContentFirstImage = document.querySelector('.marginal-goods__content-first-image')
const marginalGoodsContentFirst = document.querySelector('.marginal-goods__content-first')
const marginalGoodsContentListItemPhoto = document.querySelectorAll('.marginal-goods__content-list-item-photo')
const marginalGoodsContentListItemTitle = document.querySelectorAll('.marginal-goods__content-list-item-title')
const marginalGoodsContentListItemPrice = document.querySelectorAll('.marginal-goods__content-list-item-price')
const myChart = document.querySelector('#myChart')


sidebarBtn.addEventListener('click', () => {
    // sidebar.removeEventListener('transitionend', replaceElements)
    sidebar.addEventListener('transitionend', replaceElements)
})

function replaceElements() {
    if (!sidebar.classList.contains('collapsed')) {
        addApadtive()
    } else if (sidebar.classList.contains('collapsed') && window.innerWidth >= 1860) {
        removeAdaptive()
    } else if (sidebar.classList.contains('collapsed') && window.innerWidth < 1860) {
        addApadtive()
    }
}
replaceElements()

window.addEventListener('resize', replaceElements)

function addApadtive() {
    marginalParentAdaptive.append(marginalGoods)
    marginalParentAdaptive.classList.remove('adaptive')
    dashboardContentLeft.classList.add('adaptive')
    dashboardContentRight.classList.add('adaptive')
    dashboardContentLeftBottomItems.forEach(elem => elem.classList.add('adaptive'))
    marginalGoods.classList.add('adaptive')
    marginalGoodsTopTitle.classList.add('adaptive')
    dashboardContentLeftBottomWrap.classList.remove('adaptive')
    marginalGoodsTop.classList.add('adaptive')
    marginalGoodsContentFirstInfoTitle.classList.add('adaptive')
    marginalGoodsContentFirstInfoArticle.classList.add('adaptive')
    marginalGoodsContentFirstInfoPrice.classList.add('adaptive')
    marginalGoodsContentFirstImage.classList.add('adaptive')
    marginalGoodsContentFirst.classList.add('adaptive')
    marginalGoodsContentListItemPhoto.forEach(elem => elem.classList.add('adaptive'))
    marginalGoodsContentListItemTitle.forEach(elem => elem.classList.add('adaptive'))
    marginalGoodsContentListItemPrice.forEach(elem => elem.classList.add('adaptive'))
    myChart.style.width = '100%'
}


function removeAdaptive() {
    marginalParentFull.append(marginalGoods)
    marginalParentAdaptive.classList.add('adaptive')
    dashboardContentLeft.classList.remove('adaptive')
    dashboardContentRight.classList.remove('adaptive')
    dashboardContentLeftBottomItems.forEach(elem => elem.classList.remove('adaptive'))
    marginalGoods.classList.remove('adaptive')
    marginalGoodsTopTitle.classList.remove('adaptive')
    dashboardContentLeftBottomWrap.classList.add('adaptive')
    marginalGoodsTop.classList.remove('adaptive')
    marginalGoodsContentFirstInfoTitle.classList.remove('adaptive')
    marginalGoodsContentFirstInfoArticle.classList.remove('adaptive')
    marginalGoodsContentFirstInfoPrice.classList.remove('adaptive')
    marginalGoodsContentFirstImage.classList.remove('adaptive')
    marginalGoodsContentFirst.classList.remove('adaptive')
    marginalGoodsContentListItemPhoto.forEach(elem => elem.classList.remove('adaptive'))
    marginalGoodsContentListItemTitle.forEach(elem => elem.classList.remove('adaptive'))
    marginalGoodsContentListItemPrice.forEach(elem => elem.classList.remove('adaptive'))
    myChart.style.width = '100%'
}




// function replaceElements() {
//     const collapsed = sidebar.classList.contains('collapsed');
//     const wideScreen = window.innerWidth >= 1860;

//     if (!collapsed) {
//         // Скрываем адаптивность при раскрытом сайдбаре
//         moveToMarginalParentAdaptive()
//         removeAllAdapts()
//     } else if (wideScreen) {
//         // Для больших экранов перемещаем элемент и скрываем адаптивные классы
//         moveToMarginalParentFull()
//         addAllAdapts()
//     } else {
//         // Для малых экранов оставляем адаптацию
//         moveToMarginalParentAdaptive()
//         addAllAdapts()
//     }
// }

// // Вспомогательные функции для уменьшения дублированного кода
// function moveToMarginalParentAdaptive() {
//     marginalParentAdaptive.append(marginalGoods)
//     marginalParentAdaptive.classList.remove('adaptive')
//     dashboardContentLeftBottomWrap.classList.remove('adaptive')
// }

// function moveToMarginalParentFull() {
//     marginalParentFull.append(marginalGoods)
//     marginalParentAdaptive.classList.add('adaptive')
//     dashboardContentLeftBottomWrap.classList.add('adaptive')
// }

// function addAllAdapts() {
//     dashboardContentLeft.classList.add('adaptive')
//     dashboardContentRight.classList.add('adaptive')
//     dashboardContentLeftBottomItems.forEach(elem => elem.classList.add('adaptive'))
//     marginalGoods.classList.add('adaptive')
//     marginalGoodsTopTitle.classList.add('adaptive')
// }

// function removeAllAdapts() {
//     dashboardContentLeft.classList.remove('adaptive')
//     dashboardContentRight.classList.remove('adaptive')
//     dashboardContentLeftBottomItems.forEach(elem => elem.classList.remove('adaptive'))
//     marginalGoods.classList.remove('adaptive')
//     marginalGoodsTopTitle.classList.remove('adaptive')
// }

/*

const elementsWithAdaptiveClass = [
    '.dashboard__content-left',
    '.dashboard__content-right',
    '#marginal-goods',
    '.marginal-goods__top-title',
    '.marginal-goods__top',
    '.marginal-goods__content-first-info-title'
];

elementsWithAdaptiveClass.forEach(selector => {
    const el = document.querySelector(selector);
    el.classList.add('adaptive');
});

*/



const filtersBtn = document.querySelector('#filters-btn')
const dashboardFiltersPopup = document.querySelector('#dashboard-filters-popup')

filtersBtn.addEventListener('click', () => {
    dashboardFiltersPopup.classList.toggle('hidden')
})

window.addEventListener('click', e => {
    if (!dashboardFiltersPopup.contains(e.target) && !filtersBtn.contains(e.target)) {
        dashboardFiltersPopup.classList.add('hidden')
    }
})



const datesPopupBtn = document.querySelector('.dashboard__head-top-options__dates')
const datesPopup = document.querySelector('.dashboard-dates__popup')

datesPopupBtn.addEventListener('click', () => {
    datesPopup.classList.toggle('hidden')
})

window.addEventListener('click', e => {

    if (!datesPopup.contains(e.target) && !datesPopupBtn.contains(e.target)) {
        datesPopup.classList.add('hidden')
    }

    
})



const filtersOptions = {
    items: [
        {
            name: 'Трусы',
            isSelected: false
        },
        {
            name: 'Пижамы',
            isSelected: false
        },
        {
            name: 'Футболки',
            isSelected: false
        },
    ]
}


// const filtersOptions = [
//     ['Трусы', 'Пижамы', 'Штаны', 'Футболки', 'Свитшоты', 'Куртки', 'Носки', 'Шорты'],
//     ['Adidas', 'Nike', 'Reebok', 'New Balance'],
//     ['candels_t_l', 'dress_short_l', 'shoes_short_l']
// ]

const filtersPopupTabs = document.querySelector('.dashboard-filters__popup-top__tabs')
const filtersPopupTabsItems = document.querySelectorAll('.dashboard-filters__popup-top__tabs-item')
const filtersOptionsListsContainer = document.querySelector('.dashboard-filters__popup-top__options-inner')


function renderFilterOptionsList() {
    filtersOptions.forEach(list => {

        let divList = document.createElement('div')
        divList.classList.add('dashboard-filters__popup-top__options-list')

        list.forEach(item => {
            let divItem = document.createElement('div')
            divItem.classList.add('dashboard-filters__popup-top__options-list-item')
            let divCheckbox = document.createElement('div')
        })

    })
}

/*
<div class="dashboard-filters__popup-top__options-list-item">
    <div class="checkbox">
        <label>
            <input type="checkbox">
            <span><i><i data-svg="images/svg/check.svg"></i></i></span>
        </label>
        <span>Трусы</span>
    </div>
</div>

*/


filtersPopupTabsItems.forEach((tab, tabIndex) => {
    tab.addEventListener('click', function () {
        filtersPopupTabsItems.forEach(tab => tab.classList.remove('active'))
        this.classList.add('active')
    })
})