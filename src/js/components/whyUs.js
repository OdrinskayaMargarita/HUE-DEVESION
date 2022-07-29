import Plyr from "plyr";


export default () => {

    const plyrWhyUs = document.querySelector('.js-why-us-player')
    if (plyrWhyUs) {
        const options = {
            fullscreen: {
                enabled: false,
                iosNative: false
            },
            controls: false,
            muted: true,
            autoplay: true,
            loop: {
                active: true
            },
            storage: {enabled: false}
        };
        const player = new Plyr(document.querySelector(".js-why-us-player"), options);
    }
}
