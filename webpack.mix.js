const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
	.setPublicPath('./public')
	.browserSync({
		server: {
			baseDir: './public',
		},
		files: [
			'**/*.html',
			'resources/css/**/*.css',
			'resources/js/**/*.js',
			'resources/images/**/*',
		],
		injectChanges: true,
		open: true,
	})
	.sass('resources/scss/main.scss', 'css')
	.js('resources/js/app.js', 'js')
	.copy('resources/index.html', 'public/')
	.options({
		processCssUrls: false
	});
