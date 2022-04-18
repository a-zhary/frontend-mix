const mix = require('laravel-mix');

const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const ImageminPlugin = require('imagemin-webpack-plugin').default;
// const imageminMozjpeg = require('imagemin-mozjpeg');

require('laravel-mix-webp');

require('mix-html-builder');
require('laravel-mix-clean');
// require('laravel-mix-svg-sprite');

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
            'resources/*.html',
            'resources/css/**/*.css',
            'resources/js/**/*.js',
            'resources/images/**/*',
        ],
        injectChanges: true,
        open: true,
    })
    .clean()
    .sass('resources/scss/main.scss', 'css/main.min.css')
    .js('resources/js/app.js', 'js/app.min.js')
    .options({
        processCssUrls: false
    })
    // HTML Compiler
    .html({
        htmlRoot: './resources/*.html', // Your html root file(s)
        output: '', // The html output folder
        partialRoot: './resources/partials',    // default partial path
        layoutRoot: './resources/layouts',    // default partial path
        minify: {
            removeComments: true
        }
    })
    .webpackConfig({
        plugins: [
            // Создаем svg-спрайт с иконками
            new SVGSpritemapPlugin(
                'resources/images/icons/*.svg', // Путь относительно каталога с webpack.mix.js
                {
                    // name: 'SVGSpritemapPlugin',
                    output: {
                        filename: 'images/sprite.svg', // Путь относительно каталога public/
                        svg4everybody: false, // Отключаем плагин "SVG for Everybody"
                        svg: {
                            sizes: false // Удаляем инлайновые размеры svg
                        },
                        chunk: {
                            keep: true, // Включаем, чтобы при сборке не было ошибок из-за отсутствия spritemap.js
                        },
                        svgo: {
                            plugins: [
                                {
                                    name: 'removeAttrs',
                                    params: {
                                        attrs: '(fill|stroke|style|color)',
                                    },
                                },
                            ]
                        },
                    },
                    sprite: {
                        prefix: '', // Префикс для id иконок в спрайте, будет иметь вид 'icon-имя_файла_с_иконкой'
                        generate: {
                            title: false, // Не добавляем в спрайт теги <title>
                        },
                    },
                }
            ),
        ],
    })

// Add source map and versioning to assets in production environment.
if (mix.inProduction()) {
    mix.sourceMaps().version();
}

// Image Optimization

// SVG Sprites

// Fonts generate

// Zip

// Deployment
