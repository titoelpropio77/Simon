<?php

namespace App\Http\Controllers;
use App\GAct_Proceso;
// use App\Cliente;
use Illuminate\Http\Request;
use App\Helpers\JqueryDataTable;
use App\Helpers\My_ModelGeneral;
use Session;
use Redirect;
use DataTables;

class GAct_ProcesoController extends Controller
{
    private $url = "gactProceso";
    private $field_validate = [
        'grado_automatizacion' => 'required',
        'grado_descentralizacion' => 'required',
        'nombre' => 'required',
        'periodo_ejecucion' => 'required',
    ];
    public function __construct()
    {
        parent::__construct();
        $this->class = new GAct_Proceso();
        $this->puedeVisionar( $this->url);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index( Request $request )
    {
        
        return view('gact_proceso.index', [ 'urlForm' => $this->url]);
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
                        'proc_nombre' => $data['nombre'],
                        'proc_grado_automatizacion' => $data['grado_automatizacion'],
                        'proc_grado_descentralizacion'=> $data['grado_descentralizacion'],
                        'proc_periodo_ejecucion' => $data['periodo_ejecucion'],
                        // 'proc_reponsable_revision',
                        // 'proc_reponsable_ejecucion',
                        'proc_macroproceso_id'=> $data['macro_proceso'],
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
     * @param  \App\Cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function show(GAct_Proceso $cliente)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Cliente  $cliente
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
     * @param  \App\Cliente  $cliente
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
                        'proc_nombre' => $data['nombre'],
                        'proc_grado_automatizacion' => $data['grado_automatizacion'],
                        'proc_grado_descentralizacion'=> $data['grado_descentralizacion'],
                        'proc_periodo_ejecucion' => $data['periodo_ejecucion'],
                        // 'proc_reponsable_revision',
                        // 'proc_reponsable_ejecucion',
                        'proc_macroproceso_id'=> $data['macro_proceso'],
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
     * @param  \App\Cliente  $id
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
                $data = $this->class::with('macros')->latest()->get();
                return Datatables::of($data)
                    ->addIndexColumn()
                    ->make(true);
            }

    }
    public function getMacroProceso()
    {
        $data = $this->class->getAllMacroProceso();
        $result = ['data' => $data, 'status' => true];
        return response()->json( $result );
    }
}
