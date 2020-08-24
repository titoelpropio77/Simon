<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use DB;
class GAct_Proceso extends Model
{
    use SoftDeletes;
    protected $table = 'gact_procesos';
    private $prex = 'proc_';
    protected $fillable = [
    	'proc_nombre',
    	'proc_grado_automatizacion',
    	'proc_grado_descentralizacion',
    	'proc_periodo_ejecucion',
    	'proc_reponsable_revision',
    	'proc_reponsable_ejecucion',
    	'proc_macroproceso_id',
    ];
    public function macros()
    {
        return $this->belongsTo(Macro::class, 'proc_macroproceso_id');
    }
    public function getAllMacroProceso(){
        $query = "select * from gact_macroprocesos ";
        $result = DB::Select($query);
        return $result; 
    }
    protected $dates = ['deleted_at'];
}
