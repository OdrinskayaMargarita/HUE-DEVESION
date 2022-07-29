import headerTheme from '../components/headerTheme';
import backButton from '../components/backButton';

export default () => {
    // fix share
    let ww = window.innerWidth;
    const share = document.querySelector('.js-share');
    const content = document.querySelector('.js-content');

    if (share && content) {
        const fixShare = () => {
            if (ww >= 768) {
                const thisContent = share.closest('.js-content');
                const top = thisContent.offsetTop;
                const bottom = top + thisContent.clientHeight - share.clientHeight * 2;
                const y = window.scrollY;

                if (thisContent.clientHeight > window.innerHeight) {
                    if (y > top && y < bottom) {
                        share.classList.add('is-fixed');
                    } else {
                        if (share.classList.contains('is-fixed')) share.classList.remove('is-fixed');
                    }
                }
            }
        }

        fixShare();

        window.addEventListener('scroll', () => fixShare());
        window.addEventListener('resize', () => {
            if (window.innerWidth !== ww) {
                ww = window.innerWidth;
                fixShare();
            }
        });
    }

    // other
    headerTheme(true);
    backButton();
}
