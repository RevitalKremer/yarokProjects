/// <binding AfterBuild='server, dev, default' ProjectOpened='default, bower-files, dev, jshint, less, script, telerik-files' />

var gulp = require('gulp'),
    server = require('gulp-express');
var gutil = require('gulp-util');
var $ = require('gulp-load-plugins')();
var less = require('gulp-less');
var mainBowerFiles = require('gulp-main-bower-files');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var browserify = require('browserify');
var babelify = require('babelify');
var vinylSourceStream = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

var nodemon = require('gulp-nodemon');

var jshintOptions = {
    "lookup": false, // ignore .jshintrc file
    "browser": true,
    "node": true,
    "esnext": true,
    "bitwise": true,
    "camelcase": true,
    "curly": true,
    "eqeqeq": true,
    "immed": true,
    "indent": 2,
    "latedef": true,
    "newcap": true,
    "noarg": true,
    "quotmark": "single",
    "undef": true,
    "unused": true,
    "strict": true,
    "jquery": true,
    "globals": {
        "requirejs": true,
        "define": true,
        "app": true
    }
};

gulp.task('deploy',['script','minify','less'], function(){
    gulp.src('./bower.json')
        .pipe(mainBowerFiles())
        .pipe(gulp.dest('./dist/scripts/lib'));
    gulp.src('./app/scripts/utils/*')        
        .pipe(gulp.dest('./dist/scripts/utils'));
    gulp.src('./app/templates/**/*')
        .pipe(replace('..\\..\\..\\styles', '.\\styles'))   
        .pipe(replace('../../../styles', './styles'))       
        .pipe(gulp.dest('./dist/templates'));
    gulp.src('./app/index.html')        
        .pipe(gulp.dest('./dist'));
    gulp.src('./app/styles/images/**/*')        
        .pipe(gulp.dest('./dist/styles/images'));
     gulp.src('./app/styles/fonts/**/*')        
        .pipe(gulp.dest('./dist/styles/fonts'));
    gulp.src(['app/styles/main.less'])
        .pipe(less().on('error', gutil.log))
        .pipe(gulp.dest('dist/styles/'))
        .pipe(reload({stream: true}));
   gulp.src('./dist/main.min.js')
        .pipe(replace('../../template', './template'))            
        .pipe(gulp.dest('dist/'));    
    return true;
});

gulp.task("bower-files", function(dir){
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles())
        .pipe(gulp.dest('./app/scripts/lib'));
});


gulp.task('less', function () {
    return gulp.src(['app/styles/main.less'])
        .pipe(less().on('error', gutil.log))
        .pipe(gulp.dest('app/styles/'))
        .pipe(reload({stream: true}));
});

gulp.task('jshint', function () {
    return gulp.src(['app/Controllers/**/*.js', '!./app/scripts/lib/**/*'])
        //.pipe(reload({stream: true, once: true}))
        .pipe($.jshint(jshintOptions))
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('clean', require('del').bind(null, ['dist']));

gulp.task('client', ['script','less'], function () {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['app'],
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    });

    // watch for changes
    gulp.watch([
        'app/**/*.html',
        //'app/scripts/**/*.js',
        'app/main.min.js',
        'app/images/**/*',
    ]).on('change', reload);

    gulp.watch('app/styles/**/*.less', ['less']);
    gulp.watch('bower.json', ['bower-files']);
    gulp.watch(['app/**/*.js', '!app/main.min.js'], ['jshint', 'script']);
    
});

gulp.task('script', function() {
    var sources = browserify({
        entries: 'app/main.js',
        debug: true
    })
        .transform(babelify.configure({modules: 'umd'}));

    return sources.bundle()
        .on('error', function (err) { console.error(err); })
        .pipe(vinylSourceStream('main.min.js'))        
        .pipe(vinylBuffer())
        .pipe(gulp.dest('app/'))        
});

// Concat & Minify JS
gulp.task('minify', function(){
    gulp.src('./app/main.min.js')        
        .pipe(rename('main.min.js'))
        .pipe(uglify({ mangle: false, compress:true, output: { beautify: false } }))
        .pipe(gulp.dest('dist/'));
});


// gulp.task('server', function () {
//     return server.run({
//         file: './app.js'
//     });
// });



//gulp.task('default', ['server']);

gulp.task('dev', ['script','less', 'server'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:8123", // port of node server,
        port: 9000,
    });

    // watch for changes
    gulp.watch([
        'app/**/*.html',
        //'app/scripts/**/*.js',
        'app/main.min.js',
        'app/images/**/*',
    ]).on('change', reload);

    gulp.watch('styles/**/*.less', ['less']);
    gulp.watch('bower.json', ['bower-files']);
    gulp.watch(['app/**/*.js', '!app/main.min.js'], ['jshint', 'script']);
});

gulp.task('default', ['dev'], function () {
    gulp.watch(["./src/views/*.html"], reload);
});

gulp.task('server', function (cb) {
    var callbackCalled = false;
    return nodemon({script:  './app.js'}).on('start', function () {
        if (!callbackCalled) {
            callbackCalled = true;
            cb();
        }
    });
});

