<?php

namespace App\Http\Controllers;

use App\Proyecto;
use App\ClaSectorial;
use Illuminate\Http\Request;
use DataTables;
use DB;
use App\Localizaciones;

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
        return view( 'proyecto.create', ['urlForm' => $this->url] );
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
            $this->class::create(
                [
                    'licId' => 1,
                    'funId' => auth()->user()->id,
                    'pryNombre' => $request->nombreProy,
                    'pryCodSisin' => $request->codSinSin,
                    'fechAprobacion' => $fechaInicio,
                    'sectId' => $request->sectorId,
                    'fechInicProgramada' => $fechaInicio,
                    'duracion' => $request->duracionMes,
                    'pryDescripcion' => $request->descripcion,
                ]
            );
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
    public function show(Proyecto $proyecto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Proyecto  $proyecto
     * @return \Illuminate\Http\Response
     */
    public function edit(Proyecto $proyecto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Proyecto  $proyecto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Proyecto $proyecto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Proyecto  $proyecto
     * @return \Illuminate\Http\Response
     */
    public function destroy(Proyecto $proyecto)
    {
        //
    }
    public function getSectorAllForProyect(Request $request)
    {
        $result[ 'status' ] =true;
        $result[ 'data' ]['sector'] =
        ClaSectorial::select('denominacion', 'id')->where([
                                ['sector' ,'<>', '0'],
                                ['subsector' ,'=', '0'],
                                ['tipo' ,'=', '0'],
                            ])->get();

        $result[ 'data' ]['subSector'] =
        ClaSectorial::select('denominacion', 'id')->where([
                                ['subsector' ,'<>', '0'],
                                ['tipo' ,'=', '0'],
                            ])->get();
        $result[ 'data' ]['tipoProyecto'] =
        ClaSectorial::select('denominacion', 'id')->where([
                                ['tipo' ,'<>', '0'],
                            ])->get();
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
}
