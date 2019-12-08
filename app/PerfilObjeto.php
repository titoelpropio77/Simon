<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use DB;
class PerfilObjeto extends Model
{
     use SoftDeletes;
    protected $table = 'sec_perfilobjetos';
    protected $fillable = [
    	'id',
    	'idPerfil',
    	'idObjeto',
    	'puedeGuardar',
    	'puedeModificar',
    	'puedeEliminar',
    	'puedeListar',
    	'puedeVerReporte',
    	'puedeImprimir'
    ];
    public static function getPermissionByIdPerfil( $id )
    {
     return  DB::select('select sec_objetos.visibleEnMenu, sec_objetos.urlObjeto,sec_objetos.idModulo,sec_perfilobjetos.id,
     sec_objetos.nombre, sec_perfilobjetos.puedeGuardar as puedeGuardar, sec_perfilobjetos.puedeModificar,
     sec_perfilobjetos.puedeEliminar,sec_perfilobjetos.puedeListar,sec_perfilobjetos.puedeVerReporte,sec_perfilobjetos.puedeImprimir
      from sec_perfilobjetos,sec_perfil,sec_objetos where sec_objetos.deleted_at IS NULL and  sec_perfilobjetos.deleted_at IS NULL and sec_perfil.id=sec_perfilobjetos.idPerfil and sec_perfilobjetos.idObjeto=sec_objetos.id and sec_perfil.id ='.$id);
    }
    public function objeto()
    {
        return $this->belongsTo('\App\Objeto', 'idObjeto');
    }
     protected $dates = ['deleted_at'];
}
