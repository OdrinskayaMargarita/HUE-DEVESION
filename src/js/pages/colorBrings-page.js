import initSwiper from '../components/initSwiper';

export default () => {
    let ww = window.innerWidth;
    const bottom = document.querySelector('.bottom-section');

    if (bottom) {
        const initSlider = () => {
            if (ww < 1200) {
                initSwiper(bottom, 1, 1, 1,
                    0, 0, 0,
                    1000, false, false, true, false, true)
            }
        }

        initSlider();

        let timer;
        window.addEventListener('resize', () => {
            if (window.innerWidth !== ww) {
                ww = window.innerWidth;
                if (timer) clearTimeout(timer);

                timer = setTimeout(() => {
                    initSlider();
                }, 200);
            }
        });
    }
}
