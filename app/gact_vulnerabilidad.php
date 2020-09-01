<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use DB;
class gact_vulnerabilidad extends Model
{
	 use SoftDeletes;
    protected $table = 'gact_vulnerabilidades';
    //private $prex = 'proc_';
    protected $fillable = [
    	'id',
        'vul_nombre',
        'ame_id',
    ];

    public function vulnerabilidades()
    {
        // return $this->hasMany('App/Macro', 'proc_macroproceso_id');
        return $this->belongsTo(gact_vulnerabilidad::class, 'id');
    }

    public function getVulnerabilidadAll($idAmenaza){
        $query = "select gact_vulnerabilidades.id,vul_nombre,ame_id,gact_amenazas.ame_nombre from `gact_vulnerabilidades`, `gact_amenazas` WHERE gact_vulnerabilidades.ame_id=gact_amenazas.id AND gact_amenazas.id=".$idAmenaza;
        $result = DB::Select($query);
        return $result;
    }

    protected $dates = ['deleted_at'];
}

// $query = "select gact_vulnerabilidades.id,vul_nombre,ame_id,gact_amenazas.ame_nombre from `gact_vulnerabilidades`, `gact_amenazas` WHERE gact_vulnerabilidades.ame_id=gact_amenazas.id AND gact_amenazas.id=2";


