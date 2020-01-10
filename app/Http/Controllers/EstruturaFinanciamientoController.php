<?php

namespace App\Http\Controllers;

use App\EstruturaFinanciamiento;
use App\EstructuraFinanciamientoDetalle;
use App\ClaPresupuestario;
use Illuminate\Http\Request;
use Validator;
use Carbon\Carbon;
class EstruturaFinanciamientoController extends Controller
{
    private $url = "perfil";
    public function __construct()
    {
        parent::__construct();
        $this->class = new EstruturaFinanciamiento();
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
            $result[ 'status' ] = true;
            $result[ 'message' ] = 'Guardado Correctamente';
            $pathFile = "";
            $validator = Validator::make($request->all(), [
                'proyectoId' => 'integer|required',
                'componente' => 'integer|required',
            ]);
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 401);
            }
            $data = $request->all();

            if( !$request->key ){
                $createEF = $this->class::create(
                    [
                        'pryId' => $request->proyectoId,
                        'esfFecha' => Carbon::now(),
                        'esfTipo' => 'EF',
                        'cmpId' => $request->componente,
                        'presupId' => $request->partida,
                        'esfConcepto'=> "Estructura Financiamiento",
                        'esfGlosa' => 'Estructura Financiamiento',
                    ]

                );


                if ( $createEF )
                {
                    $createEFC = $this->saveDetalleEFC( $request, $createEF[ 'id' ] );
                    $result[ 'data' ] = $createEF[ 'id' ] ;
                    $result[ 'arrayEditFuncId' ] =  $createEFC['data'];
            }
            }else{
                $typeRooms = $this->class::findOrFail( $request->key );
                $typeRooms->update([
                    'cmpId' => $request->componente,
                    'presupId' => $request->partida
                ]);
                $result[ 'data' ] = $request->key ;
                $createEFC = $this->saveDetalleEFC( $request, $request->key );

                $result[ 'arrayEditFuncId' ] =  $createEFC['data'];
                // array_push( $result[ 'data' ][ 'arrayEditFuncId' ], $createEF['data'] );
            }

        } catch (Exception $e) {
            $result[ 'status' ] = false;
            $result[ 'message' ] = $e->getMessage();
        }
        return response()->json( $result );
    }


    public function saveDetalleEFC( Request $request, $id )
    {
        $result[ 'status' ] = true;
        $result[ 'data' ] = [];

        try{
            $arrayData = $request->arrayValue;
            if( !count( $request->arrayEditFuncId ) )
            {
                foreach ($arrayData as $key =>  $value)
                {
                    $createEF = EstructuraFinanciamientoDetalle::create(
                        [
                            'esfId' =>  $id,
                            'cofinaciadorId' => $request->arrayFuncId[ $key ],
                            'monto' => $value,
                        ]
                    );
                    if( $createEF )
                    {
                        array_push( $result[ 'data' ], $createEF[ 'id' ] );
                    }
                }
            }
            else{
                $arrayData = $request->arrayEditFuncId;
                foreach ($arrayData as $key =>  $value)
                {
                    $update = EstructuraFinanciamientoDetalle::findOrFail( $value );
                    $update->update([
                        'cofinaciadorId' => $request->arrayFuncId[ $key ],
                        'monto' => $request->arrayValue[ $key ],
                    ]);

                }
                $result[ 'data' ] =$request->arrayEditFuncId;
            }
        }
        catch (exception $e)
        {
            $result[ 'status' ] = false;
            $result[ 'error' ] = $e->getMessage();
        }
        return $result;
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\EstruturaFinanciamiento  $estruturaFinanciamiento
     * @return \Illuminate\Http\Response
     */
    public function show(EstruturaFinanciamiento $estruturaFinanciamiento)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\EstruturaFinanciamiento  $estruturaFinanciamiento
     * @return \Illuminate\Http\Response
     */
    public function edit(EstruturaFinanciamiento $estruturaFinanciamiento)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\EstruturaFinanciamiento  $estruturaFinanciamiento
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, EstruturaFinanciamiento $estruturaFinanciamiento)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\EstruturaFinanciamiento  $estruturaFinanciamiento
     * @return \Illuminate\Http\Response
     */
    public function destroy(EstruturaFinanciamiento $estruturaFinanciamiento)
    {
        //
    }

    public function getListClaPresupuestario()
    {
        $result[ 'data' ] = ClaPresupuestario::All();
        $result[ 'status' ] = true;
        return response()->json($result);
    }
    public function getEFByProyecto( Request $request )
    {
        $result[ 'data' ] = EstruturaFinanciamiento::where( 'pryId', $request->proyectoId )->with( ['EFDetalle', 'componente', 'claPresupuestario'] )->get();
        $result[ 'status' ] = true;
        return response()->json( $result );
    }
}
