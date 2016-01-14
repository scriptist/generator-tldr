var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var babelify = require('babelify');
var aliasify = require('aliasify');
var browserSync = require('browser-sync');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var onError = function (err) {
	$.util.beep();
	$.util.log($.util.colors.red('Compilation Error\n'), err.toString());
	this.emit('end');
};

gulp.task('scss', ['cleancss'], function() {
	return gulp
		.src('scss/**/*.scss')
		.pipe($.plumber({
			errorHandler: onError
		}))
		.pipe($.sourcemaps.init())
			.pipe($.sass({
				outputStyle: 'compressed',
				onError: console.error.bind(console, 'Sass error:')
			}))
			.pipe(autoprefixer())
		.pipe($.sourcemaps.write(''))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream());
});

gulp.task('es6', ['lintes6', 'cleanjs'], function() {
	var b = browserify({
		baseDir: 'es6',
		entries: ['es6/global.es6'],
		paths: ['es6', 'bower_components'],
		transform: [aliasify]
	});
	b.transform('babelify', {extensions: ['.es6']});

	return b.bundle()
		.pipe($.plumber({
			errorHandler: onError
		}))
		.pipe(source('global.es6'))
		.pipe(buffer())
		.pipe($.rename({
			extname: '.js'
		}))
		.pipe($.sourcemaps.init({ loadMaps: true }))
		.pipe($.sourcemaps.write(''))
		.pipe(gulp.dest('js'))
		.pipe(browserSync.stream({once: true}));
});

gulp.task('buildcss', ['scss'], function() {
	return gulp
		.src('css/*.css')
		.pipe($.uglifycss())
		.pipe(gulp.dest('css'));
});

gulp.task('buildjs', ['es6'], function() {
	return gulp
		.src('js/*.js')
		.pipe($.uglify())
		.pipe(gulp.dest('js'));
});

gulp.task('lintes6', function() {
	return gulp
		.src('es6/**/*.es6')
		.pipe($.eslint({
			extends: 'eslint:recommended',
			env: {
				"browser": true,
				"commonjs": true,
			},
			parser: 'babel-eslint',
			rules: {
				'brace-style': [1, '1tbs'],
				'camelcase': 1,
				'comma-dangle': [1, 'always-multiline'],
				'comma-spacing': [1, {'before': false, 'after': true}],
				'comma-style': [2, 'last'],
				'eol-last': 1,
				'indent': [2, 'tab'],
				'no-console': 0,
				'quotes': [1, 'single'],
				'semi': 2,
				'strict': [2, 'global'],
			},
		}))
		.pipe($.eslint.format('stylish', process.stderr))
		.pipe($.eslint.results(function(results) {
			if (results.warningCount || results.errorCount) {
				$.util.beep();
			}
		}));
});

gulp.task('build', ['buildcss', 'buildjs']);

gulp.task('cleancss', require('del').bind(null, ['css/*.css']));

gulp.task('cleanjs', require('del').bind(null, ['js/*.js']));

gulp.task('clean', ['cleancss', 'cleanjs']);

gulp.task('watch', ['scss', 'es6'], function() {
	browserSync({
		notify: false,
		port: 9000,
		proxy: 'localhost.<%= appname %>'
	});

	gulp.watch('twig/**/*.html.twig').on('change', browserSync.reload);
	gulp.watch('scss/**/*.scss', ['scss']);
	gulp.watch('es6/**/*.es6', ['es6']);
});

gulp.task('default', ['watch']);
