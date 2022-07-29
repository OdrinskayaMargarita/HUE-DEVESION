export default () => {
    const imageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;
                console.log("lazy loading ", lazyImage);
                lazyImage.src = lazyImage.dataset.src;
                if (lazyImage.dataset.srcset) lazyImage.srcset = lazyImage.dataset.srcset;
            }
        })
    });

    const imagesArr = document.querySelectorAll('[data-lazy]')
    console.log(imagesArr)
    imagesArr.forEach((img) => {
        imageObserver.observe(img);
    })
}
