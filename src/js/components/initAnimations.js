import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/all'
import {scrollHide, scrollShow} from '../helpers/showHideScroll';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const loader = () => {
    const loader = document.querySelector('.js-loader');

    if (loader) {
        scrollHide();

        const dots = [...loader.querySelectorAll('.js-dot')];
        const gradient = loader.querySelector('.js-gradient');
        const logo = loader.querySelector('.js-logo');
        const center = dots[4].getBoundingClientRect().left;

        const anim = gsap.timeline({paused: true});
        const ease = 'sine';

        const moveToCenter = () => {
            dots.forEach((d, inx) => {
                const position = center - d.getBoundingClientRect().left;

                gsap.to(d, {
                    duration: 0.5,
                    x: position,
                    ease: 'none',
                    onComplete: () => {
                        gradient.classList.add('is-visible');
                        if (inx !== 0) {
                            d.remove();
                        }
                    }
                })
            })
        }

        const disableLoader = () => {
            loader.classList.add('is-disabled');
        };

        const removeLoader = () => {
            loader.remove();
        };

        anim
            .to(dots, {
                y: '-100%',
                duration: 0.25,
                stagger: 0.12,
                ease: 'none',
            }, 'anim')
            .to(dots, {
                y: 0,
                duration: 0.25,
                stagger: 0.1 + 0.35 / dots.length,
                ease: 'none',
                onComplete: () => moveToCenter(),
            }, 'anim+=0.12')
            .to(gradient, {
                delay: 0.1,
                duration: 6,
                scale: 100,
                ease: ease,
                force3D: false
            }, 2)
            .to(logo, {
                duration: 2,
                autoAlpha: 1,
                ease: ease,
                onComplete: () => scrollShow(),
            }, 2)
            .to(logo, {
                delay: 1.1,
                duration: 2,
                autoAlpha: 0,
                ease: ease,
                onComplete: () => disableLoader(),
            }, 3)
            .to(loader, {
                duration: 2,
                autoAlpha: 0,
                ease: ease,
                onComplete: () => removeLoader(),
            }, 4)

        anim.play();
    }
}

export const anchorsScroll = () => {
    const anchors =  [...document.querySelectorAll('.js-anchor')];

    anchors.forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();

            const targetElem = document.querySelector(e.target.getAttribute('href'));
            const panel = a.closest('.js-panel');
            const panelHeight = panel?.offsetHeight;
            const panelTop = panel ? Number(getComputedStyle(panel).top.match(/\d/g).join('')) : null;
            const header = document.querySelector('.js-header');
            const headerHeight = header.clientHeight;
            const noPanelTop = header.classList.contains('header--fixed') ? headerHeight : 0;

            if (targetElem) {
                gsap.to(window, {
                    scrollTo: {
                        y: targetElem,
                        autoKill: false,
                        offsetY: panel ? panelHeight + panelTop : noPanelTop
                        // offsetY: 65
                    },
                    duration: 1,
                    ease: 'power4.out'
                });
            }
        })
    })
}

export const colorsRotate = (colors, inx, onComplete) => {
    const anim = gsap.timeline({paused: true});

    anim
        .to(colors, {
            // rotate: 495 - inx * 45,
            rotate: 495 * 2,
            duration: 0.35,
            ease: 'none',
            onComplete: () => {
                gsap.to(colors, {rotate: 495 - inx * 45, duration: 0});
                onComplete
            },
        });

    anim.play();
}
