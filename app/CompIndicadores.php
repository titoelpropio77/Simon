<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CompIndicadores extends Model
{
    protected $table = "cmpindicadores";
    protected $fillable = [
        'id',
        'cmpId',
        'indId',
        'tipo',
        'cantidad',
        'plazoMedirDias'
    ];
    public function auxIndicadores()
    {
        return $this->belongsTo('\App\AuxIndicadores', 'indId');
    }
}
