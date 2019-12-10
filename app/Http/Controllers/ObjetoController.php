<?php

namespace App\Http\Controllers;

use App\Objeto;
use App\Modulo;
use Illuminate\Http\Request;
use DataTables;

class ObjetoController extends Controller
{
     private $url = "objeto";
     public function __construct()
    {
        parent::__construct();
        $this->class = new Objeto();
        $this->puedeVisionar( $this->url);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('objeto.index',['title'=>'Objetos','urlForm' => $this->url]);
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
            $this->class::create($request->all());
        } catch (Exception $e) {
            $result[ 'status' ] = false;
            $result[ 'message' ] = $e->getMessage();
        }
        return response()->json( $result );
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\TypeRooms  $typeRooms
     * @return \Illuminate\Http\Response
     */
    public function edit( $typeRooms)
    {
        if (!$this->verifyPermission('puedeModificar'))
       return response()->json( ['status'=>false, 'message' => 'No puede realizar esta transacción' ]  );
        try {
            $clientList = $this->class::with('modulo')->find($typeRooms);
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
     * @param  \App\TypeRooms  $typeRooms
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,  $id)
    {
        if (!$this->verifyPermission('puedeModificar'))
        return response()->json( ['status'=>false, 'message' => 'No puede realizar esta transacción' ]  );

        // return $request->all();
        try {
            $result[ 'status' ] = true;
            $result[ 'message' ] = 'Modificado Correctamente';
            // $result[ 'data' ] = $request->all();
            $typeRooms = $this->class::findOrFail($id);

            $typeRooms->update($request->all());
        } catch (Exception $e) {
            $result[ 'status' ] = false;
            $result[ 'message' ] = $e->getMessage();
        }
        return response()->json( $result );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\TypeRooms  $typeRooms
     * @return \Illuminate\Http\Response
     */
    public function destroy( $typeRooms)
    {
         if (!$this->verifyPermission('puedeEliminar'))
       return response()->json( ['status'=>false, 'message' => 'No puede realizar esta transacción' ]  );
        try {
            $Objeto = $this->class::findOrFail($typeRooms);
            $Objeto->delete();
            $result['message'] = 'Eliminado Correctamente';
            $result['status'] = true;
        } catch (Exception $e) {

            $result['status'] = false;
            $result['message'] = $e->getMessage();
        }
        return response()->json($result);
    }
    public function getModuloAll()
    {
        $result[ 'status' ] = true;
        $result[ 'data' ] = Modulo::All();
        return response()->json($result);
    }
    public function getObjetoDataTable(Request $request)
    {
        $result['status'] = true;
        if ($request->ajax()) {
            $data = Objeto::with('modulo')->latest()->get();
            return Datatables::of($data)
                    ->addIndexColumn()
                    // ->addColumn('action', function($row){

                    //        $btn = '<a href="javascript:void(0)" class="edit btn btn-primary btn-sm">View</a>';

                    //         return $btn;
                    // })
                    // ->rawColumns(['action'])
                    ->make(true);

        }
        // $result['data'] = $this->class::with('modulo')->get();

        return response()->json($result);

    }

}
