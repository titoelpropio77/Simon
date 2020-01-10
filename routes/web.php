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

Route::get('/home', 'HomeController@index')->name('home');
