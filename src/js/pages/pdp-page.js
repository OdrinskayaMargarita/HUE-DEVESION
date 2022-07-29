import Swiper, {Navigation, Pagination} from 'swiper';
import {isMobile} from '../helpers/detect-device';
import initChoosePlpCatalogImg from '../components/initChoosePlpCatalogImg';
import lightOrDarkColor from '../components/lightOrDarkColor';
import modalBuy from '../components/modalBuy';
import initChooseProductColor from '../components/initChooseProductColor';
// import initTabs from '../helpers/initTabs';
// import magicStripe from '../helpers/magicStripe';
import dropdown from '../helpers/dropdown';

export default () => {
    Swiper.use([Navigation, Pagination]);
    const pdp = document.querySelector('.pdp__image');

    if (pdp) {
        const pdpSwiper = pdp.querySelector('.swiper-container');
        const pagination = pdp.querySelector('.swiper-pagination');
        const prev = pdp.querySelector('.swiper-button-prev');
        const next = pdp.querySelector('.swiper-button-next');
        const sliderVideos = pdp.querySelectorAll('.swiper-slide .js-video-wrap');

        let swiper = new Swiper(pdpSwiper, {
            slidesPerView: 1,
            speed: 500,
            effect: "fade",
            shortSwipes: isMobile().mobile,
            pagination: {
                el: pagination,
                clickable: true,
            },
            navigation: {
                nextEl: next,
                prevEl: prev,
            },
        });

        if (!isMobile().mobile) {
            pdp.addEventListener('mousemove', e => {
                const area = pdp.clientWidth * 0.2;
                const y = e.pageY;
                const x = e.pageX;

                if (x < area) {
                    if (next.classList.contains('is-visible')) next.classList.remove('is-visible');
                    prev.classList.add('is-visible');
                } else {
                    if (prev.classList.contains('is-visible')) prev.classList.remove('is-visible');
                }

                if (x > pdp.clientWidth - area) {
                    if (prev.classList.contains('is-visible')) prev.classList.remove('is-visible');
                    next.classList.add('is-visible');
                } else {
                    if (next.classList.contains('is-visible')) next.classList.remove('is-visible');
                }

                prev.style.top = y + 'px';
                prev.style.left = x + 'px';
                next.style.top = y + 'px';
                next.style.left = x + 'px';
            });

            pdp.addEventListener('mouseleave', e => {
                if (prev.classList.contains('is-visible')) prev.classList.remove('is-visible');
                if (next.classList.contains('is-visible')) next.classList.remove('is-visible');
            });
        }
    }

    // Details
    const dropdownWrap = document.querySelector('.js-dropdown-wrap');
    lightOrDarkColor(dropdownWrap,
        window.getComputedStyle(dropdownWrap, null).getPropertyValue('color'));

    if (dropdownWrap) {
        const dropdownItems = [...dropdownWrap.querySelectorAll('[data-dropdown-container]')];

        dropdown(true);
        dropdownItems[0].querySelector('[data-dropdown-button]').click();

        // change color
        document.addEventListener('click', e => {
            const target = e.target;

            if (target.hasAttribute('data-dropdown-button')
                && target.classList.contains('opened')) {
                const color = target.getAttribute('data-color');
                dropdownWrap.style.setProperty("color", color);

                lightOrDarkColor(dropdownWrap, color);
            }
        })
    }

    //Scroll to tabs
    const buttonMoreDetails = document.getElementById('js-more-details')
    buttonMoreDetails.addEventListener('click', () => {
        dropdownWrap.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    })

    // inits
    initChoosePlpCatalogImg();
    modalBuy();

    // sizes modal tabs
    // const sizesModal = document.querySelector('.modal-sizes');
    // if (sizesModal) initTabs();

    // magicStripe();
    // document.addEventListener('click', () => magicStripe());

    const products = document.querySelector('.js-catalog-products');
    if (products) {
        const productsItems = [...products.querySelectorAll('.js-product-card')];

        productsItems.forEach((s, inx) => {
            initChooseProductColor(s, inx);
        })
    }
}
