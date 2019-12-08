const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react( 'resources/js/components/modulo/index.js', 'public/js/modulo.js' )
.react( 'resources/js/components/alerts.js', 'public/js/plugins/alerts.js' )
.react( 'resources/js/components/perfil/perfil.js', 'public/js/perfil.js' )
.react( 'resources/js/components/objeto/objeto.js', 'public/js/objeto.js' )
.react( 'resources/js/components/perfil_objeto/perfil_objeto.js', 'public/js/perfil_objeto.js' )
   .sass('resources/sass/app.scss', 'public/css');
