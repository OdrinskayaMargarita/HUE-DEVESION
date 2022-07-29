export default () => {
    let openBasketMenu = document.querySelectorAll('.open-basketMenu');
    let basketMenu = document.getElementById('basket-menu');
    let closeBasketMenu = document.getElementById('basket-menu--close');

    openBasketMenu.forEach((openBasketMenuItem) => {
        openBasketMenuItem.addEventListener('click', (e) => {
            e.preventDefault()
            basketMenu.classList.add('basket-menu--open')
        })
    })

    closeBasketMenu.addEventListener('click', () => {
        basketMenu.classList.remove('basket-menu--open')
    })



    window.addEventListener('click', e => {
        const target = e.target;
        if (!target.closest('#basket-menu') && !target.closest('.open-basketMenu') && !target.classList.contains('basket__list--item-delete')) {
            basketMenu.classList.remove('basket-menu--open')
        }
    })
}
