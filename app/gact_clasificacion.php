<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use DB;
class gact_clasificacion extends Model
{
	 use SoftDeletes;
    protected $table = 'gact_clasificacion';
    //private $prex = 'proc_';
    protected $fillable = [
    	'id',
        'clasif_nombre',
        'clasifi_descripcion',
    ];

    public function macroproceso()
    {
        // return $this->hasMany('App/Macro', 'proc_macroproceso_id');
        return $this->belongsTo(gact_clasificacion::class, 'clasificacion_id');
    }

    public function getAllMacroProceso(){
        $query = "select * from gact_clasificacion ";
        $result = DB::Select($query);
        return $result;
    }

    protected $dates = ['deleted_at'];
}


