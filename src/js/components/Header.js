import {scrollHide, scrollShow} from '../helpers/showHideScroll';

export default class {
    constructor() {
        this.header = document.getElementById('header');
        this.openSeacrh = document.getElementById('open-search');
        this.closeSeacrh = document.getElementById('close-search');
        this.inputSearch = document.getElementById('input-search');
        this.headerBurger = document.getElementById('header__burger')
        this.headerBurgerClose = document.getElementById('header__nav--close')
        this.headerNav = document.getElementById('header__nav')
        this.body = document.getElementById('body');
    }

    init() {
        this.openF_Search();
        this.closeF_Search();
        this.openF_SearchResult();
        this.open_NavigationMob();
        this.close_NavigationMob();
    }

    openF_Search() {
        this.openSeacrh.addEventListener('click', (e) => {
            e.preventDefault();
            this.body.classList.add('open__search');
        });
    }

    closeF_Search() {
        this.closeSeacrh.addEventListener('click', (e) => {
            e.preventDefault();
            this.body.classList.remove('open__search');
            this.body.classList.remove('open__search-result');
        });
    }

    openF_SearchResult() {
        this.inputSearch.addEventListener('keydown', ({target}) => {
            target?.value?.length >= 2 && this.body.classList.add('open__search-result');
            target?.value?.length <= 1 && this.body.classList.remove('open__search-result');
        });
    }

    open_NavigationMob() {
        this.headerBurger.addEventListener('click', (e) => {
            e.preventDefault();
            this.headerNav.classList.add('header__nav--open-mobile');
            if (window.innerWidth < 768) {
                scrollHide();
            }
        })
    }
    close_NavigationMob() {
        this.headerBurgerClose.addEventListener('click', (e) => {
            e.preventDefault();
            this.headerNav.classList.remove('header__nav--open-mobile');
            if (window.innerWidth < 768) {
                scrollShow();
            }
        })
    }

}
