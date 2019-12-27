<?php

namespace App\Http\Controllers;

use App\Componente;
use Illuminate\Http\Request;
use Validator;
class ComponenteController extends Controller
{
    private $url = "proyecto";
    public function __construct()
    {
        parent::__construct();
        $this->class = new Componente();
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
            $validator = Validator::make($request->all(), [
                'proyectoId' => 'integer|required',
                'nombreComponente' => 'string|required',
                'fechaInicio' => 'string|required',
            ]);
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 401);
            }
            $data = $request->all();


            $this->class::create(
                [
                    'pryId' => $data['proyectoId'],
                    'cmpNombre'=> $data['nombreComponente'],
                    'fechaInicio'=> $data['fechaInicio'],
                    'fechaConclusion'=> $data['fechaConclusion'],
                    'cmpMonto'=> $data['costoComponente'],
                    'duracionDias'=> $data['tiempoDuracion'],
                    'cmpTipoEjecucion'=> $data['tipoEjecucion'],
                ]
            );
        } catch (Exception $e) {
            $result[ 'status' ] = false;
            $result[ 'message' ] = $e->getMessage();
        }
        return response()->json( $result );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Componente  $componente
     * @return \Illuminate\Http\Response
     */
    public function show(Componente $componente)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Componente  $componente
     * @return \Illuminate\Http\Response
     */
    public function edit( $componente)
    {
        try {
            // $clientList = $this->class::find($confinaciamiento);
            $clientList = $this->class::where('id',$componente)->first();

            // $url = Storage::url( $clientList->convPath);
            // $result[ 'url' ] = $url;
            $result[ 'data' ] = $clientList;
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
     * @param  \App\Componente  $componente
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,  $id)
    {
        if (!$this->verifyPermission('puedeModificar'))
        return response()->json( ['status'=>false, 'message' => 'No puede realizar esta transacción' ]  );

        try {
            $result[ 'status' ] = true;
            $result[ 'message' ] = 'Modificado Correctamente';
            $data = $request->all();
            $typeRooms = $this->class::findOrFail($id);
            $typeRooms->update([
                'pryId' => $data['proyectoId'],
                'cmpNombre'=> $data['nombreComponente'],
                'fechaInicio'=> $data['fechaInicio'],
                'fechaConclusion'=> $data['fechaConclusion'],
                'cmpMonto'=> $data['costoComponente'],
                'duracionDias'=> $data['tiempoDuracion'],
                'cmpTipoEjecucion'=> $data['tipoEjecucion'],
            ]);
            $typeRooms->save();
        } catch (Exception $e) {
            $result[ 'status' ] = false;
            $result[ 'message' ] = $e->getMessage();
        }
        return response()->json( $result );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Componente  $componente
     * @return \Illuminate\Http\Response
     */
    public function destroy(Componente $componente)
    {
        //
    }
    /**
     * Carga todos los componentes dado el ID Proyecto
     */

    public function getComponentesByProyecto( Request $request )
    {
        $result[ 'data' ] = $this->class::where( 'pryId', $request->proyectoId )->get();
        $result[ 'status' ] = true;
        return response()->json( $result );
    }
}
