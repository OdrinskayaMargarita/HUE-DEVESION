import scrollbarWidth from './get-scrollbar-width';

const body = document.body;
const header = document.querySelector('.js-header');
const padding = scrollbarWidth();

window.addEventListener('scroll', () => {
    document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
});

export const scrollHide = () => {
    const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
    body.classList.add('no-scroll');
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}`;
    body.style.paddingRight = `${padding}px`;
    header.style.paddingRight = `${padding}px`;
}

export const scrollShow = () => {
    const scrollY = body.style.top;
    body.classList.remove('no-scroll');
    body.style.position = '';
    body.style.top = '';
    body.style.paddingRight = `0px`;
    header.style.paddingRight = `0px`;
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
}

