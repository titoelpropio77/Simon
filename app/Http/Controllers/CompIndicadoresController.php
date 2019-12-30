<?php

namespace App\Http\Controllers;

use App\CompIndicadores;
use Illuminate\Http\Request;
use Validator;
use DB;
class CompIndicadoresController extends Controller
{
    private $url = "proyecto";
    public function __construct()
    {
        parent::__construct();
        $this->class = new CompIndicadores();
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
            $create = $this->class::create(
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
     * @param  \App\CompIndicadores  $compIndicadores
     * @return \Illuminate\Http\Response
     */
    public function show(CompIndicadores $compIndicadores)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\CompIndicadores  $compIndicadores
     * @return \Illuminate\Http\Response
     */
    public function edit(CompIndicadores $compIndicadores)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\CompIndicadores  $compIndicadores
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,  $compIndicadores)
    {
        if (!$this->verifyPermission('puedeModificar'))
        return response()->json( ['status'=>false, 'message' => 'No puede realizar esta transacción' ]  );

        try {
            DB::beginTransaction();
            $result[ 'status' ] = true;
            $result[ 'message' ] = 'Modificado Correctamente';
            $validator = Validator::make($request->all(), [
                'indId' => 'integer|required',
                'tipo' => 'integer|required',
                'cantidad' => 'integer|required',
            ]);
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors(), 'status' => false], 401);
            }
            $typeRooms = $this->class::findOrFail($compIndicadores);
            $typeRooms->update(
                [
                    'cmpId' => $request->componente,
                    'indId' => $request->indId,
                    'tipo' => $request->tipo,
                    'cantidad' => $request->cantidad,
                    'plazoMedirDias' => $request->plazoDias
                ]
            );
            $typeRooms->save();
            $result[ 'data' ] = $compIndicadores;
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            $result[ 'status' ] = false;
            $result[ 'message' ] = $e->getMessage();
        }
        return response()->json( $result );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\CompIndicadores  $compIndicadores
     * @return \Illuminate\Http\Response
     */
    public function destroy(CompIndicadores $compIndicadores)
    {
        //
    }
}
