export default (light = false, dark = false) => {
    const header = document.querySelector('.js-header');

    if (header && light) header.classList.add('is-light');
    if (header && dark) header.classList.add('is-dark');
}
