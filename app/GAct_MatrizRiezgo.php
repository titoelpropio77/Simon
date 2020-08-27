<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use DB;
class GAct_MatrizRiezgo extends Model
{
	 use SoftDeletes;
    protected $table = 'gact_matrizriesgo';
    protected $fillable = [
        'nivel',
        'sigla',
        'valor_inicial',
        'valor_final',
    ];

    public function matriz()
    {
        return $this->belongsTo(Macro::class, 'nivel');
    }

    public function getAllMacroProceso(){
        $query = "select * from gact_matrizriesgo";
        $result = DB::Select($query);
        return $result;
    }

    protected $dates = ['deleted_at'];
}
