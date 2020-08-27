<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use DB;
class GAct_Zonas extends Model
{
	 use SoftDeletes;
    protected $table = 'gact_zonas';
    //private $prex = 'proc_';
    protected $fillable = [
    	'id',
        'zona_nombre',
    ];

    public function zonas()
    {
        // return $this->hasMany('App/Macro', 'proc_macroproceso_id');
        return $this->belongsTo(GAct_Zonas::class, 'zonas_id');
    }

    public function getAllMacroProceso(){
        $query = "select * from gact_zonas";
        $result = DB::Select($query);
        return $result;
    }

    protected $dates = ['deleted_at'];
}


