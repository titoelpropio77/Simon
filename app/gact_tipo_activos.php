<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use DB;
class gact_tipo_activos extends Model
{
	 use SoftDeletes;
    protected $table = 'gact_tipo_activo';
    //private $prex = 'proc_';
    protected $fillable = [
    	'id',
        'tipo_nombre',
        'tipo_descripcion',
    ];

    public function tiposactivos()
    {
        // return $this->hasMany('App/Macro', 'proc_macroproceso_id');
        return $this->belongsTo(Macro::class, 'tiposactivos_id');
    }

    public function getAllMacroProceso(){
        $query = "select * from gact_tipo_activo ";
        $result = DB::Select($query);
        return $result;
    }

    protected $dates = ['deleted_at'];
}


