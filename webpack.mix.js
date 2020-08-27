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
.react( 'resources/js/components/usuario/usuario.js', 'public/js/usuario.js' )
.react( 'resources/js/components/perfil_objeto/perfil_objeto.js', 'public/js/perfil_objeto.js' )
//proyecto
.react( 'resources/js/components/proyecto/proyecto.js', 'public/js/proyecto.js' )
.react( 'resources/js/components/proyecto/proyecto.create.js', 'public/js/proyecto.create.js' )
//cliente
.react('resources/js/components/gact_proceso/gact_proceso.js', 'public/js/gact_proceso.js')

//Macro Proceso
.react('resources/js/components/macro/macro.js','public/js/macro.js')
//Activo 
.react('resources/js/components/gact_activo/gact_activo.js','public/js/gact_activo.js')

.sass('resources/sass/app.scss', 'public/css');
