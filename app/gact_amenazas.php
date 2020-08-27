<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use DB;
class gact_amenazas extends Model
{
	 use SoftDeletes;
    protected $table = 'gact_amenazas';
    //private $prex = 'proc_';
    protected $fillable = [
    	'id',
        'ame_nombre',
    ];

    public function amenazas()
    {
        // return $this->hasMany('App/Macro', 'proc_macroproceso_id');
        return $this->belongsTo(GAct_Zonas::class, 'amenazas_id');
    }

    public function getAllMacroProceso(){
        $query = "select * from gact_amenazas";
        $result = DB::Select($query);
        return $result;
    }

    protected $dates = ['deleted_at'];
}


