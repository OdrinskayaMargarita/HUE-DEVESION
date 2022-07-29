import Plyr from 'plyr';
import {scrollHide, scrollShow} from '../helpers/showHideScroll';

export default () => {
    const controls = `
        <div class="plyr__controls">
            <button type="button" class="plyr__control js-hovered" aria-label="Play, {title}" data-plyr="play">
                <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-play"></use></svg>
                <svg class="icon--pressed"  width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="1.5" y1="1.5" x2="1.5" y2="14.7045" stroke="white" stroke-width="3" stroke-linecap="round"/>
                    <line x1="10.7597" y1="1.5" x2="10.7597" y2="14.7045" stroke="white" stroke-width="3" stroke-linecap="round"/>
                </svg>
            </button>
            <div class="plyr__progress">
                <div class="plyr__progress__input-wrap">
                    <input class="plyr__progress__input" data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
                    <div class="plyr__progress__custom-thumb">
                    <svg width="30" height="6" viewBox="0 0 30 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="6.10352e-05" y1="3.26904" x2="30.0001" y2="3.26904" stroke="white" stroke-width="5"/>
                    </svg>
                    </div>
                </div>
                <progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress>
            </div>
        </div>
    `;

    const elements = [...document.querySelectorAll('.js-player:not(.js-why-us-player)')];
    if (elements && elements.length) {
        elements.forEach(p => {
            // init player
            const player = new Plyr(p, {
                vimeo: {
                    controls: false,
                    loop: true,
                    muted: true,
                },
                muted: true,
                clickToPlay: true,
                autoplay:  true,
                controls: controls,
                loop: {
                    active: true
                },
                hideControls: false,
                fullscreen: {
                    enabled: false
                }
            })

            // progress
            player.on('timeupdate', event => {
                const playerWrapper = player.elements.wrapper.closest('.media-wrap');
                const thumb = playerWrapper?.querySelector('.plyr__progress__custom-thumb');
                const curr = player.currentTime;
                const dur = player.duration;
                const position = curr/dur;

                if (curr !== 0) {
                    p.classList.remove('plyr--ended');
                    if (thumb) {
                        thumb.style.left = `${position * 100}%`
                    }
                }
            });

            // player on ended
            // player.on('ended', event => {
            //     p.classList.add('plyr--ended');
            // });

            // if (player.provider === 'vimeo') {
            //     console.log(player, 'vimeo')
            //     player.on('ready', event => {
            //         console.log(player, 'vimeo ready')
            //     });
            //
            // }

            // open / close fullscreen
            player.on('ready', event => {
                const playerWrapper = player.elements.wrapper.closest('.media-wrap');

                if (playerWrapper?.classList.contains('has-fullscreen')) {
                    const openFullscreen = playerWrapper.querySelector('.js-fullscreen');
                    const modal = document.querySelector(
                        `#${openFullscreen.getAttribute('data-modalvideo')}`);
                    const modalClose = modal.querySelectorAll('.js-close');
                    // const modalVideoWrap = modal.querySelector('.modal-video__video');
                    // const modalMp4 = modalVideoWrap.querySelector('video source[type="video/mp4"]');
                    // const modalWebm = modalVideoWrap.querySelector('video source[type="video/webm"]');
                    //
                    // const addSources = () => {
                    //     if (modalMp4) {
                    //         modalMp4.src = openFullscreen.closest('.media-wrap').querySelector('video source[type="video/mp4"]').src;
                    //     }
                    //     if (modalWebm) {
                    //         modalWebm.src = openFullscreen.closest('.media-wrap').querySelector('video source[type="video/webm"]').src;
                    //     }
                    // }
                    // addSources();

                    const pausePlaying = () => elements.forEach(p => {if (!p.paused) p.pause()});

                    openFullscreen.addEventListener('click', (e) => {
                        scrollHide();
                        modal.classList.add('is-visible');

                        elements.forEach(p => {
                            console.log(p)
                            const pWrapper = p.plyr.elements.wrapper;
                            const pModal = pWrapper.closest('.js-modal');

                            if (pModal && pModal.classList.contains('is-visible')) {
                                p.plyr.play();
                                p.plyr.currentTime = player.currentTime;
                            } else {
                                if (!player.paused) player.pause();
                            }
                        });
                    });

                    const closeAll = (modal) => {
                        if (modal.classList.contains('is-visible')) {
                            const thisPlayer = modal.querySelector('.plyr');

                            scrollShow();
                            modal.classList.remove('is-visible');

                            if (thisPlayer) {
                                if (thisPlayer.classList.contains('plyr--video')) {
                                    if (thisPlayer.classList.contains('plyr--playing')) thisPlayer.click();
                                } else {
                                    pausePlaying();
                                }
                            }
                        }
                    }

                    modalClose.forEach(close => {
                        close.addEventListener('click', () => {
                            const thisModal = close.closest('.modal-video');
                            closeAll(thisModal);
                        });
                    })
                }
            });

            // pause no-modal videos with outside click
            // const pauseAll = () => {
            //     document.addEventListener('click', (event) => {
            //         if (player?.media.closest('.plyr') !== event.target.closest('.plyr')) {
            //             if (!player?.paused &&
            //                 !player?.media.closest('.media-wrap').classList.contains('js-modal-media')) player?.pause();
            //         }
            //     });
            // }
            //
            // pauseAll();
        });
    }
}
