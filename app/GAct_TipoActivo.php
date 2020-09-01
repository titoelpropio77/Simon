<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GAct_TipoActivo extends Model
{
    use SoftDeletes;
    protected $table = 'gact_tipo_activo';
    protected $fillabled = [
        'tact_nombre',
        'tact_descripcion'
    ];
}
