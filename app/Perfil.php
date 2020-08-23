<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Perfil extends Model
{
	use SoftDeletes;
    protected $table = 'sec_perfil';
    protected $fillable = [
    	'id',
    	'nombre'
    ];
    public function users()
    {
    	$this->hasMany('App/User', 'idPerfil');
    }
    protected $dates = ['deleted_at'];
}
