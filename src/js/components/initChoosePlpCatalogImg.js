export default () => {
    let catalogItems = document.querySelectorAll('.catalog__item')

    catalogItems.forEach((catalogItem) => {
        let catalogItemRadio = catalogItem.querySelectorAll('input[type="radio"]')

        catalogItemRadio.forEach((catalogItemRadioOne) => {
            catalogItemRadioOne.addEventListener('click', () => {
                let idM = catalogItemRadioOne.id
                let catalogOne = catalogItemRadioOne?.closest('.catalog__item--img')
                let catalogOneImgs = catalogOne?.querySelectorAll('.catalog__item--img-one')
                let catalogOneImgActive = catalogOne?.querySelectorAll('[data-colour = "' + idM + '"]')

                catalogOneImgs.forEach((item) => {
                    item.classList.remove('catalog__item--img-one--active')
                })
                catalogOneImgActive[0]?.classList.add('catalog__item--img-one--active')
            })
        })
    })

}
