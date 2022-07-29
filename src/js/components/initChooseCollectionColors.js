import hexToRgbA from '../helpers/hexToRgbA';
import {colorsRotate} from './initAnimations';

export default(selector) => {
    const bg = selector.querySelector('.js-bg');
    const collections = [...selector.querySelectorAll('.js-collection-item')];
    const labels = [...selector.querySelectorAll('.js-radio')];
    const labelsParent = selector.querySelector('.js-colors-list');
    const inputs = [...selector.querySelectorAll('.js-radio-input')];
    const random = selector.querySelector('.js-btn-spin');
    const maxLength = 8;
    const labelsLength = labels.length;
    const newLabelsLength = maxLength - labels.length;

    const setGradientBg = (color) => {
        const gradient = 'linear-gradient(180deg, ' + hexToRgbA(color, 0) + ' 0%, '
            + color + ' 50.26%, ' + hexToRgbA(color, 0) + ' 100%)';
        setTimeout(() => {
            selector.style.color = color;
            bg.style.background = gradient;
        }, 100);
        // bg.style.background = gradient;
    }

    const addHtml = () => {
        // if labels length is more than maxLength / 2
        if (labels.length >= maxLength / 2) {
            // if labels length is more than maxLength / 2 and less than maxLength - 1
            if (labelsLength < maxLength - 1) {
                const newLabels = [...labels.slice(labelsLength - newLabelsLength, labelsLength)];
                newLabels.forEach(l => labelsParent.insertAdjacentHTML('beforeend', l.outerHTML));
            }
            // if labels length = maxLength - 1
            if (labelsLength === maxLength - 1) {
                const newLabels = [...labels.slice(maxLength / 2 - 1, maxLength / 2)];
                newLabels.forEach(l => labelsParent.insertAdjacentHTML('beforeend', l.outerHTML));
            }
        } else {

        }
    }

    const active = (label) => {
        labels.forEach(l => {
            if (l.classList.contains('is-active')) l.classList.remove('is-active');
            if (!l.classList.contains('is-hovered')) l.classList.add('is-hovered');
        });
        label.classList.add('is-active');
        label.classList.add('is-hovered');
    }

    const showHideCollection = (inx) => {
        if (collections && collections.length) {
            collections.forEach(c => {
                if (c.classList.contains('is-visible')) c.classList.remove('is-visible');
                setTimeout(() => collections[inx].classList.add('is-visible'), 200);
            })
        }
    }

    const chooseColor = () => {
        inputs.forEach((input, inx) => {
            const mouseCursor = document.querySelector('.js-cursor');
            const label = input.closest('.js-radio');

            const onComplete = (l) => {
                setGradientBg(l.dataset.color);
                // l.parentElement.prepend(l);
            }

            label.addEventListener('click', () => {
                if (!label.classList.contains('is-active')) {
                    // active class for label
                    active(label);

                    colorsRotate(labelsParent, inx, onComplete(label));
                    showHideCollection(inx);
                }
            });

            label.addEventListener('mouseenter', () => {
                if (label.classList.contains('is-active')) {
                    if (mouseCursor) mouseCursor.classList.add('is-disabled');
                }

            });
            label.addEventListener('mouseleave', () => {
                if (label.classList.contains('is-active')) {
                    if (mouseCursor && mouseCursor.classList.contains('is-disabled'))
                        mouseCursor.classList.remove('is-disabled');
                }
            });
        })
    }

    let arr = Array.from(Array(labelsLength).keys());
    let prevActiveDataset = labels[0].getAttribute('data-color');
    let randomNumber;

    const chooseRandomColor = () => {
        // random number should not be equal to the previous number
        // const getNumber = () => {
        //     let min = 0,
        //         max = 8,
        //         randomNumber;
        //
        //     do {
        //         randomNumber = Math.floor(Math.random() * (max - min)) + min;
        //     } while (randomNumber === getNumber.last);
        //     getNumber.last = randomNumber;
        //     return randomNumber;
        // }

        const getNumber = () => {
            randomNumber = arr[Math.floor(Math.random() * arr.length)];
            arr = arr.filter((n) => {
                return n !== randomNumber;
            });
            return arr;
        }

        // click
        random.addEventListener('click', () => {
            // update prev active
            prevActiveDataset = selector.querySelector('.js-radio.is-active').getAttribute('data-color');

            if (arr.length) {
                getNumber();
            } else {
                // update array & run getNumber with updated
                arr = Array.from(Array(labelsLength).keys());
                getNumber();
            }

            const randomInx = randomNumber;
            const newActiveDataset = labels[randomInx].getAttribute('data-color');

            const onComplete = (l) => {
                setTimeout(() => {
                    setGradientBg(l.dataset.color);
                    showHideCollection(randomInx);
                }, 150);
            }

            if (prevActiveDataset !== newActiveDataset) {
                // active label class & spinner rotate
                active(labels[randomInx]);
                colorsRotate(labelsParent, randomInx, onComplete(labels[randomInx]));
            } else {
                // add pseudo random inx
                const pseudoRandomInx = randomNumber - 1;
                // active label class & spinner rotate
                active(labels[pseudoRandomInx]);
                colorsRotate(labelsParent, pseudoRandomInx, onComplete(labels[pseudoRandomInx]));
            }
        })
    }

    // init
    if (labels && labelsLength && labelsLength < maxLength) addHtml();
    if (inputs) chooseColor();
    if (random) chooseRandomColor();

    // default
    if (bg) setGradientBg(labels[0].dataset.color);
    labels[0].classList.add('is-active');
    showHideCollection(0);
}
