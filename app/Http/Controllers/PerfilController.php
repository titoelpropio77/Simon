<?php
namespace App\Http\Controllers;
use App\Perfil;
use Illuminate\Http\Request;
use App\Helpers\JqueryDataTable;
use App\Helpers\My_ModelGeneral;
use Session;
use Redirect;
class PerfilController extends Controller
{
    private $url = "perfil";
    public function __construct()
    {
        parent::__construct();
        $this->class = new Perfil();
        $this->puedeVisionar( $this->url);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return view('perfil.index', ['title' => 'Perfil', 'urlForm' => $this->url]);
    }
    /**
     * Store a newly created resource in storage.
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

            $clientList= $this->class::find($typeRooms);
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

        try {
            $result[ 'status' ] = true;
            $result[ 'message' ] = 'Modificado Correctamente';
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
     * @param  \App\TypeRooms  $perfil
     * @return \Illuminate\Http\Response
     */
    public function destroy($idPerfil)
    {
         if (!$this->verifyPermission('puedeEliminar'))
        return response()->json( ['status'=>false, 'message' => 'No puede realizar esta transacción' ]  );
        try {
            $perfil = $this->class::findOrFail($idPerfil);
            $perfil->delete();
            $result['status'] = true;
            $result['message'] = 'Eliminado Correctamente';
        } catch (Exception $e) {

            $result['status'] = false;
            $result['message'] = $e->getMessage();
        }
        return response()->json($result);
    }
    public function getPerfilAll(Request $request)
    {
        $table = 'sec_perfil';
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
