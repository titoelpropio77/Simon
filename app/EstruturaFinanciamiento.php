<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EstruturaFinanciamiento extends Model
{
    protected $table = 'encsegfinanciero';
    protected $fillable = [
        'pryId',
        'esfFecha',
        'cmpId',
        'presupId',
        'esfTipo',
        'esfConcepto',
        'esfGlosa',
    ];
    /**
     * Obtiene la relacion entre Estructura Financiemiento y Estructura Finacimiento Detalle
     */
    public function EFDetalle()
    {
        return $this->belongsToMany( 'App\Confinaciamiento', 'csfsegfinaciero','esfId' ,'cofinaciadorId'  )->withPivot('monto', 'cmpId','presupId', 'id');;
        // return $this->hasOneThrough( 'App\EstructuraFinanciamientoDetalle', 'App\Confinaciamiento','instId' ,'instId'  );
        // return $this->hasMany( 'App\EstructuraFinanciamientoDetalle','esfId'  );
    }
    public function componente()
    {
        return $this->belongsTo( 'App\Componente', 'cmpId' );
    }
    public function claPresupuestario()
    {
        return $this->belongsTo( 'App\claPresupuestario', 'presupId' );
    }
}
