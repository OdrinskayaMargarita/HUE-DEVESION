export default () => {
    let pdpColours = document.getElementById('pdp__colours')
    let itemColourRadio = pdpColours.querySelectorAll('input[type="radio"]')
    let pdpTabs = document.getElementById('pdp__tabs')

    itemColourRadio.forEach((itemColourRadioOne) => {
        itemColourRadioOne.addEventListener('click', () => {
            let colour = itemColourRadioOne.getAttribute('data-colour')
            pdpTabs.style.backgroundColor = colour;
        })
    })

}
