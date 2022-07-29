export default () => {
    const modalBtns = document.querySelectorAll('.js-modal-btn');

    modalBtns.forEach(btn => {
        const modal = document.querySelector(
            `#${btn.getAttribute('data-modal')}`);

        if (btn && modal) {
            const modalClose = modal.querySelector('.js-close');

            const addClasses = () => {
                btn.classList.add('is-active');
                modal.classList.add('is-visible');
            }

            const removeClasses = () => {
                btn.classList.remove('is-active');
                modal.classList.remove('is-visible');
            }

            btn.addEventListener('click', () => {
                if (btn.classList.contains('is-active')) {
                    removeClasses();
                } else {
                    addClasses();
                }
            });

            modalClose.addEventListener('click', () => {
                removeClasses();
            });

            document.addEventListener('click', (e) => {
                const target = e.target;

                if (btn.classList.contains('is-active') && modal.classList.contains('is-visible')) {
                    if (target !== btn && target.closest('.js-modal') !== modal) {
                        removeClasses();
                    }
                }
            });
        }
    })
}
