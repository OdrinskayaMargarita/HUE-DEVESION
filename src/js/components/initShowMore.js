export default (selector) => {
    const moreBtn = selector.querySelector('.js-more');
    const hidden = [...selector.querySelectorAll('.is-hidden')];

    if (moreBtn) {
        moreBtn.addEventListener('click', e => {
            e.preventDefault();

            if (moreBtn.classList.contains('is-active')) {
                moreBtn.classList.remove('is-active');
                hidden.forEach(color => {
                    if (color.classList.contains('is-visible')) color.classList.remove('is-visible');
                });
            } else {
                moreBtn.classList.add('is-active');
                hidden.forEach(color => color.classList.add('is-visible'));
            }
        });
    }
}
