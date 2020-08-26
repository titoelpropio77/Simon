<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use DB;
class Macro extends Model
{
	 use SoftDeletes;
    protected $table = 'gact_macroprocesos';
    //private $prex = 'proc_';
    protected $fillable = [
    	'id',
        'macpro_nombre',
        'macpro_descripcion',
    ];

    public function macroproceso()
    {
        // return $this->hasMany('App/Macro', 'proc_macroproceso_id');
        return $this->belongsTo(Macro::class, 'proc_macroproceso_id');
    }

    public function getAllMacroProceso(){
        $query = "select * from gact_macroprocesos ";
        $result = DB::Select($query);
        return $result;
    }

    protected $dates = ['deleted_at'];
}


