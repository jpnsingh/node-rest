(function () {
    'use strict';

    var gulp = require('gulp'),
        nodemon = require('gulp-nodemon'),
        gulpMocha = require('gulp-mocha'),
        env = require('gulp-env'),
        supertest = require('supertest');

    gulp.task('default', function () {
        nodemon({
            script: 'app.js',
            ext: 'js',
            env: {
                PORT: 8001
            },
            ignore: ['./node_modules']
        }).on('restart', function () {
            console.log('Restarting...');
        });
    });

    gulp.task('test', function () {
        env({
            vars: {
                ENV: 'test'
            }
        });

        gulp
            .src(['test/spec/*/*.js', 'test/e2e/*/*.js'], {read: false})
            .pipe(gulpMocha({reporter: 'nyan'}));
    })
})();