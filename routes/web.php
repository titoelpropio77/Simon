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


Route::get('/home', 'HomeController@index')->name('home');
