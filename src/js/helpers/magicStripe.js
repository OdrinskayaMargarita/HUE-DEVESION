export default () => {
    const selector = document.querySelector('.js-tabs-content');

    if (selector) {
        const vertical = selector.querySelector('.js-vertical');
        const horizontal = selector.querySelector('.js-horizontal');
        const tables = [...selector.querySelectorAll('.js-table-body')];

        tables.forEach(t => {
            const tab = t.closest('.js-innertab');

            if (tab.classList.contains('is-visible')
                && tab.closest('.js-tabs-item.tab').classList.contains('is-visible')) {
                const item = [...t.querySelectorAll('.js-body-row-item')][0];
                const top = t.closest('.js-sizes-table').offsetTop;
                const left = t.closest('.js-sizes-table').offsetLeft;
                const width = t.clientWidth;
                const height = t.closest('.js-sizes-table').clientHeight;
                const itemWidth = item.clientWidth;
                const itemHeight = item.clientHeight;

                vertical.style.top = `${top}px`;
                vertical.style.width = `${itemWidth}px`;
                vertical.style.height = `${height}px`;

                horizontal.style.left = `${left}px`;
                horizontal.style.width = `${width}px`;
                horizontal.style.height = `${itemHeight}px`;

                t.addEventListener('mousemove', e => {
                    const itemTop = e.target.offsetTop;
                    const itemLeft = e.target.offsetLeft;

                    vertical.classList.add('is-visible');
                    horizontal.classList.add('is-visible');

                    vertical.style.left = `${itemLeft}px`;
                    horizontal.style.top = `${itemTop + top}px`;
                });

                t.addEventListener('mouseleave', e => {
                    if (vertical.classList.contains('is-visible')) vertical.classList.remove('is-visible');
                    if (horizontal.classList.contains('is-visible')) horizontal.classList.remove('is-visible');
                });
            }
        });
    }
}
