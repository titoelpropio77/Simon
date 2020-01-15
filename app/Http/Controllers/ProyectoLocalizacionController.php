<?php

namespace App\Http\Controllers;
use App\Proyecto;
use App\ProyectoLocalizacion;
use App\Localizaciones;
use Illuminate\Http\Request;
use DB;

class ProyectoLocalizacionController extends Controller
{
    private $url = "proyecto";
    public function __construct()
    {
        parent::__construct();
        $this->class = new ProyectoLocalizacion();
        $this->puedeVisionar( $this->url);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (!$this->verifyPermission('puedeGuardar'))
        return response()->json( ['status'=>false, 'message' => 'No puede realizar esta transacción' ]  );

        try {
            DB::beginTransaction();
            $result['status'] = true;
            $result['message'] = 'Guardado Correctamente';
            $data = $request->all();
            $proyectoId = $data[ 'proyectoId' ];
            foreach ( $data[ 'maskField']   as $key => $localidad )
            {
                // echo json_encode( $localidad['localidad'][0]);
                // exit    ;
                $localidadId = $localidad['localidad']['value'];
                if( $localidadId )
                {

                    if( !$localidad[ 'id' ] )
                    {
                    $this->class::create(
                        [
                            'pryId' => $proyectoId  ,
                            'locid' => $localidadId
                        ]
                    );
                    if( $key == 0 )
                    {
                        Proyecto::updateStatusProyect( $proyectoId, [ 'message_localizacion' => '']  );
                    }

                    }
                    else
                    {
                        $typeRooms = $this->class::findOrFail( $localidad[ 'id' ] );
                        $typeRooms->update([
                            'locid' => $localidadId
                        ]);
                    }
                }
            }

            DB::commit();

        } catch (Exception $e) {
            $result['status'] = false;
            $result['message'] = $e->getMessage();
            DB::rollBack();
        }
        return response()->json( $result );

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ProyectoLocalizacion  $proyectoLocalizacion
     * @return \Illuminate\Http\Response
     */
    public function show(ProyectoLocalizacion $proyectoLocalizacion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ProyectoLocalizacion  $proyectoLocalizacion
     * @return \Illuminate\Http\Response
     */
    public function edit(ProyectoLocalizacion $proyectoLocalizacion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ProyectoLocalizacion  $proyectoLocalizacion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProyectoLocalizacion $proyectoLocalizacion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ProyectoLocalizacion  $proyectoLocalizacion
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProyectoLocalizacion $proyectoLocalizacion)
    {
        //
    }

    public function getLocalitationByProyectoId( Request $request )
    {
        $resultLocalizacion = $this->class::with( 'localizacion' )->where( 'pryId', $request->proyectoId )->get();
        $result['data'] = $this->class::getProyectoLocalizacionByProyId($request->proyectoId)  ;
        $result[ 'status' ] = true;
        return $result;
    }
}
