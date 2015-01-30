var gulp       = require('gulp'),
    browserify = require('gulp-browserify'),
    concat     = require('gulp-concat'),
    imagemin   = require('gulp-imagemin'),
    connect = require('connect'),
    http = require('http'),
    handler = require('./handler'),
    less = require('gulp-less'),
    path = require('path');

 
gulp.task('styles', function () {
    gulp.src(['assets/css/styles.css'])
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./static/'));

});

gulp.task('scripts', function () {
    gulp.src(['assets/js/site.jsx'])
        .pipe(browserify({
            debug: true,
            transform: [ 'reactify' ]
        }))
        .pipe(gulp.dest('static/'));
        //.pipe(connect.reload());        
});

gulp.task('less', function () {
    gulp.src('assets/less/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./static/css'));
});

gulp.task('images', function () {
    gulp.src(['assets/images/*.jpg', 'assets/images/*.png', 'assets/images/*.svg'])
        .pipe(imagemin())
        .pipe(gulp.dest('static/images/'));

});

gulp.task('bootstrap', function () {
    gulp.src(['bower_components/bootstrap/dist/**'])
        .pipe(gulp.dest('./static/'));
});

gulp.task('ubuntu', function () {
    gulp.src(['ubuntu/**'])
        .pipe(gulp.dest('./static/ubuntu/'));
});


gulp.task('watch', function() {
    gulp.watch('assets/js/*.jsx', [ 'scripts' ]);
    gulp.watch('assets/less/*.less', [ 'less' ]);
    gulp.watch('assets/images/*', [ 'images' ]);
});
 
gulp.task('static', ['styles', 'less', 'scripts', 'images', 'bootstrap', 'ubuntu' ]);

gulp.task('webserver', function() {
     var app = connect()
             .use(require('morgan')('dev'))
             .use(require('serve-static')('public'))
             .use(handler);

    http.createServer(app).listen(3000);
});

gulp.task('default', ['static']);

gulp.task('dev', ['static', 'webserver', 'watch']);
