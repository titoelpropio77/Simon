<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Database\Eloquent\SoftDeletes;
class Modulo extends Model
{
    use SoftDeletes;
      protected $table = 'sec_modulos';
    protected $fillable = [
    	'id',
        'nombre'
    ];
    public function objeto()
    {
    	$this->hasMany(Objeto::class, 'idModulo');
    }

    public static function getAllModuloByIdPerfil( $idPerfil )
    {
    	$query = 'SELECT
    					sec_modulos.id,
						sec_modulos.nombre,
                        sec_objetos.visibleEnMenu,
                        sec_perfilobjetos.puedeListar
					FROM
						sec_modulos,
						sec_objetos,
						sec_perfilobjetos
					WHERE
                         sec_modulos.id = sec_objetos.idModulo
					AND sec_objetos.id= sec_perfilobjetos.idObjeto
                    and sec_objetos.visibleEnMenu = "SI"
					AND sec_perfilobjetos.idPerfil = '.$idPerfil.'
					AND sec_perfilobjetos.puedeListar = 1
                    and sec_modulos.deleted_at IS NULL
					GROUP BY sec_modulos.id, sec_modulos.nombre,sec_objetos.visibleEnMenu,sec_perfilobjetos.puedeListar
					ORDER BY sec_modulos.id';
		return DB::select( $query );
    }
}
