<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EstructuraFinanciamientoDetalle extends Model
{
    protected $table = 'csfsegfinaciero';
    protected $fillable = [
        'esfId',
        // 'cmpId',
        // 'presupId',
        // 'instId',
        'cofinaciadorId',
        'monto'
    ];
    public function confinaciadores()
    {
        return $this->hasMany( 'App\Confinaciamiento', 'instId' );
    }


}
