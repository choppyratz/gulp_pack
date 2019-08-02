const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');

const stylesFiles = [
    'src/main.css'
]
const scriptsFiles = [
    'src/script.js'
]



function styles() {
    return gulp.src(stylesFiles)
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false  
        }))
        .pipe(cleanCSS({
            level:2
        }))
        .pipe(gulp.dest('./build/css'));
}

function scripts() {
    return gulp.src(scriptsFiles)
        .pipe(concat('script.js'))
        .pipe(uglify({toplevel: true}))
        .pipe(gulp.dest('./build/js'));
}


function minimg() {
    return gulp.src('./src/images/**')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng(),
            imagemin.svgo([{removeViewBox: false}, {minifyStyles: false}])
            ], {verbose: true}))
        .pipe(gulp.dest('./build/img/'));
}

gulp.task('styles',styles);
gulp.task('scripts',scripts);
gulp.task('minimg',minimg);

gulp.task('default',gulp.parallel('styles','scripts','minimg'));