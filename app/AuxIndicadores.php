<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AuxIndicadores extends Model
{
    protected $table = "aux_indicadores";
    protected $fillable = [
        'id',
        'indNombre',
        'indUnidad'
    ];
}
