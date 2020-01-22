<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;
class Componente extends Model
{
    protected  $table = 'proycomponentes';
    protected $fillable = [
        'pryId',
        'cmpNombre',
        'fechaInicio',
        'fechaConclusion',
        'duracionDias',
        'cmpMonto',
        'cmpTipoEjecucion'
    ];
    public function hitos()
    {
        return $this->hasMany( '\App\CompIndicadores', 'cmpId' );
    }
    /**
     * Retor una lista de la relacion entre proyconvfinanciamiento y csfsegfinaciero
     * {id} id del confinaciador
     * {proyectoId} id del proeycto
    */
    public static function getEstructFinanByCompIdAndProyId( $id = 0 , $proyectoId = 0)
    {
        $query  = " SELECT
                      *
                    FROM
                        proyconvfinanciamiento,
                        csfsegfinaciero,
                        encsegfinanciero
                    WHERE
                        proyconvfinanciamiento.id = csfsegfinaciero.cofinaciadorId
                    and encsegfinanciero.id = csfsegfinaciero.esfId ";
        if  ( $id != 0 )
        {
            $query .= " AND  encsegfinanciero.cmpId =" . $id;
        }

        if  ( $proyectoId != 0 )
        {
            $query .= " AND  encsegfinanciero.pryId =" . $proyectoId;
        }

        $result = DB::select( $query );
        return $result;
    }
}
