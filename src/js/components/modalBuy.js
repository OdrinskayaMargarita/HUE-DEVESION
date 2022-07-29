export default () => {
    let catalogButtonBuy = document.querySelectorAll(".js-buy-btn")
    let catalogModal = document.getElementById("catalog-modal")
    let catalogModalClose = document.getElementById("catalog-modal--close")
    let backgroundBlack = document.getElementById("background-black")

    catalogButtonBuy.forEach((catalogButtonBuyItem) => {
        catalogButtonBuyItem.addEventListener('click', (e) => {
            e.preventDefault()
            backgroundBlack.classList.add('background-black--open')
            catalogModal.classList.add('catalog__modal--open')
        })
    })

    backgroundBlack?.addEventListener('click', () => {
        backgroundBlack.classList.remove('background-black--open')
        catalogModal.classList.remove('catalog__modal--open')
    })

    catalogModalClose?.addEventListener('click', () => {
        backgroundBlack.classList.remove('background-black--open')
        catalogModal.classList.remove('catalog__modal--open')
    })
}
