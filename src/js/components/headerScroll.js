export default () => {
    let header = document.getElementById('header');

    const fixHeader = () => {
        if (window.scrollY > 100) {
            header.classList.add("header--fixed");
        } else {
            header.classList.remove("header--fixed");
        }
    }

    if (window.innerWidth < 1024) {
        fixHeader();

        window.addEventListener('scroll', () => {
            fixHeader();
        });
    }
}
