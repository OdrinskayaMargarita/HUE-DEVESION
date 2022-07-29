import formFocuses from '../helpers/form-focuses';
import dropdown from '../helpers/dropdown';
import initChoosePlpCatalogImg from '../components/initChoosePlpCatalogImg';
import modalBuy from '../components/modalBuy';
import initChooseProductColor from '../components/initChooseProductColor';

export default () => {
    const form = document.querySelector('.form-theme--addresses');
    const dropdownWrap = document.querySelector('.js-dropdown-wrap');
    const catalog = document.querySelector('.js-catalog');
    const catalogItems = [...document.querySelectorAll('.catalog__item')];
    const modal = document.querySelector('#catalog-modal');
    const products = document.querySelector('.js-catalog-products');
    const navLinks = [...document.querySelectorAll('.js-account-nav')];

    if (form) formFocuses(form);
    if (dropdownWrap) dropdown(true);
    if (catalog) initChoosePlpCatalogImg();
    if (catalogItems && modal) modalBuy();
    if (products) {
        const productsItems = [...products.querySelectorAll('.js-product-card')];

        productsItems.forEach((s, inx) => {
            initChooseProductColor(s, inx);
        })
    }

    if (navLinks) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === '/' + location.pathname.split("/")[1]) {
                link.classList.add('is-active');
            }
        })
    }
}
