<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Perfil;
use App\Licencia;
use DB;
use DataTables;
class UserController extends Controller
{
    private $url = 'usuario';
    public function __construct()
    {
       parent::__construct();
      $this->puedeVisionar( $this->url);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index( Request $request )
    {

        $urlForm = 'usuario';
        $title = 'Usuario';
        $listPerfil = Perfil::all();
        return view('users.index',compact('urlForm','title','listPerfil'));
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $existUser = User::where('email',$request->email)->count();
        if ( $existUser )
        {
            $result['status'] = false;
            $result['message'] = 'El Usuario Ya exite';
            return response()->json($result);
        }
        try {
            DB::beginTransaction();
            $request['name'] = trim($request['name']);
            $request['fecha_activacion'] = Date( 'Y-m-d' );
            $request['email'] = trim($request->email);
            $request['password'] = bcrypt(trim($request->password));
            $user= User::create($request->all());
            $result['status'] = true;
            $result['message'] = 'Guardado Correctamente';
            DB::commit();
        } catch (Exception $e) {
            $result['status'] = false;
            $result['message'] = $e->getMessage();
            DB::rollBack();
        }
        return response()->json($result);
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
            $clientList = User::with(['perfil', 'licencia'] )->find($typeRooms);
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
            $typeRooms = User::findOrFail($id);
            $typeRooms->update([
                'name' => $request['name'],
                'materno' => $request['materno'],
                'paterno' => $request['paterno'],
                'lic_id' => $request['licId'],
                'perfil_id' => $request['perfil_id'],
            ]);
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
    public function destroy($typeRooms)
    {
         if (!$this->verifyPermission('puedeEliminar'))
       return response()->json( ['status'=>false, 'message' => 'No puede realizar esta transacción' ]  );
        try {
             $perfil = User::findOrFail($typeRooms);
            $perfil->delete();
            $result['status'] = true;
            $result['message'] = 'Eliminado Correctamente';
        } catch (Exception $e) {

            $result['status'] = false;
            $result['message'] = $e->getMessage();
        }
        return response()->json($result);
    }
    public function getAll()
    {
         $result['data'] = User::with('perfil')->get();
        return response()->json($result);
    }
    public function updateUserPass( Request $request )
    {
            $user = User::findOrFail( $request->userid );
            try
            {
                 $user->update( [
                    'password' => bcrypt(trim($request->password))
                 ]);
                 $result[ 'status' ] =  true;
                 $result[ 'message' ] =  'Modificado Correctamente';
            } catch (Exception $e)
            {
                $result[ 'status' ] =  false;
                $result[ 'message' ] =  $e->getMessage();
            }
        return response()->json( $result );
    }
    public function getUsersDataTable( Request $request )
    {
        if( $request->ajax() )
        {
            $data = User::with( ['perfil','licencia'] )->get();
            return DataTables::of($data)->make(true);
        }
    }
    public function getPerfilAllForUser( Request $request )
    {
        $result[ 'status' ]  = true;
        $result[ 'data' ] = Perfil::All();
        return  response()->json( $result );
    }
    public function getLicAllForUser( Request $request )
    {
        $result[ 'status' ]  = true;
        $result[ 'data' ] = Licencia::All();
        return  response()->json( $result );
    }
}
