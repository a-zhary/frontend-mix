const mix = require('laravel-mix');
require('mix-html-builder');

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
	.sass('resources/scss/main.scss', 'css/main.min.css')
	.js('resources/js/app.js', 'js/app.min.js')
	.options({
		processCssUrls: false
	})
	// HTML Compiler
	.html({
		htmlRoot: './resources/index.html', // Your html root file(s)
		output: '', // The html output folder
		partialRoot: './resources/partials',    // default partial path
		layoutRoot: './resources/layouts',    // default partial path
		inject: true,
		minify: {
			removeComments: true
		}
	});
	// Add Layouts

	// Image Optimization

	// SVG Sprites

	// Fonts generate

	// Zip

	// Deployment
