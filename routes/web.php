<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('layout.inicio', ['urlForm' => '']);
});

Auth::routes();

// Route::group(['middleware' => ['auth:web']], function ()
// {
//Modulo
Route::resource('modulo','ModuloController');
Route::post('getModuloAll',[ 'uses'=>'ModuloController@getModuloAll' ]);
// });
//Perfil
Route::resource('perfil','PerfilController');
Route::post('getPerfilAll',[ 'uses'=>'PerfilController@getPerfilAll']);

//Objeto
Route::resource('objeto','ObjetoController');
Route::post('getObjetoDataTable', [ 'uses'=>'ObjetoController@getObjetoDataTable']);
Route::post('getModuloAllForObjeto', [ 'uses'=>'ObjetoController@getModuloAll']);
//perfilObjeto
Route::resource('perfilobjeto','PerfilObjetoController');
Route::post('getPerfilObjetoDataTable',[ 'uses'=>'PerfilObjetoController@getPerfilObjetoDataTable']);
Route::post('getObjetoByPerfilId',[ 'uses'=>'PerfilObjetoController@getObjetoByPerfilId']);

//Usuario
Route::resource('usuario','UserController');
Route::post('getUsersDataTable',[ 'uses'=>'UserController@getUsersDataTable']);
Route::post('getPerfilAllForUser',[ 'uses'=>'UserController@getPerfilAllForUser']);
Route::post('getLicAllForUser',[ 'uses'=>'UserController@getLicAllForUser']);

//Proyecto
Route::resource( 'proyecto', 'ProyectoController' );
Route::post('getProyectoDataTable',[ 'uses'=>'ProyectoController@getDataTable']);
Route::post('getSectorAllForProyect',[ 'uses'=>'ProyectoController@getSectorAllForProyect']);
Route::post('getDepartamentoAllForProyecto',[ 'uses'=>'ProyectoController@getDepartamentoAllForProyecto']);
Route::post('getProviciasByDepartamentoId',[ 'uses'=>'ProyectoController@getProviciasByDepartamentoId']);
Route::post('getSectorialByCodigo',[ 'uses'=>'ProyectoController@getSectorialByCodigo']);
Route::get( 'exportReportProyect', 'ProyectoController@exportReportProyect' );
Route::get( 'exportReportProyByType/{id}/{type}', 'ProyectoController@exportReportProyByType' );

//proyecto Localizacion
Route::resource( 'proyectoLocalizacion', 'ProyectoLocalizacionController' );
Route::post('getLocalitationByProyectoId',[ 'uses'=>'ProyectoLocalizacionController@getLocalitationByProyectoId']);

//proyecto confinaciadores
Route::resource( 'confinaciamiento', 'ConfinaciamientoController' );
Route::post('getAllTypeDocumentForConfinaciamiento',[ 'uses'=>'ConfinaciamientoController@getAllTypeDocumentForConfinaciamiento']);
Route::post('getInstitucionAllForConfinaciamiento',[ 'uses'=>'ConfinaciamientoController@getInstitucionAllForConfinaciamiento']);
Route::post('getAllConfinaciadoresByProy',[ 'uses'=>'ConfinaciamientoController@getAllConfinaciadoresByProy']);
Route::post('confinaciamientoUpdate',[ 'uses'=>'ConfinaciamientoController@confinaciamientoUpdate']);
Route::get( 'dowloadFieldCofinaciadores/{id}', 'ConfinaciamientoController@dowloadFieldCofinaciadores' );

/// Componente
Route::resource( 'componente', 'ComponenteController' );
Route::post( 'getComponentesByProyecto', [ 'uses'=>'ComponenteController@getComponentesByProyecto'] );
Route::post( 'getHitosByIdComponente', [ 'uses'=>'ComponenteController@getHitosByIdComponente'] );
Route::post( 'getIndicadoresAllForProyect', [ 'uses'=>'ComponenteController@getIndicadoresAllForProyect'] );


//indicadores
Route::resource( 'indicadores', 'AuxIndicadoresController' );

//Componente Indicadores
Route::resource( 'compIndicadores', 'CompIndicadoresController' );

//Estructura Financiamiento
Route::resource( 'estructuraFinanciamiento', 'EstruturaFinanciamientoController' );
Route::post( 'getListClaPresupuestario', [ 'uses'=>'EstruturaFinanciamientoController@getListClaPresupuestario'] );
Route::post( 'getEFByProyecto', [ 'uses'=>'EstruturaFinanciamientoController@getEFByProyecto'] );

//Macro Proceso
Route::resource( 'macro', 'MacroprocesoController' );
Route::post('getMacroAll',[ 'uses'=>'MacroprocesoController@getDataTable']);


Route::get('/home', 'HomeController@index')->name('home');

//cliente
Route::resource( 'gactProceso', 'GAct_ProcesoController' );
Route::post('getGactProcesoAll',[ 'uses'=>'GAct_ProcesoController@getDataTable']);
Route::post('getMacroProceso',[ 'uses'=>'GAct_ProcesoController@getMacroProceso']);

//Gestion de activos Matriz de Riezgo
Route::resource( 'matriezgo', 'GAct_MatrizRController' );
Route::post('getMatrizRiezgoAll',[ 'uses'=>'GAct_MatrizRController@getDataTable']);

//Gestion de activos Zonas
Route::resource( 'gactZona', 'GAct_ZonasController' );
Route::post('getZonaAll',[ 'uses'=>'GAct_ZonasController@getDataTable']);

//Gestion de activos Tipos de activos
Route::resource( 'tipoactivo', 'GAct_Tipo_ActivosController' );
Route::post('getTipoActivoAll',[ 'uses'=>'GAct_Tipo_ActivosController@getDataTable']);

//Gestion de activos Clasificacion
Route::resource( 'clasificacion', 'GAct_ClasificacionController' );
Route::post('getClasificacionAll',[ 'uses'=>'GAct_ClasificacionController@getDataTable']);

//Gestion de activos Amenazas
Route::resource( 'amenazas', 'GAct_AmenazasController' );
Route::post('getAmenazasAll',[ 'uses'=>'GAct_AmenazasController@getDataTable']);

//Getion de activos Vulnerabilidades
Route::resource( 'vulnerabilidad', 'GAct_VulnerabilidadController' );
Route::post('getVulnerabilidadAll',[ 'uses'=>'GAct_VulnerabilidadController@getDataTable']);

