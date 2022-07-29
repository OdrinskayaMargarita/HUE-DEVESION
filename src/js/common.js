import {isMobile} from './helpers/detect-device';
import windowHeight from './helpers/windowHeight';
import Splitting from "splitting";

import Header from './components/Header';
import navigation from './components/navigation';
import customCursor from './components/customCursor';
import initSwiper from './components/initSwiper';
import addToFavorite from './components/addToFavorite';
import styleSelect from './libs/style-select';
import plusMinus from './components/plusMinus';
import removeBlock from './components/removeBlock';
import initOpenBasketMenu from './components/initOpenBasketMenu'
import headerScroll from './components/headerScroll'
import validation from './components/validation'
import initPlyrVideo from './components/initPlyrVideo';
import initModals from './components/initModals';
import formFocuses from './helpers/form-focuses';
import whyUs from './components/whyUs';

// import instagramPosts from './components/instagramPosts';

export default () => {
    document.querySelectorAll('.select-menu').forEach(item => {
        styleSelect(item);
    })

    const forms = document.querySelectorAll('.form-theme');
    forms?.forEach((form) => {
        formFocuses(form)
    })

    initPlyrVideo();

    whyUs();

    Splitting();

    const mouseCursor = document.querySelector('.js-cursor');
    const media = [...document.querySelectorAll('.media')];

    const header = new Header();
    header.init();

    navigation(isMobile().mobile);
    windowHeight();
    addToFavorite();
    plusMinus();
    removeBlock();


    initOpenBasketMenu();
    headerScroll();
    validation();
    initModals();

    // const insta = document.querySelector('.insta__gallery');
    // if (insta) instagramPosts();

    media.forEach(m => {
        if (m) {
            initSwiper(m, 2, 2, 2,
                10, 11, 30,
                1000, false, false, true);

            let timer;
            let ww = window.innerWidth;
            window.addEventListener('resize', () => {
                if (window.innerWidth !== ww) {
                    ww = window.innerWidth;
                    if (timer) clearTimeout(timer);

                    timer = setTimeout(() => {
                        initSwiper(m, 2, 2, 2,
                            10, 11, 30,
                            1000, false, false, true);
                    }, 200);
                }
            });
        }
    });

    if (!isMobile().mobile) {
        document.body.classList.add('no-touch');
        customCursor();
    } else {
        document.body.classList.add('touch');
        mouseCursor.remove();
    }
}
