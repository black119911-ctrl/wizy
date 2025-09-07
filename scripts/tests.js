const testLinks = document.querySelectorAll("[data-test]")
const testPopup = document.querySelector('.tests__popup')
const testPopupCloseBtn = document.querySelector('.tests__popup-close')
const testPopupOverlay = document.querySelector('.wizy-overlay')
const accordionTitles = document.querySelectorAll('.tests__popup-accordion-item-title')
const completeTestBtn = document.querySelector('#complete-test-btn')
const completeTestPopup = document.querySelector('#complete-test-popup')
const cancelPopupBtn = document.querySelector('#cancel-complete-popup')
const completeTestPopupOverlay = document.querySelector('.complete-test__popup-overlay')
const completeTestDeleteBtn = document.querySelector('#delete-complete-test')

testLinks.forEach(link => {
    link.addEventListener('click', () => {
        testPopup.classList.remove('hidden')
        testPopupOverlay.classList.remove('hidden')
    })
})

testPopupCloseBtn.addEventListener('click', closeTestPopup)

accordionTitles.forEach(header => {
    header.addEventListener('click', e => {

        const currentItem = e.target.closest('.tests__popup-accordion-item')
        const content = currentItem.querySelector('.tests__popup-accordion-item-content')
        const chevron = header.querySelector('.chevron')

        if (!currentItem.classList.contains('active')) {
            currentItem.classList.add('active')
            content.classList.add('active')
            chevron.classList.add('active')
        } else {
            currentItem.classList.remove('active')
            content.classList.remove('active')
            chevron.classList.remove('active')
        }

    })
})


completeTestBtn.addEventListener('click', () => {
    completeTestPopup.classList.add('show')
    completeTestPopupOverlay.classList.remove('hidden')
})

cancelPopupBtn.addEventListener('click', closeCompleteTestPopup)

completeTestDeleteBtn.addEventListener('click', () => {
    closeCompleteTestPopup()
    closeTestPopup()
})

function closeCompleteTestPopup() {
    completeTestPopup.classList.remove('show')
    completeTestPopupOverlay.classList.add('hidden')
}

function closeTestPopup() {
    testPopup.classList.add('hidden')
    testPopupOverlay.classList.add('hidden')
}