<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Database\Eloquent\SoftDeletes;
class Objeto extends Model
{
    use SoftDeletes;
    protected $table = 'sec_objetos';
    protected $fillable = [
    	'id',
    	'nombre',
    	'urlObjeto',
    	'visibleEnMenu',
    	'idModulo'
    ];
    protected $dates = ['deleted_at'];

    public function modulo(){
    	return $this->belongsTo(Modulo::class, 'idModulo');
    }
    public static function objetosPerfilNotExitById( $idPerfil )
    {
         $query ="SELECT *FROM sec_objetos WHERE (NOT EXISTS(SELECT * FROM sec_perfilobjetos,sec_perfil WHERE sec_perfilobjetos.deleted_at IS NULL and sec_objetos.id=sec_perfilobjetos.idObjeto AND sec_perfil.id=sec_perfilobjetos.idPerfil AND sec_objetos.deleted_at IS NULL AND sec_perfilobjetos.idPerfil=".$idPerfil."))";
        return DB::select( $query );
    }
    public static function getAllObjForMenuSinModuloByIdPerfil (  $idPerfil  )
    {
        $query ="
        SELECT
                sec_objetos.id,
                sec_objetos.nombre,
                sec_objetos.visibleEnMenu,
                sec_objetos.urlObjeto
            FROM

                sec_objetos,
                sec_perfilobjetos
            WHERE
                sec_perfilobjetos.deleted_at IS NULL
                 AND sec_objetos.id = sec_perfilobjetos.idObjeto
                AND sec_perfilobjetos.idPerfil = ".$idPerfil."
                and sec_perfilobjetos.puedeListar = 1
                and sec_objetos.idModulo= 0
        ";
        return DB::select( $query );
    }
   }
