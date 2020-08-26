<?php

namespace App\Http\Controllers;
use App\gact_clasificacion;
use Illuminate\Http\Request;
use DataTables;

class GAct_ClasificacionController extends Controller
{
    private $url = "clasificacion";
    private $field_validate = [
        'nombre' => 'required',
        'descripcion' => 'required'
    ];
    public function __construct()
    {
        parent::__construct();
        $this->class = new gact_clasificacion();
        $this->puedeVisionar( $this->url);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('gact_clasificacion.index', ['urlForm' => $this->url]);
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
        //validate() valida las campon del formulario, este metodo es de laravel
        $validatedData = $request->validate( $this->field_validate );
        //obtengo toda la data
        $data = $request->all();
        try {
            if( $validatedData )
                {
                     $this->class::create([
                         'clasif_nombre' => $data['nombre'],
                         'clasifi_descripcion' => $data['descripcion'],
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        if (!$this->verifyPermission('puedeModificar'))
        return response()->json( ['status'=>false, 'message' => 'No puede realizar esta transacción' ]  );
        try {
            $clientList= $this->class::where('id', $id)->first();
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
     * @param  int  $id
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
                        'clasif_nombre' => $data['nombre'],
                        'clasifi_descripcion' => $data['descripcion'],
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
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

    public function getDataTable(Request $request)
    {
            if ($request->ajax())
            {
                $data = $this->class::latest()->get();
                return DataTables::of($data)
                    ->addIndexColumn()
                    ->make(true);
            }

    }
}
