<?php

namespace App\Http\Controllers;

use App\gact_vulnerabilidad;
use Illuminate\Http\Request;
use DataTables;
class Gact_VulnerabilidadController extends Controller
{
    private $url = "vulnerabilidad";
    private $field_validate = [
        'nombre' => 'required',
    ];
    public function __construct()
    {
        parent::__construct();
        $this->class = new gact_vulnerabilidad();
        //$this->class = new GAct_Zonas();

    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->puedeVisionar( $this->url);
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
        if (!$this->verifyPermissionByUrl($this->url,'puedeGuardar'))
        return response()->json( ['status'=>false, 'message' => 'No puede realizar esta transacción' ]  );
        //validate() valida las campon del formulario, este metodo es de laravel
        $validatedData = $request->validate( $this->field_validate );
        //obtengo toda la data
        $data = $request->all();
        // var_dump('guardar data');
        // var_dump($data);
        try {
            if( $validatedData )
                {
                    $this->class::create([
                        'vul_nombre' => $data['nombre'],
                        'ame_id' => $data['amenaza_id']
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
        return view('gact_vulnerabilidad.index',['urlForm' => $this->url, 'idAmenaza'=> $id]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        if (!$this->verifyPermissionByUrl( $this->url,'puedeModificar'))
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
        if (!$this->verifyPermissionByUrl($this->url,'puedeModificar'))
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
                        'vul_nombre' => $data['nombre']
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
        if (!$this->verifyPermissionByUrl($this->url,'puedeEliminar'))
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
                $data = $this->class::where('ame_id',$request->amenaza_id)->latest()->get();
                return DataTables::of($data)
                    ->addIndexColumn()
                    ->make(true);
            }

    }
    public function getVulneravilidadesByAmenaza( Request $request )
    {
        $result['data'] = $this->class->getVulnerabilidadAll( $request->id );
        $result['status'] = true;
        return response()->json( $result );
    }

}
