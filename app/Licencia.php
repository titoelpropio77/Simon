<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Licencia extends Model
{
    use SoftDeletes;
    protected $table  = 'adm_licencia';
    protected $fillable = [
        'id',
        'licRepLegal',
        'licFecha',
        'licTelefonos',
        'licDireccion',
        'licContacto'

    ];
}
