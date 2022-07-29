export default () => {
    let catalogModalMinus = document.getElementsByClassName("catalog__modal--minus")
    let catalogModalPlus = document.getElementsByClassName("catalog__modal--plus")

    catalogModalPlus.forEach((catalogModalPlusItem) => {
        catalogModalPlusItem?.addEventListener('click', () => {
            let catalogModalInputParent = catalogModalPlusItem.closest(".catalog__modal--count")
            let catalogModalInput = catalogModalInputParent.querySelectorAll('#catalog__modal--input')

            let value = catalogModalInput[0].value;
            value++;
            catalogModalInput[0].value = value;
        })
    })

    catalogModalMinus.forEach((catalogModalMinusItem) => {
        catalogModalMinusItem?.addEventListener('click', () => {
            let catalogModalInputParent = catalogModalMinusItem.closest(".catalog__modal--count")
            let catalogModalInput = catalogModalInputParent.querySelectorAll('#catalog__modal--input')

            let value = catalogModalInput[0].value;
            if (value >= 2) {
                value--;
                catalogModalInput[0].value = value;
            }
        })
    })

}
