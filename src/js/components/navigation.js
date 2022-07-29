import {scrollHide, scrollShow} from '../helpers/showHideScroll';

export default (isMobile) => {
    const submenuBtns = document.querySelectorAll('.js-has-submenu');
    const imagesLinks = document.querySelectorAll('.js-submenu .js-has-img');
    const header = document.querySelector('.js-header');
    const wh = window.innerHeight;




    // show / hide submenus
    if (submenuBtns && submenuBtns.length) {
        submenuBtns.forEach(btn => {
            const link = btn.querySelector('.js-has-submenu-link');
            const submenu = document.querySelector(
                `#${btn.getAttribute('data-submenu')}`);
            const h = submenu.firstElementChild.clientHeight;

            const toggleSubmenu = (btn, header) => {
                const link = btn.querySelector('.js-has-submenu-link');

                if (link.classList.contains('is-active')) {
                    if (h > wh) {
                        scrollShow();
                        header.classList.remove('has-opened-big-nav');
                    }

                    link.classList.remove('is-active');
                    submenu.classList.remove('is-visible');
                    header.classList.remove('has-opened-nav');
                } else {
                    if (h > wh) {
                        scrollHide();
                        header.classList.add('has-opened-big-nav');
                    }

                    link.classList.add('is-active');
                    submenu.classList.add('is-visible');
                    setTimeout(() => header.classList.add('has-opened-nav'), 0)
                }
            }

            const showSubmenu = (btn, header) => {
                const link = btn.querySelector('.js-has-submenu-link');

                if (h > wh) {
                    scrollHide();
                    header.classList.add('has-opened-big-nav');
                }

                link.classList.add('is-active');
                submenu.classList.add('is-visible');
                header.classList.add('has-opened-nav');
            }

            const hideSubmenu = (btn, header) => {
                const link = btn.querySelector('.js-has-submenu-link');

                if (h > wh) {
                    scrollShow();
                    header.classList.remove('has-opened-big-nav');
                }

                link.classList.remove('is-active');
                submenu.classList.remove('is-visible');
                header.classList.remove('has-opened-nav');
            }

            // for touch devices
            if (isMobile) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    toggleSubmenu(btn, header);
                });

                window.addEventListener('click', (e) => {
                    if (link.classList.contains('is-active') &&
                        e.target !== btn && e.target.closest('.js-has-submenu') !== btn) {
                        hideSubmenu(btn, header);
                    }
                })
                // for no-touch
            } else {
                window.addEventListener('mouseover', function (e) {
                    if (link.classList.contains('is-active')) {
                        if (e.target !== link && e.target.closest('.js-has-submenu') !== btn) {
                            hideSubmenu(btn, header);
                        }
                    } else {
                        if (e.target === link) {
                            showSubmenu(btn, header);
                        }
                    }
                });
            }
        })
    }

    // toggle image on submenu item hover
    if (imagesLinks && imagesLinks.length) {
        imagesLinks.forEach(link => {
            const src = link.getAttribute('data-img');
            const alt = link.querySelector('.name').innerHTML;
            const imageWrap = link.closest('.js-submenu').querySelector('.js-img');
            const image = imageWrap.querySelector('img');

            const showImage = () => {
                imageWrap.classList.add('is-visible');
                image.setAttribute('src', src);
                image.setAttribute('alt', alt);
            }

            const hideImage = () => {
                imageWrap.classList.remove('is-visible');
                image.setAttribute('src', '');
                image.setAttribute('alt', '');
            }

            if (!isMobile) {
                link.addEventListener('mouseenter', () => showImage());
                link.addEventListener('mouseleave', () => hideImage());
            }
        })
    }
}
