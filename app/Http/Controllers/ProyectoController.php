<?php

namespace App\Http\Controllers;

use App\Proyecto;
use App\ClaSectorial;
use Illuminate\Http\Request;
use DataTables;
use DB;
use App\User;
use App\Localizaciones;
use App\Componente;
use App\ProyectoLocalizacion;
use App\CompIndicadores;

class ProyectoController extends Controller
{
    private $url = "proyecto";
    public function __construct()
   {
       parent::__construct();
       $this->class = new Proyecto();
       $this->puedeVisionar( $this->url);
   }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view( 'proyecto.index', ['urlForm' => $this->url] );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view( 'proyecto.create', ['urlForm' => $this->url, 'proyectoId' => 0] );
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
            $myDateTime = \DateTime::createFromFormat('d/m/Y', $request->fechaInicio);
            $fechaInicio = $myDateTime->format('Y-m-d');
            $create = $this->class::create(
                [
                    'licId' => auth()->user()->lic_id,
                    'funId' => $request->funcId,
                    'pryNombre' => $request->nombreProy,
                    'pryCodSisin' => $request->codSinSin,
                    'fechAprobacion' => $fechaInicio,
                    'fechAprobacion' => $fechaInicio,
                    'sectId' => $request->sectorId,
                    "montoTotal" => $request->montoTotalComprometido,
                    'fechInicProgramada' => $fechaInicio,
                    'duracion' => $request->duracionMes,
                    'pryDescripcion' => $request->descripcion,
                    'message_localizacion' => 'Falta Agregar Localizaciones',
                    'message_cofinaciadores' => 'Falta Agregar Cofinaciadores',
                    'message_componente'  => 'Falta Agregar Componentes',
                    'message_estructura_financiamiento'=>  'Falta Agregar Estructura Financiamiento',
                    'status' => 'Incompleto',
                ]
            );
            $result[ 'data' ][ 'id' ] = $create[ 'id' ];
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
     * @param  \App\Proyecto  $proyecto
     * @return \Illuminate\Http\Response
     */
    public function show($proyecto)
    {
        return view( 'proyecto.create', ['urlForm' => $this->url,'proyectoId' => $proyecto ] );
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Proyecto  $proyecto
     * @return \Illuminate\Http\Response
     */
    public function edit( $proyecto)
    {
        if (!$this->verifyPermission('puedeModificar'))
        return response()->json( ['status'=>false, 'message' => 'No puede realizar esta transacción' ]  );
        try {
            $clientList = $this->class::select(DB::raw('*,DATE_FORMAT(fechAprobacion, "%d/%m/%Y") as fechAprobacion' ))->find($proyecto);
            $sectorial = ClaSectorial::getSectorAndSubSectorAndTipo($clientList->sectId);
            $result[ 'data' ] = $clientList;
            $result[ 'data' ][ 'sectorial' ] = $sectorial;
            $result[ 'data' ][ 'subSector' ] = $this->getSubSectorAndTipo( 'sector', $sectorial[ 'Sector' ]->Sector );
            $result[ 'data' ][ 'tipoProyecto' ] = $this->getSubSectorAndTipo( 'subSector', $sectorial[ 'Sector' ]->Sector , $sectorial[ 'subSector' ]->subSector );
            $result[ 'status' ] = true;
        } catch (Exception $e) {
            $result[ 'status' ] = false;
            $result[ 'message' ] = $e->getMessage();
        }
        return response()->json( $result );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Proyecto  $proyecto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if (!$this->verifyPermission('puedeModificar'))
        return response()->json( ['status'=>false, 'message' => 'No puede realizar esta transacción' ]  );

        $result['status'] = true;
        $result['message'] = 'Modificado Correctamente';
        try {

            DB::beginTransaction();
            $myDateTime = \DateTime::createFromFormat('d/m/Y', $request->fechaInicio);
            $fechaInicio = $myDateTime->format('Y-m-d');
            $typeRooms = $this->class::findOrFail($id);
             $typeRooms->update( [
                'licId' => auth()->user()->lic_id,
                'funId' => $request->funcId,
                'pryNombre' => $request->nombreProy,
                'pryCodSisin' => $request->codSinSin,
                'fechAprobacion' => $fechaInicio,
                'fechAprobacion' => $fechaInicio,
                'sectId' => $request->sectorId,
                'fechInicProgramada' => $fechaInicio,
                'duracion' => $request->duracionMes,
                'pryDescripcion' => $request->descripcion,
            ] );
            $result[ 'data' ][ 'id' ] = $id;
            DB::commit();
        } catch (Exception $e) {
            $result['status'] = false;
            $result['message'] = $e->getMessage();
            DB::rollBack();
        }
        return response()->json( $result );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Proyecto  $proyecto
     * @return \Illuminate\Http\Response
     */
    public function destroy( $proyecto)
    {
        if (!$this->verifyPermission('puedeEliminar'))
        return response()->json( ['status'=>false, 'message' => 'No puede realizar esta transacción' ]  );
        try {
            $perfil = $this->class::findOrFail($proyecto);
            $perfil->delete();
            $result['status'] = true;
            $result['message'] = 'Eliminado Correctamente';
        } catch (Exception $e) {

            $result['status'] = false;
            $result['message'] = $e->getMessage();
        }
        return response()->json($result);
    }
    public function getSectorAllForProyect(Request $request)
    {
        $result[ 'status' ] =true;
        $result[ 'data' ]['sector'] =
        ClaSectorial::select('denominacion', 'id','Sector')->where([
                                ['sector' ,'<>', '0'],
                                ['subsector' ,'=', '0'],
                                ['tipo' ,'=', '0'],
                            ])->get();
        $userId = $request->proyectoId  ? $this->class::find($request->proyectoId)->funId : auth()->user()->id;
        $result[ 'data' ][ 'funcionario' ] = DB::select( 'SELECT * FROM users where lic_id=' .  auth()->user()->lic_id . ' ORDER BY FIELD (id,' . $userId . ') DESC;' );
        return response()->json($result);
    }
    public function getDataTable(Request $request)
    {
        if ($request->ajax()) {
            $data = Proyecto::All();
            return DataTables::of($data)
                    ->addIndexColumn()
                    // ->addColumn('action', function($row){

                    //        $btn = '<a href="javascript:void(0)" class="edit btn btn-primary btn-sm">View</a>';

                    //         return $btn;
                    // })
                    // ->rawColumns(['action'])
                    ->make(true);

        }
        // $result['data'] = $this->class::with('modulo')->get();

    }
    public function getDepartamentoAllForProyecto( Request $request )
    {
        $result[ 'data' ] = Localizaciones::where('locPadre',0)->get();
        $result[ 'status' ] = true;
        return response()->json( $result );
    }
    public function getProviciasByDepartamentoId( Request $request )
    {
        $result[ 'data' ] = Localizaciones::where('locPadre',$request->id)->get();
        $result[ 'status' ] = true;
        return response()->json( $result );
    }
    public function getSectorialByCodigo( Request $request )
    {
        if( $request->nameObj == "sector" )
        {
            $result[ 'data' ] = $this->getSubSectorAndTipo( $request->nameObj, $request->sector );
        }else
        {
            $result[ 'data' ] = $this->getSubSectorAndTipo( $request->nameObj, $request->sector, $request->subSector );
        }

        $result[ 'status' ] = true;
        return response()->json( $result );
    }
    /**
     * retorna de la tabla aux_sectorial dado un filtro de parametros por entrada
     */
    public function getSubSectorAndTipo( $nameObj, $sector, $subSector = 0  )
    {
        if( $nameObj == "sector" )
        {
            $result = ClaSectorial::select('denominacion', 'id', 'subSector')->where([
                ['subsector' ,'<>', '0'],
                ['tipo' ,'=', '0'],
                ['Sector' ,'=', $sector],
            ])->get();
        }else
        {
            $result = ClaSectorial::select('denominacion', 'id', 'tipo')->where([
                ['subsector' ,'=', $subSector],
                ['tipo' ,'<>', '0'],
                ['Sector' ,'=', $sector],
            ])->get();
        }
        return $result ;
    }

    public function exportReportProyect()
    {
        $pdf = \PDF::loadView('Reportes.reportProyecto');
        // $pdf->save(storage_path().'_filename.pdf')
        return $pdf->download('customers.pdf');
    }
    public function exportReportProyByType($proyectoId, $type)
    {
        $proyecto = $this->class::where('id',$proyectoId)->with('users')->first();
        // echo json_encode($proyecto);
        // return response()->json($proyecto);
        if( $proyecto )
        {
            switch( $type )
            {
                case  'datosGenerales' :
                    $pdf = \PDF::loadView('Reportes.report_proy_datos_generales', compact( 'proyecto' ))->setPaper('a4', 'landscape');;
                    return   $pdf->stream();
                break;
                case  'localizacion' :
                    $proyectoLocalizacion = ProyectoLocalizacion::getProyectoLocalizacionByProyId( $proyectoId );
                    // echo json_encode( $proyectoLocalizacion );
                    // exit;
                //  return view( 'Reportes.report_proy_localizacion', compact( 'proyecto',  'proyectoLocalizacion' ) );

                    $pdf = \PDF::loadView('Reportes.report_proy_localizacion', compact( 'proyecto',  'proyectoLocalizacion'))->setPaper('a4', 'landscape');;
                    return   $pdf->stream();
                break;
                case  'componentes' :
                    $componentes = Componente::where( 'pryId', $proyectoId )->get();
                    foreach ( $componentes as $key => $value )
                    {

                            $componentes[ $key ][ 'hitos' ] = json_decode(json_encode( CompIndicadores::where( 'cmpId', $value->id )->with( 'auxIndicadores' )->get())) ;

                    }
                //    echo json_encode( $componentes[0]->hitos[0]->aux_indicadores->id );
                //     exit;

                //  return view( 'Reportes.report_proy_componentes', compact( 'proyecto', 'componentes' ) );
                    $pdf = \PDF::loadView( 'Reportes.report_proy_componentes' ,compact( 'proyecto', 'componentes'))->setPaper('a4', 'landscape');
                    return   $pdf->stream();
                break;

            }
        }
        return "<h1>No existe ningun proyecto con esos datos</h1>";

    }
}
