import {anchorsScroll} from '../components/initAnimations';

export default () => {
    let ww = window.innerWidth;
    const panel = document.querySelector('.js-panel');
    const prevSection = panel.previousElementSibling;

    if (panel && prevSection) {
        const fixPanel = () => {
            const top = prevSection.clientHeight;
            const panelHeight = panel.clientHeight;
            const panelTop = Number(getComputedStyle(panel).top.match(/\d/g).join(''));
            const y = window.scrollY;

            if (y > top - panelTop - 5) {
                panel.classList.add('is-fixed');
                prevSection.style.marginBottom = `${panelHeight}px`
            } else {
                if (panel.classList.contains('is-fixed')) panel.classList.remove('is-fixed');
                prevSection.style.marginBottom = `0px`
            }
        }

        fixPanel();

        window.addEventListener('scroll', () => fixPanel());
        window.addEventListener('resize', () => {
            if (window.innerWidth !== ww) {
                ww = window.innerWidth;
                fixPanel();
            }
        });
    }

    // other
    anchorsScroll();
}
