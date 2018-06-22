var gulp = require('gulp'),
    path = require("path"),
    minifycss=require('gulp-minify-css'), 
    cleanCSS = require('gulp-clean-css'),
    concat=require('gulp-concat'),
    uglify=require('gulp-uglify'),
    rename=require('gulp-rename'),
    clean = require('gulp-clean'),
    cssspriter = require("cssspriter")

gulp.task('spriter',function(){
    var cwd = process.cwd();
    var src = path.normalize(cwd + "/src/css/img.icon.css");
    var dest = path.normalize(cwd + "/src/css/img.css");

    var sper = new cssspriter({
        file : path.normalize(cwd + "/src/images/")
    });
    sper.add(src , dest);
    sper.process();
});
gulp.task('default' , function(){
    gulp.watch(['./src/css/img.icon.css'], ['spriter']);
})
//css处理
gulp.task('minifycss',function(){
   return gulp.src('./src/css/*.css')
       .pipe(minifycss())
       .pipe(gulp.dest('build/css'))
});

//JS处理
gulp.task('minifyjs',function(){
   return gulp.src('./src/js/*.js')
       .pipe(uglify())
       .pipe(gulp.dest('build/js')) 
});
// copy
gulp.task('copyHtml',  function() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('build'))
});
// copy
gulp.task('copyImg',  function() {
  return gulp.src('src/images/*')
    .pipe(gulp.dest('build/images'))
});
//clear
gulp.task('clean',function(){
    return gulp.src('./build')
        .pipe(clean())
})
// copy
gulp.task('copy',  function() {
  return gulp.src('src/**/*')
    .pipe(gulp.dest('build'))
});
gulp.task('build' ,['clean'], function(){
    gulp.src('./src/css/*.css')
      .pipe(cleanCSS())
      .pipe(gulp.dest('build/css'));
    // gulp.src('./src/js/*.js')
    //   .pipe(uglify())
    //   .pipe(gulp.dest('build/js'));
    gulp.src('src/*.html')
      .pipe(gulp.dest('build'));
    gulp.src('src/images/**/*')
      .pipe(gulp.dest('build/images'));
      gulp.src('src/js/*')
      .pipe(gulp.dest('build/js'));
})
gulp.task('default', function(){
    gulp.watch(['./src/css/img.icon.css'], ['spriter']);
})
