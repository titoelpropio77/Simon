<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use DB;
class Confinaciamiento extends Model
{
    use SoftDeletes;
    protected $table = 'proyconvfinanciamiento';

    protected $fillable = [
        'id',
        'pryId',
        'instId',
        'tdocId',
        'convNombre',
        'fechaFirma',
        'fechaConclusion',
        'convMonto',
        'convVigencia',
        'convPath',
    ];
    public function proyecto()
    {
        return $this->belongsTo( '\App\Proyecto', 'pryId' );
    }
    public function institucional()
    {
        return $this->belongsTo( '\App\Institucional', 'instId' );
    }
    public function tipoDocumento()
    {
        return $this->belongsTo( '\App\TipoDocumento', 'tdocId' );
    }
    /**
     * Retor una lista de la relacion entre proyconvfinanciamiento y csfsegfinaciero
     * {id} id del confinaciador
    */
    public static function getEstructFinanByCofinaciadorId( $id = 0 )
    {
        $query  = " SELECT
                        *
                    FROM
                        proyconvfinanciamiento,
                        csfsegfinaciero
                    WHERE
                        proyconvfinanciamiento.id = csfsegfinaciero.cofinaciadorId ";
        if  ( $id != 0 )
        {
            $query .= " AND proyconvfinanciamiento.id = " . $id;
        }

        $result = DB::select( $query );
        return $result;
    }
}
