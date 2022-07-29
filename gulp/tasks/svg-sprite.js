"use strict";

var gulp        = require('gulp'),
    cheerio     = require('gulp-cheerio'),
    replace     = require('gulp-replace'),
    svgSprite   = require('gulp-svg-sprite');

// npm install --save-dev gulp-cheerio gulp-svg-sprite

var path = {
    src: {
        svgicon: 'src/img/icons/'
    }
};

var configsvg = {
    mode: {
        symbol: {
            dest : '.',
            sprite: "../sprite.svg",
            render: {
                scss: {
                    dest: '../../sass/blocks/_sprite-svg.scss',
                    template: 'src/sass/helpers/_sprite_svg_template.scss'
                }
            }
        }
    }
};

// main.svg
gulp.task('spritesvg', function () {
    return gulp.src(path.src.svgicon + '*.svg')
    .pipe(cheerio({
        run: function ($) {
            $('[fill]').removeAttr('fill');
            $('[stroke]').removeAttr('stroke');
            $('[style]').removeAttr('style');
        },
        parserOptions: {xmlMode: true}
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite(configsvg))
    .pipe(gulp.dest(path.src.svgicon));
});
// start
// gulp spritesvg
