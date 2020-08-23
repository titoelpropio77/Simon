<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Macro extends Model
{
	 use SoftDeletes;
    protected $table = 'gact_macroprocesos';
    protected $fillable = [
    	'id',
        'macpro_nombre',
        'macpro_descripcion'
    ];
    public function users()
    {
    	$this->hasMany('App/User', 'idPerfil');
    }
    protected $dates = ['deleted_at'];
}
