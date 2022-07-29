// import 'regenerator-runtime';

//import {ScrollToPlugin} from 'gsap/all.scss';
//import TweenLite from 'gsap';
//import TimelineLite from 'gsap';
//const scrollToPlugin = ScrollToPlugin; // need to include to bundle on build
import {loader} from './components/initAnimations';
import commonScripts from './common';
import pageLoader from './page-loader';

loader();
document.body.classList.add('is-loaded');

pageLoader(); // fire scripts for loaded page
commonScripts(); // fore common scripts
