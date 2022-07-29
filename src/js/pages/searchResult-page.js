import modalBuy from '../components/modalBuy';
import initChooseProductColor from '../components/initChooseProductColor';

export default () => {
    modalBuy();

    const products = document.querySelector('.js-catalog-products');
    if (products) {
        const productsItems = [...products.querySelectorAll('.js-product-card')];

        productsItems.forEach((s, inx) => {
            initChooseProductColor(s, inx);
        })
    }
}
