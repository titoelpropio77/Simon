<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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
            'pryDescripcion',
    ];

    protected $dates = ['deleted_at'];
}
