<?php

namespace App\Http\Controllers;

use App\PerfilObjeto;
use App\Objeto;
use App\Modulo;
use App\Perfil;
use Illuminate\Http\Request;
use DB;
use Session;
use DataTables;

class PerfilObjetoController extends Controller
{
    private $url = 'objeto';
    public function __construct()
    {
      parent::__construct();
        $this->class = new PerfilObjeto();
        $this->puedeVisionar( $this->url);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('perfil_objeto.index',['title' =>'Perfil Objeto', 'urlForm' => $this->url]);
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
    public function updatePermissionUser( $idPerfil )
    {
        $idPerfil = $idPerfil;
        $objeto = PerfilObjeto::getPermissionByIdPerfil($idPerfil);
        $modulo = Modulo::getAllModuloByIdPerfil($idPerfil);
        $menuSinModulo = Objeto::getAllObjForMenuSinModuloByIdPerfil($idPerfil);
        $_SESSION['objeto'] = $objeto;
        Session::put('idPerfil',$idPerfil);
        Session::put('objeto',$objeto);
        Session::put('modulo',  $modulo);
        Session::put('menuSinModulo',  $menuSinModulo);
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
                $result['status'] = true;
                $result['message'] = 'Guardado Correctamente';
                PerfilObjeto::create($request->all());

                if (auth()->user()->idPerfil == $request->idPerfil)
                {
                 $this->updatePermissionUser( $request->idPerfil );
                }
            } catch (Exception $e) {
                $result['status'] = false;
                $result['message'] = $e->getMessage();
            }
            return response()->json( $result );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\PerfilObjeto  $perfilObjeto
     * @return \Illuminate\Http\Response
     */
    public function show( $id)
    {
        $objeto = Objeto::objetosPerfilNotExitById($id);
        // var_dump($objeto);
        // exit();

        $perfil =  Perfil::where('id',$id);

        return view('perfil_objeto.index',['title' =>'Perfil Objeto', 'objeto' => $objeto, 'perfil' => $perfil, 'idPerfil'=> $id, 'urlForm' => $this->url]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\PerfilObjeto  $perfilObjeto
     * @return \Illuminate\Http\Response
     */
    public function edit( $perfilObjeto)
    {
        if (!$this->verifyPermission('puedeModificar'))
       return response()->json( ['status'=>false, 'message' => 'No puede realizar esta transacción' ]  );
        try {
            $clientList = $this->class::find($perfilObjeto);
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
     * @param  \App\PerfilObjeto  $perfilObjeto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,  $id)
    {
        if (!$this->verifyPermission('puedeModificar'))
        return response()->json( ['status'=>false, 'message' => 'No puede realizar esta transacción' ]  );
        try {
            $result['status'] = true;
            $result['message'] = 'Modificado Correctamente';
            $perfilObjeto = PerfilObjeto::findOrFail($id);
            $request['puedeGuardar'] = $request['puedeGuardar'] or 0;
            $request['puedeModificar'] = $request['puedeModificar'] or 0;
            $request['puedeEliminar'] = $request['puedeEliminar'] or 0;
            $request['puedeListar'] = $request['puedeListar'] or 0;
            $request['puedeVerReporte'] = $request['puedeVerReporte'] or 0;
            $request['puedeImprimir'] = $request['puedeImprimir'] or 0;
            $perfilObjeto->update($request->all());
            if (auth()->user()->idPerfil == $request->idPerfil)
            {
             $this->updatePermissionUser( $request->idPerfil );
            }
        } catch (Exception $e) {
            $result['status'] = false;
            $result['message'] = $e->getMessage();
        }
        return response()->json( $result );
    }
    public function getPerfilObjetoDataTable(Request $request)
    {
        if ($request->ajax()) {
            $data = PerfilObjeto::with('objeto')->get();
            return DataTables::of($data)
                    ->addIndexColumn()
                    // ->addColumn('action', function($row){

                    //        $btn = '<a href="javascript:void(0)" class="edit btn btn-primary btn-sm">View</a>';

                    //         return $btn;
                    // })
                    // ->rawColumns(['action'])
                    ->make(true);

        }
        // $result['data'] = $this->class::with('modulo')->get();

    }
    public function getPerfilObjetById($id)
    {
        try {
            $result['status'] = true;
            $result['data'] = PerfilObjeto::getPermissionByIdPerfil( $id );

        } catch (Exception $e) {
            $result['status'] = false;
            $result['message'] = $e->getMessage();
        }
        return response()->json( $result );
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PerfilObjeto  $perfilObjeto
     * @return \Illuminate\Http\Response
     */
    public function destroy($perfilObjeto)
    {
        if (!$this->verifyPermission('puedeEliminar'))
        return response()->json( ['status'=>false, 'message' => 'No puede realizar esta transacción' ]  );
        try {
            $perfilObjeto = PerfilObjeto::findOrFail($perfilObjeto);
            $perfilObjeto->delete();
            $result['status'] = true;
            $result['message'] = 'Eliminado Correctamente';
        } catch (Exception $e) {

            $result['status'] = false;
            $result['message'] = $e->getMessage();
        }
        return response()->json($result);
    }
    public function getObjetoByPerfilId( Request $request )
    {
        $result['data'] = Objeto::objetosPerfilNotExitById( $request[ 'perfil_id' ] );

        $result['status'] = true;
        return response()->json($result);
    }
}
