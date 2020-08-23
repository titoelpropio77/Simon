<?php

namespace App\Http\Controllers;
use App\Macro;
use Illuminate\Http\Request;
use App\Helpers\JqueryDataTable;
use App\Helpers\My_ModelGeneral;
use Session;
use Redirect;


class MacroprocesoController extends Controller
{
    private $url = "macro";
    public function __construct()
    {
        parent::__construct();
        $this->class = new Macro();
        $this->puedeVisionar( $this->url);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('macro.index', ['title' => 'Macro', 'urlForm' => $this->url]);
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
            $this->class::create($request->all());
        } catch (Exception $e) {
            $result[ 'status' ] = false;
            $result[ 'message' ] = $e->getMessage();
        }
        return response()->json( $result );
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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function getMacroAll(Request $request)
    {
        $table = 'gact_macroprocesos';
        $dt = new JqueryDataTable( $request->all()  );

        $recordsTotal =  My_ModelGeneral::countDataTable( $table ,'' );
        // var_dump($recordsTotal);
        // exit;
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
