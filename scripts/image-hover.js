const hoveredImages = document.querySelectorAll('.hover-image')

hoveredImages.forEach(image => {
    image.addEventListener('mouseenter', function() {
        let pictureSrc = this.dataset.imgLarge

        let bigImage = document.createElement('img')
        bigImage.src = pictureSrc
        bigImage.classList.add('big-image')
        bigImage.style.position = 'absolute'
        bigImage.style.left = '0px'
        bigImage.style.top = '0px'
        bigImage.style.maxWidth = '150px'
        bigImage.style.height = '195px'
        bigImage.style.objectFit = 'contain'
        bigImage.style.borderRadius = '3px'
        image.append(bigImage)
    })
})

hoveredImages.forEach(image => {
    image.addEventListener('mouseleave', function () {
        image.children[1].remove()
    })
})