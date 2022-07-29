import initSwiper from '../components/initSwiper';
import initChooseCollectionColors from '../components/initChooseCollectionColors';
import initChooseProductColor from '../components/initChooseProductColor';

export default () => {
    const arrivals = document.querySelector('.arrivals');
    const discover = document.querySelector('.discover');
    const lookbook = document.querySelector('.lookbook');
    const collection = document.querySelector('.choose-collection');

    // arrivals, discover swiper
    const initAllSliders = () => {
        if (arrivals) initSwiper(
            arrivals, 1.78, 2.68, 3.17,
            11, 10, 30, 1000, false, false, true
        );

        if (discover) {
            const discoverSlides = [...discover.querySelectorAll('.slide')];
            const discoverNavigation = discover.querySelector('.navigation');

            if (window.innerWidth >= 768) {
                if (discoverSlides.length > 3) {
                    initSwiper(
                        discover, 1, 3, 3,
                        0, 0, 0, 1000, false, false, true
                    );
                } else {
                    if (discoverNavigation) discoverNavigation.remove();
                }
            } else {
                initSwiper(
                    discover, 1.27, 3, 3,
                    0, 0, 0, 1000, false, false, true
                );
            }

        }

        if (lookbook) initSwiper(
            lookbook, 1.8, 2.185, 3.8,
            0, 0, 80, 1000, false, true, true
        );

    }

    initAllSliders();

    let timer;
    let ww = window.innerWidth;
    window.addEventListener('resize', () => {
        if (window.innerWidth !== ww) {
            ww = window.innerWidth;
            if (timer) clearTimeout(timer);

            timer = setTimeout(() => {
                initAllSliders();
            }, 200);
        }
    });

    // arrival colors buttons
    if (arrivals) {
        const arrivalSlides = [...arrivals.querySelectorAll('.slide')];

        arrivalSlides.forEach((s, inx) => {
            initChooseProductColor(s, inx);
        })
    }

    // collection colors
    if (collection) {
        initChooseCollectionColors(collection);
    }

}
