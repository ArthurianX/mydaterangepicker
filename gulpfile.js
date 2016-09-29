var gulp = require('gulp');
var exec = require('child_process').exec;
var clean = require('gulp-clean');
var replace = require('gulp-replace');
var sequence = require('run-sequence');
var cleancss = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var fs = require('fs');

var str1 = '//webpack1_';
var str2 = '//webpack2_';
var str3 = '/*';
var str4 = '*/';

var tsc = './node_modules/typescript/bin/tsc';
var uglify = './node_modules/uglifyjs/bin/uglifyjs';

/*
 *
 * Gulp tasks to build dist and bundle versions.
 *  - Minifies the css file.
 *  - Minifies the html template file.
 *  - Add html template and styles as inline templates to the my-date-range-picker.component.
 *  - Creates dist folder - contain javascript files of the component.
 *
 */

gulp.task('tsc.compile.dist', function (cb) {
    exec(tsc + ' -p ./tsconfig.dist.json', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('tsc.compile.bundle', function (cb) {
    exec(tsc + ' -p ./tsconfig.bundle.json && ' + uglify + ' bundles/mydaterangepicker.js --screw-ie8 --compress --mangle --output bundles/mydaterangepicker.min.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('backup.component.tmp', function() {
    return gulp.src('./src/my-date-range-picker/my-date-range-picker.component.ts').pipe(gulp.dest('./tmp'));
});

gulp.task('minify.css', function() {
    return gulp.src('./src/my-date-range-picker/my-date-range-picker.component.css')
        .pipe(cleancss({compatibility: 'ie8'}))
        .pipe(gulp.dest('./tmp'));
});

gulp.task('minify.html', function() {
    return gulp.src('./src/my-date-range-picker/my-date-range-picker.component.html')
        .pipe(htmlmin({collapseWhitespace: true, caseSensitive: true}))
        .pipe(gulp.dest('./tmp'));
});

gulp.task('prepare.system.compile', function() {
    var styles = fs.readFileSync('./tmp/my-date-range-picker.component.css', 'utf-8');
    var htmlTpl = fs.readFileSync('./tmp/my-date-range-picker.component.html', 'utf-8');

    styles = styles.split('\\e').join('\\\\e');

    return gulp.src(['./src/my-date-range-picker/my-date-range-picker.component.ts'])
        .pipe(replace(str1, str3))
        .pipe(replace(str2, str4))
        .pipe(replace('styles: [myDrpStyles],', 'styles: [' + '`' + styles + '`' + '],'))
        .pipe(replace('template: myDrpTemplate,', 'template: `' + htmlTpl + '`' + ','))
        .pipe(gulp.dest(function(file) {
            return file.base;
        }));
});

gulp.task('delete.modified.component', function () {
    return gulp.src(['./src/my-date-range-picker/my-date-range-picker.component.ts'], {read: false}).pipe(clean());
});

gulp.task('restore.original.component', function() {
    return gulp.src('./tmp/my-date-range-picker.component.ts').pipe(gulp.dest('./src/my-date-range-picker/'));
});

gulp.task('delete.tmp', function () {
    return gulp.src(['./tmp'], {read: false}).pipe(clean());
});

gulp.task('clean', function () {
    return gulp.src(['./build', './tmp'], {read: false}).pipe(clean());
});

gulp.task('all', function(cb) {
    sequence(
        'clean',
        'backup.component.tmp',
        'minify.css',
        'minify.html',
        'prepare.system.compile',
        'tsc.compile.dist',
        'delete.modified.component',
        'restore.original.component',
        'delete.tmp',
        cb);
});
