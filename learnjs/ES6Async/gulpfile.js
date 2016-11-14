/**
 * Created by plter on 11/14/16.
 */

var gulp = require('gulp');
var webpack = require('gulp-webpack');

gulp.task("default", function () {

    gulp.src("./src/app.js")
        .pipe(webpack({
            output: {
                filename: "app.js"
            },
            module: {
                loaders: [
                    {test: /\.js$/, loader: "babel-loader"}
                ]
            }
        }))
        .pipe(gulp.dest("build"));

    gulp.src("./src/*.html").pipe(gulp.dest("build"));
});