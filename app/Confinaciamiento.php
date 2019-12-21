<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Confinaciamiento extends Model
{
    protected $table = 'proyconvfinanciamiento';

    protected $fillable = [
        'id',
        'pryId',
        'instId',
        'tdocId',
        'convNombre',
        'fechaFirma',
        'fechaConclusion',
        'convMonto',
        'convVigencia',
        'convPath',
    ];
    public function proyecto()
    {
        return $this->belongsTo( '\App\Proyecto', 'pryId' );
    }
    public function institucional()
    {
        return $this->belongsTo( '\App\Institucional', 'instId' );
    }
    public function tipoDocumento()
    {
        return $this->belongsTo( '\App\TipoDocumento', 'tdocId' );
    }
}
