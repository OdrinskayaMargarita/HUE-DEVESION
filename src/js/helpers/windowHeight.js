export default () => {
    const getWindowHeight = () => {
        if (document) {
            const windowHeight = document.documentElement.clientHeight;
            const vh = windowHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        }
    }

    getWindowHeight();

    window.addEventListener('resize', () => getWindowHeight())
}
