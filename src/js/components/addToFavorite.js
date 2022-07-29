export default () => {
    let favoritesAll = document.querySelectorAll('.add-to-fav')

    favoritesAll.forEach( favOne => {
        favOne.addEventListener('click', (e) => {
            e.preventDefault()
            favOne.classList.toggle('fav-ok')
        })
    })
}
