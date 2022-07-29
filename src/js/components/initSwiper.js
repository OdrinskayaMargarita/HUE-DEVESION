import Swiper from "swiper";
import SwiperCore, {Navigation, Pagination, Autoplay} from 'swiper/core';
import {isMobile} from '../helpers/detect-device';

SwiperCore.use([Navigation, Pagination, Autoplay]);

export default (selector, viewMob, viewTab, viewDesk,
                betMob, betTab, betDesk, speed = 1000,
                autoplay = false, centered = false, loop = false, spaceAfter = !loop,
                autoHeight = false
) => {
    let ww = window.innerWidth;
    const slider = selector.querySelector('.swiper-container');
    const slides = [...slider.querySelectorAll('.swiper-slide')];
    const navigation = selector.querySelector('.navigation');
    const prev = selector.querySelector('.swiper-prev');
    const next = selector.querySelector('.swiper-next');
    const pagination = selector.querySelector('.swiper-pagination');

    const swiper = new Swiper(slider, {
        autoHeight: autoHeight,
        speed: speed,
        slidesPerView: viewMob,
        spaceBetween: betMob,
        watchSlidesVisibility: true,
        slidesOffsetAfter: spaceAfter ? 25 : 0,
        autoplay: autoplay,
        centeredSlides: centered,
        loop: loop,
        slideToClickedSlide: centered,
        shortSwipes: isMobile().mobile,
        navigation: {
            prevEl: prev,
            nextEl: next,
        },
        pagination: {
            el: pagination ? pagination : null,
            type: 'custom',
            renderCustom: (swiper, current) => {
                return '<span class="is-active">' + ('0' + current).slice(-2) + '</span>'
                    + ' | ' + ('0' + slides.length).slice(-2);
            }
        },
        breakpoints: {
            768: {
                slidesPerView: viewTab,
                spaceBetween: betTab ? betTab : betMob,
                slidesOffsetAfter: spaceAfter ? 45 : 0,
            },
            1200: {
                slidesPerView: viewDesk,
                spaceBetween: betDesk ? betDesk : betTab,
                slidesOffsetAfter: spaceAfter ? 75 : 0,
            }
        },
        onSlideChangeEnd: (s) => {
            if ( autoplay && s.slides.length === s.activeIndex + 1 ) s.slideTo(0);
        }
    });

    swiper.on('slideChangeTransitionStart', () => {
        slides.forEach(s => s.classList.add('is-animated'));
    });

    swiper.on('slideChangeTransitionEnd', () => {
        slides.forEach(s => s.classList.remove('is-animated'));
    });

    const hideSwiperNavigation = () => {
        if (ww < 768) {
            if (slides.length < Math.ceil(viewMob)) {
                navigation.classList.add('is-hidden')
            } else {
                if (navigation.classList.contains('is-hidden')) navigation.classList.remove('is-hidden');
            }
        }

        if (ww >= 768 && ww < 1200) {
            if (slides.length < Math.ceil(viewTab)) {
                navigation.classList.add('is-hidden')
            } else {
                if (navigation.classList.contains('is-hidden')) navigation.classList.remove('is-hidden');
            }
        }

        if (ww >= 1200) {
            if (slides.length < Math.ceil(viewDesk)) {
                navigation.classList.add('is-hidden')
            } else {
                if (navigation.classList.contains('is-hidden')) navigation.classList.remove('is-hidden');
            }
        }
    }

    if (navigation) hideSwiperNavigation();

    window.addEventListener('resize', () => {
        if (swiper && window.innerWidth !== ww) {
            ww = window.innerWidth;
            swiper.destroy();
        }
    })
}
