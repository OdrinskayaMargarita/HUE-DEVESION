export default (selector, inx) => {
    const radioBtns = [...selector.querySelectorAll('.js-radio')];
    const radioInputs = [...selector.querySelectorAll('.js-radio-input')];
    const colored = selector.querySelector('.js-bg');
    const imgDefault = selector.querySelector('.js-img-default');
    const imgHover = selector.querySelector('.js-img-hover');
    const productName = selector.querySelector('.js-name');
    const links = [...selector.querySelectorAll('.js-link')];

    radioInputs.forEach(i => i.setAttribute('name', `radio-${inx}`));

    radioBtns.forEach((r, i) => {
        const color = r.querySelector('.js-icon').style.backgroundColor;
        const input = r.querySelector('.js-radio-input');
        const srcDefault = r.dataset.img;
        const srcHover = r.dataset.imgHover;
        const href = r.dataset.href;
        const name = r.dataset.name;

        r.addEventListener('click', () => {
            radioInputs.forEach(i => {
                i.removeAttribute('checked');
                if (i.classList.contains('is-checked')) i.classList.remove('is-checked');
            });

            input.setAttribute('checked', 'checked');
            input.classList.add('is-checked');
            colored.style.backgroundColor = color;
            if (imgDefault && srcDefault) imgDefault.setAttribute('src', srcDefault);
            if (imgHover && srcHover) imgHover.setAttribute('src', srcHover);
            if (productName && name) {
                productName.innerHTML = name;
            }
            if (links && href) {
                links.forEach(link => {
                    link.setAttribute('href', href);
                })
            }
        })
    })

    // default
    radioBtns[0].click();
}
