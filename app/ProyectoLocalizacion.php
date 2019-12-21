<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProyectoLocalizacion extends Model
{
    protected $table = "proylocalizacion";
    protected $fillable = [
        'id',
        'pryId',
        'locid'
    ];
    public function localizacion()
    {
        return $this->belongsTo( '\App\Localizaciones', 'locid' );
    }
}
