<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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
}
