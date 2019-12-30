<?php

namespace App\Http\Controllers;

use App\AuxIndicadores;
use App\CompIndicadores;
use Illuminate\Http\Request;
use Validator;
use DB;
class AuxIndicadoresController extends Controller
{
    private $url = "proyecto";
    public function __construct()
    {
        parent::__construct();
        $this->class = new AuxIndicadores();
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
            $result[ 'status' ] = true;
            $result[ 'message' ] = 'Guardado Correctamente';
            $validator = Validator::make($request->all(), [
                'indId' => 'integer|required',
                'tipo' => 'integer|required',
                'cantidad' => 'integer|required',
            ]);
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors(), 'status' => false], 401);
            }
            $create = CompIndicadores::create(
                [
                    'cmpId' => $request->componente,
                    'indId' => $request->indId,
                    'tipo' => $request->tipo,
                    'cantidad' => $request->cantidad,
                    'plazoMedirDias' => $request->plazoDias
                ]
            );
            $result[ 'data' ] = $create['id'];
            DB::commit();
        } catch (Exception $e) {
            $result[ 'status' ] = false;
            $result[ 'message' ] = $e->getMessage();
            DB::rollBack();
        }
        return response()->json( $result );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\AuxIndicadores  $auxIndicadores
     * @return \Illuminate\Http\Response
     */
    public function show(AuxIndicadores $auxIndicadores)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\AuxIndicadores  $auxIndicadores
     * @return \Illuminate\Http\Response
     */
    public function edit(AuxIndicadores $auxIndicadores)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\AuxIndicadores  $auxIndicadores
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AuxIndicadores $auxIndicadores)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\AuxIndicadores  $auxIndicadores
     * @return \Illuminate\Http\Response
     */
    public function destroy(AuxIndicadores $auxIndicadores)
    {
        //
    }
}
