import initChoosePlpCatalogImg from '../components/initChoosePlpCatalogImg';
import plusMinus from '../components/plusMinus';
import modalBuy from '../components/modalBuy';
import initChooseProductColor from '../components/initChooseProductColor';
import initShowMore from'../components/initShowMore';

export default () => {
    const products = document.querySelector('.js-catalog-products');
    const filters = [...document.querySelectorAll('.js-catalog-filter')];

    initChoosePlpCatalogImg();
    plusMinus();
    modalBuy();

    if (products) {
        const productsItems = [...products.querySelectorAll('.js-product-card')];

        productsItems.forEach((s, inx) => {
            initChooseProductColor(s, inx);
        })
    }

    if (filters) {
        const allFiltersCount = document.querySelector('.js-allFilters-count');
        let allCount = 0;

        const addCount = () => {
            if (allCount > 0) {
                allFiltersCount.innerHTML = `(${allCount})`;
            } else {
                allFiltersCount.innerHTML = '';
            }
        }

        filters.forEach(filter => {
            const inputs = [...filter.querySelectorAll('.js-checkbox')];
            const filtersCount = filter.querySelector('.js-count');
            let count = allCount;
            filtersCount.innerHTML = `(${count})`;

            const check = () => {
                inputs.forEach(input => {
                    input.addEventListener('change', () => {
                        const label = input.closest('.js-item');

                        if (input.checked === true) {
                            label.classList.add('has-checked');
                            input.classList.add('is-checked');
                            count = count + 1;
                            allCount = allCount + 1;
                            filtersCount.innerHTML = `(${count})`;

                            addCount();

                        } else {
                            label.classList.remove('has-checked');
                            input.classList.remove('is-checked');
                            count = count - 1;
                            allCount = allCount - 1;
                            filtersCount.innerHTML = `(${count})`;

                            addCount();
                        }
                    })
                })
            }

            check();
            initShowMore(filter);
        });

        // Clear all filters
        const clearAll = document.getElementById('catalog-filter__clear');
        const allItems = [...clearAll.closest('.catalog-filter').querySelectorAll('.js-checkbox')];

        clearAll.addEventListener('click', () => {
            allItems.forEach((item) => {
                if (item.classList.contains('is-checked')) {
                    item.click();
                }
            })
        })
    }

    // Change 2 or 4 view
    const viewModeBtns = document.querySelectorAll('.js-view');
    const viewModeWrapper = document.querySelector('.js-catalog-products');
    const viewModeItems = [...viewModeWrapper.querySelectorAll('.js-product-card')];

    if (viewModeBtns && viewModeWrapper) {
        viewModeBtns.forEach(btn => {
            const className = btn.getAttribute('data-className');

            const addClasses = (wrapperClass, itemClass) => {
                viewModeWrapper.classList.add(wrapperClass);
                viewModeItems.forEach(item => {
                    item.classList.add(itemClass);
                });
            }

            const removeClasses = (wrapperClass, itemClass) => {
                if (viewModeWrapper.classList.contains(wrapperClass)) viewModeWrapper.classList.remove(wrapperClass);
                viewModeItems.forEach(item => {
                    if (item.classList.contains(itemClass)) item.classList.remove(itemClass);
                });
            }

            btn.addEventListener('click', (e) => {
                e.preventDefault();

                if (!btn.classList.contains('is-active')) {
                    viewModeBtns.forEach(b => {
                        if (b.classList.contains('is-active')) b.classList.remove('is-active');
                    });
                    btn.classList.add('is-active');
                    if (className === 'has-view4') {
                        removeClasses('has-view2', 'is-large');
                        addClasses('has-view4', 'is-small');
                    }
                    if (className === 'has-view2') {
                        removeClasses('has-view4', 'is-small');
                        addClasses('has-view2', 'is-large');
                    }
                }
            })
        })

        viewModeBtns[0].click();
    }

    // Filter sort open close
    const catalogSortOpen = document.getElementById("catalog-sort--open")
    const catalogFilterOpen = document.getElementById("catalog-filter--open")
    const catalogSortClose = document.getElementById("catalog-sort--close")
    const catalogFilterClose = document.getElementById("catalog-filter--close")
    const catalogSort = document.getElementById("catalog-sort")
    const catalogFilter = document.getElementById("catalog-filter")

    catalogFilterOpen?.addEventListener('click', () => {
        catalogFilter.classList.add('catalog-filter--open');
        catalogSort.classList.remove('catalog-sort--open');
    })

    catalogSortOpen?.addEventListener('click', () => {
        catalogSort.classList.add('catalog-sort--open');
        catalogFilter.classList.remove('catalog-filter--open');
    })

    catalogFilterClose?.addEventListener('click', () => {
        catalogFilter.classList.remove('catalog-filter--open');
    })

    catalogSortClose?.addEventListener('click', () => {
        catalogSort.classList.remove('catalog-sort--open');
    })

    window.addEventListener('click', e => {
        const target = e.target
        if (!target.closest('#catalog-filter') && !target.closest('#catalog-filter--open')) {
            catalogFilter.classList.remove('catalog-filter--open');
        }
        if (!target.closest('#catalog-sort') && !target.closest('#catalog-sort--open')) {
            catalogSort.classList.remove('catalog-sort--open');
        }
    })

    // Change type of clothes
    const typesClothes = document.querySelectorAll('.type-clothes')
    typesClothes.forEach((typesClothesItem) => {
        typesClothesItem.addEventListener('click', () => {
            typesClothes.forEach((typesClothesItem) => {
                typesClothesItem.classList.remove('filter__type--active')
            })
            typesClothesItem.classList.add('filter__type--active')
        })
    })
}
