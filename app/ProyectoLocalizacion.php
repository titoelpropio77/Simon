<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Localizaciones;

class ProyectoLocalizacion extends Model
{
    protected $table = "proylocalizacion";
    protected $fillable = [
        'id',
        'pryId',
        'locid'
    ];
    public function localizacion()
    {
        return $this->belongsTo( '\App\Localizaciones', 'locid' );
    }
    /**
     * retorna todo el arbol de la localizacion
     * proyectoId = id de proyecto
     */
    public static function getProyectoLocalizacionByProyId( $proyectoId )
    {
        $resultLocalizacion = self::with( 'localizacion' )->where( 'pryId', $proyectoId )->get();
        $localidadArray = array();
        $comunidadArray = array();
        foreach( $resultLocalizacion as $localizacion )
        {
            $localidad = Localizaciones::localizacionByIdAndFatherId(  $localizacion[ 'localizacion' ]->id ,$localizacion[ 'localizacion' ]->locPadre );

            $comunidad = Localizaciones::localizacionPadre( $localizacion[ 'localizacion' ]->locPadre, 1 );

            $municipio = Localizaciones::localizacionPadre( $comunidad[0]->locPadre, 1 );

            $provincia = Localizaciones::localizacionPadre( $municipio[0]->locPadre, 1 );

            $ciudad = Localizaciones::localizacionPadre( $provincia[0]->locPadre, 1 );

            array_push( $localidadArray, [ 'id' => $localizacion->id, 'localidadId' => $localizacion->locid ,'localidad' => $localidad, 'comunidad' =>  $comunidad , 'municipio' => $municipio, 'provincia' => $provincia, 'departamento' => $ciudad] );


            array_push( $comunidadArray, [  'nombre' => $localizacion['localizacion']->locNombre, 'id' => $localizacion['localizacion']->id ] );
        }
        return $localidadArray;
    }
}
