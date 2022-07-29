export default () => {
    const tabs = [...document.querySelectorAll('.js-tabs')];

    tabs.forEach(tab => {
        const tabsBtns = [...tab.querySelectorAll('.js-tab-btn')];

        tabsBtns.forEach((btn, inx) => {
            const tabContents = btn.closest('.js-tab-nav')?.nextElementSibling?.querySelectorAll(':scope > .js-tabs-item');

            const removeClasses = (els, className) => {
                els.forEach(el => {
                    if (el.classList.contains(className)) {
                        el.classList.remove(className);
                    }
                });
            }

            btn?.addEventListener('click', () => {
                const tabContent = tabContents[inx];


                // console.log(innertabBtns)

                if (tabContent && !btn.classList.contains('is-active')) {
                    removeClasses(tabsBtns, 'is-active');
                    removeClasses(tabContents, 'is-visible');

                    btn.classList.add('is-active');
                    tabContent.classList.add('is-visible');
                }


                if (btn.classList.contains('tab-btn')) {
                    const innertabBtns = tabContent.querySelectorAll('.js-innertab-btn');
                    innertabBtns[0].click();
                }
            });
        });

        // default actives
        tabsBtns[0].click();
    });
}
