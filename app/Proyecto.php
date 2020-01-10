<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use DB;
class Proyecto extends Model
{
    use SoftDeletes;
    protected $table = 'proyecto';
    protected $fillable = [
            'id',
            'funId',
            'licId',
            'pryNombre',
            'pryCodSisin',
            'fechAprobacion',
            'sectId',
            'fechInicProgramada',
            'duracion',
            'montoTotal',
            'status',//'Incompleto','Terminado', 'Pendiente', 'Anulado', 'En Proceso'
            'message_status',
            'message_localizacion',
            'message_cofinaciadores',
            'message_componente',
            'message_estructura_financiamiento',
            'pryDescripcion',
    ];
    /**
     * actualiza el estado del proyecto
     * id = id del proyecto a actualizar
     * estado = estado a actualizar
     * message = mensaje del estado
     */
    public static function updateStatusProyect($idProy, $message = [] ,  $estado = 'Incompleto')
    {
        try{
            DB::beginTransaction();
            $update = self::findOrFail( $idProy );
            $update->update(
                $message
            );
            DB::commit();

        }catch( Exception $e  )
        {
            DB::rollBack();

            $result[ 'status' ] = false;
            $result[ 'error' ] = $e->getMessage();
        }
    }
    protected $dates = ['deleted_at'];
}
