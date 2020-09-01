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

//Gestion Activos Matriz de Riezgo
.react('resources/js/components/gact_matrizriezgo/gact_matrizriezgo.js','public/js/gact_matrizriezgo.js')

//Gestion Activos Zonas
.react('resources/js/components/gact_zonas/gact_zonas.js','public/js/gact_zonas.js')

//Gestion Clasificacion
.react('resources/js/components/gact_clasificacion/gact_clasificacion.js','public/js/gact_clasificacion.js')

//Gestion Activos Tipos Activos
.react('resources/js/components/gact_tipo_activo/gact_tipo_activo.js','public/js/gact_tipo_activo.js')

//Gestion Activos Amenazas
.react('resources/js/components/gact_amenazas/gact_amenazas.js','public/js/gact_amenazas.js')

//Gestion de Activos Vulnerabilidad
.react('resources/js/components/gact_vulnerabilidad/gact_vulnerabilidad.js','public/js/gact_vulnerabilidad.js')


.sass('resources/sass/app.scss', 'public/css');
