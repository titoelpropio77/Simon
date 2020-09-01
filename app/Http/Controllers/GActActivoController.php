<?php

namespace App\Http\Controllers;

use App\GAct_Activo;
use Illuminate\Http\Request;
use DataTables;

class GActActivoController extends Controller
{

    private $url = "gactActivo";
    public function __construct()
    {
        parent::__construct();
        $this->class = new GAct_Activo();
        
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->puedeVisionar( $this->url);
        return view('gact_activo.index', [ 'urlForm' => $this->url]);
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
            //validate() valida las campon del formulario, este metodo es de laravel
            $validatedData = $request->validate( $this->field_validate );
            //obtengo toda la data 
            $data = $request->all();
            try {
                if( $validatedData )
                {
                    $this->class::create([
                        
                    ]);
                    $result[ 'status' ] = true;
                    $result[ 'message' ] = 'Guardado Correctamente';
                }

            } catch (Exception $e) {
                $result[ 'status' ] = false;
                $result[ 'message' ] = $e->getMessage();
            }
        return $result;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\GAct_Activo  $gAct_Activo
     * @return \Illuminate\Http\Response
     */
    public function show(GAct_Activo $gAct_Activo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\GAct_Activo  $gAct_Activo
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        if (!$this->verifyPermission('puedeModificar'))
        return response()->json( ['status'=>false, 'message' => 'No puede realizar esta transacción' ]  );
        try {
            $clientList= $this->class::with('macros')->where('id', $id)->first();
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
     * @param  \App\GAct_Activo  $gAct_Activo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if (!$this->verifyPermission('puedeModificar'))
        return response()->json( ['status'=>false, 'message' => 'No puede realizar esta transacción' ]  );
            //validate() valida las campon del formulario, este metodo es de laravel
            $validatedData = $request->validate( $this->field_validate );
            //obtengo toda la data 
            $data = $request->all();
            try {
                if( $validatedData )
                {
                    $classModel = $this->class::findOrFail($id);
                    $classModel->update([
                       
                    ]);
                    $result[ 'status' ] = true;
                    $result[ 'message' ] = 'Guardado Correctamente';
                }

            } catch (Exception $e) {
                $result[ 'status' ] = false;
                $result[ 'message' ] = $e->getMessage();
            }
        return $result;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\GAct_Activo  $gAct_Activo
     * @return \Illuminate\Http\Response
     */
    public function destroy(GAct_Activo $id)
    {
        if (!$this->verifyPermission('puedeEliminar'))
        return response()->json( ['status'=>false, 'message' => 'No puede realizar esta transacción' ]  );
        try {
            $classModel = $this->class::findOrFail($id);
            $classModel->delete();
            $result['status'] = true;
            $result['message'] = 'Eliminado Correctamente';
        } catch (Exception $e) {

            $result['status'] = false;
            $result['message'] = $e->getMessage();
        }
        return response()->json($result);
    }
    /***
     * 
     */
    public function getDataTable(Request $request)
    {
        if ($request->ajax()) 
        {
            $data = $this->class::All();
            return DataTables::of($data)
                    ->addIndexColumn()
                    ->make(true);
        }
    }
}
