export default () => {
    const btn = document.querySelector('.js-back');

    if (btn && window.history) {
        btn.addEventListener('click', () => window.history.back());
    }
}
