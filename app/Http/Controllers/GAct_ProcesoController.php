<?php

namespace App\Http\Controllers;
use App\GAct_Proceso;
// use App\Cliente;
use Illuminate\Http\Request;
use App\Helpers\JqueryDataTable;
use App\Helpers\My_ModelGeneral;
use Session;
use Redirect;

class GAct_ProcesoController extends Controller
{
    private $url = "gactProceso";
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
        return $request->all();
        exit;
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
            $clientList= $this->class::find($id);
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
    public function update(Request $request, GAct_Proceso $cliente)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function destroy(GAct_Proceso $cliente)
    {
        //
    }
    public function getDataTable(Request $request)
    {
        if(  $request->ajax() )
        {
            $table = 'gact_procesos';
            // var_dump( $this->class->table);
            // exit;
            $dt = new JqueryDataTable( $request->all()  );
    
            $recordsTotal =  My_ModelGeneral::countDataTable( $table ,'' );
            $recordsFiltered = $recordsTotal;
            $searchValue = $dt->getSearchValue();
            if ( $dt->hasSearchValue() )
            {
               $recordsFiltered = My_ModelGeneral::countDataTable( $table,$searchValue );
            }
            $resultArray = My_ModelGeneral::getDataTable($table , $searchValue, $dt->getLength(), $dt->getStart(), $dt->getOrderName( 0 ), $dt->getOrderDir( 0 ) );
            $result = $dt->generateArrayData( $recordsTotal,  $recordsFiltered, $resultArray );
            return response()->json( $result );
        }
    }
    public function getMacroProceso(){
        $data = $this->class->getAllMacroProceso();
        $result = ['data' => $data, 'status' => true];
        return response()->json( $result );
    }
}
