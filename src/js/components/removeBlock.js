export default () => {
    let buttonRemove = document.querySelectorAll('.basket__list--item-delete')

    buttonRemove.forEach((buttonRemoveItem) => {
        buttonRemoveItem?.addEventListener('click', () => {
            buttonRemoveItem.closest('.basket__list--item').remove()
        })
    })
}