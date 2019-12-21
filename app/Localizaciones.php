<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;
class Localizaciones extends Model
{
    protected $table = 'aux_localizaciones';
    protected $fillable = [
        'locCodigo',
        'locNombre',
        'lTipId',
        'locPadre'
    ];
    public static function  localizacionPadre( $idPadre, $tipo )
    {

        $result = DB::select( 'SELECT
        aux_localizaciones.id,
        aux_localizaciones.locNombre,
        localizacion.locPadre,
        aux_localizaciones.locPadre,
        IF (aux_localizaciones.id = ' . $idPadre . ', 1, 2) AS orden
        FROM
        aux_localizaciones
            right join ( select locPadre,id from aux_localizaciones where id= ' . $idPadre . ' ) as localizacion
            on  aux_localizaciones.locPadre = localizacion.locPadre
        ORDER BY
            `orden` ASC
        ' );
        return $result;
    }
    public static function localizacionByIdAndFatherId( $id, $fatherId )
    {
        $result = DB::select( 'SELECT *,if( id = ' . $id . ',1,2 )as orden from aux_localizaciones where locPadre=' . $fatherId . ' order by orden' );
        return $result;
    }
}
