<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Localizaciones extends Model
{
    protected $table = 'aux_localizaciones';
    protected $fillable = [
        'locCodigo',
        'locNombre',
        'lTipId',
        'locPadre'
    ];
}
