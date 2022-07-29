export default (element, color) => {
    let brightness, r, g, b, hsp;

    const lightOrDark = (bgColor) => {
        // Check the format of the color, HEX or RGB?
        if (bgColor.match(/^rgb/)) {
            // If HEX --> store the red, green, blue values in separate variables
            bgColor = bgColor.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
            r = bgColor[1];
            g = bgColor[2];
            b = bgColor[3];
        } else {
            // If RGB --> Convert it to HEX: http://gist.github.com/983661
            bgColor = +("0x" + bgColor.slice(1).replace(
                    bgColor.length < 5 && /./g, '$&$&'
                )
            );
            r = bgColor >> 16;
            g = bgColor >> 8 & 255;
            b = bgColor & 255;
        }

        // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
        hsp = Math.sqrt(
            0.299 * (r * r) +
            0.587 * (g * g) +
            0.114 * (b * b)
        );

        // Using the HSP value, determine whether the color is light or dark
        if (hsp > 127.5) {
            return 'light';
        } else {
            return 'dark';
        }
    }

    const adjustTextColor = () => {
        // Call lightOrDark function to get the brightness (light or dark)
        brightness = lightOrDark(color);

        // If the background color is dark, add the light-text class to it
        if (brightness === 'dark') {
            if (element.classList.contains('has-dark-text')) element.classList.remove('has-dark-text')
            element.classList.add('has-light-text');
        } else {
            if (element.classList.contains('has-light-text')) element.classList.remove('has-light-text')
            element.classList.add('has-dark-text');
        }
    }

    adjustTextColor();
}
