const inputRangeTicksBottom = document.querySelectorAll('.custom-input-range-ticks-bottom')

inputRangeTicksBottom.forEach(ticks => {
    for (let i = 1; i <= 19; i++) {
        let span = document.createElement('span')
        let spanOffset = i * 16
        span.style.left = spanOffset + 'px'
        ticks.append(span)
    }
})