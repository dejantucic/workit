import gulp from "gulp";
import autoprefix from "gulp-autoprefixer";
import cleanCss from "gulp-clean-css";
import gulpSass from "gulp-sass";
import dartSass from "sass";

const sass = gulpSass(dartSass);
const { src, dest, watch, series } = gulp;

export function copy() {
  return src(["./src/index.html", "./src/assets*/**/*"]).pipe(dest("./dist"));
}

export function compileCss() {
  return src("./src/scss/*.scss").pipe(sass()).pipe(autoprefix("last 2 version")).pipe(cleanCss()).pipe(dest("./dist/css"));
}

export function watchTask() {
  watch("./src/scss/**/*.scss", compileCss);
}

export const build = series(compileCss, copy);
export const dev = series(build, watchTask);
export const deploy = series(build);

export default dev;
