<?php

namespace App\Http\Controllers;

use App\Confinaciamiento;
use App\TipoDocumento;
use App\Institucional;

use Illuminate\Http\Request;
use Validator;
use Storage;
class ConfinaciamientoController extends Controller
{
    private $url = "perfil";
    public function __construct()
    {
        parent::__construct();
        $this->class = new Confinaciamiento();
        $this->puedeVisionar( $this->url);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
            $pathFile = "";
            $validator = Validator::make($request->all(), [
                'proyectoId' => 'integer|required',
                'institucion' => 'integer|required',
                // 'docConvenio' => 'file|required',
            ]);
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 401);
            }
            $data = $request->all();

            if ( $request->hasFile('docConvenio') )
            {
                $extension = $request->file('docConvenio')->getClientOriginalExtension();
                $fileName = uniqid() . '.' . $extension;
                $path = public_path('documentos/Documentos_Convenio/' . $fileName);
            //    $path = $request->file('docConvenio')->store('documentos/Documentos_Convenio');
                // $pathFile= Storage::putFileAs('documentos/Documentos_Convenio', $request->file('docConvenio'),  $fileName);
                $pathFile= Storage::putFile('documentos/Documentos_Convenio', $request->file('docConvenio') );
            }
            $this->class::create(
                [
                    'pryId' => $data['proyectoId'],
                    'instId'=> $data['institucion'],
                    'tdocId'=> $data['tipoDocumento'],
                    'convNombre'=> $data['nombreDocumento'],
                    'fechaFirma'=> $data['fechaConvenio'],
                    'fechaConclusion'=> $data['fechaConclusion'],
                    'convMonto'=> $data['montoFinanciado'],
                    'convVigencia'=> $data['vigenciaDias'],
                    'convPath'=>  $pathFile,
                ]
            );
        } catch (Exception $e) {
            $result[ 'status' ] = false;
            $result[ 'message' ] = $e->getMessage();
        }
        return response()->json( $result );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Confinaciamiento  $confinaciamiento
     * @return \Illuminate\Http\Response
     */
    public function show(Confinaciamiento $confinaciamiento)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Confinaciamiento  $confinaciamiento
     * @return \Illuminate\Http\Response
     */
    public function edit( $confinaciamiento)
    {
        try {
            // $clientList = $this->class::find($confinaciamiento);
            $clientList = $this->class::where('id',$confinaciamiento)->with(['tipoDocumento', 'institucional'])->first();

            // $url = Storage::url( $clientList->convPath);
            // $result[ 'url' ] = $url;
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
     * @param  \App\Confinaciamiento  $confinaciamiento
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Confinaciamiento $confinaciamiento)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Confinaciamiento  $confinaciamiento
     * @return \Illuminate\Http\Response
     */
    public function destroy( $confinaciamiento)
    {
        if (!$this->verifyPermission('puedeEliminar'))
        return response()->json( ['status'=>false, 'message' => 'No puede realizar esta transacción' ]  );
        try {
            $perfil = $this->class::findOrFail($confinaciamiento);
            $perfil->delete();
            $result['status'] = true;
            $result['message'] = 'Eliminado Correctamente';
        } catch (Exception $e) {

            $result['status'] = false;
            $result['message'] = $e->getMessage();
        }
        return response()->json($result);
    }
    public function getAllTypeDocumentForConfinaciamiento()
    {
        $result[ 'data' ] = TipoDocumento::All();
        $result[ 'status' ] = true;
        return response()->json( $result );
    }
    public function getInstitucionAllForConfinaciamiento()
    {
        $result[ 'data' ] = Institucional::All();
        $result[ 'status' ] = true;
        return response()->json( $result );
    }
    public function getAllConfinaciadoresByProy(Request $request)
    {
        $result[ 'data' ] = Confinaciamiento::where('pryId', $request->proyectoId)->with( ['proyecto','Institucional'] )->get();
        $result[ 'status' ] = true;
        return response()->json( $result );
    }
    public function confinaciamientoUpdate( Request $request )
    {
        // if (!$this->verifyPermission('puedeGuardar'))
        // return response()->json( ['status'=>false, 'message' => 'No puede realizar esta transacción' ]  );

        try {
            $result[ 'status' ] = true;
            $result[ 'message' ] = 'Guardado Correctamente';
            $pathFile = "";
            $validator = Validator::make($request->all(), [
                'proyectoId' => 'integer|required',
                'institucion' => 'integer|required',
                // 'docConvenio' => 'file|required',
            ]);
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 401);
            }
            $data = $request->all();

            // if ( $request->hasFile('docConvenio') )
            // {
            //     $extension = $request->file('docConvenio')->getClientOriginalExtension();
            //     $fileName = uniqid() . '.' . $extension;
            //     $path = public_path('documentos/Documentos_Convenio/' . $fileName);
            // //    $path = $request->file('docConvenio')->store('documentos/Documentos_Convenio');
            //     // $pathFile= Storage::putFileAs('documentos/Documentos_Convenio', $request->file('docConvenio'),  $fileName);
            //     $pathFile= Storage::putFile('documentos/Documentos_Convenio', $request->file('docConvenio') );
            // }
            $confinanciamiento = $this->class::findOrFail( $data['elementId'] );
            $confinanciamiento->update(
                [
                    'pryId' => $data['proyectoId'],
                    'instId'=> $data['institucion'],
                    'tdocId'=> $data['tipoDocumento'],
                    'convNombre'=> $data['nombreDocumento'],
                    'fechaFirma'=> $data['fechaConvenio'],
                    'fechaConclusion'=> $data['fechaConclusion'],
                    'convMonto'=> $data['montoFinanciado'],
                    'convVigencia'=> $data['vigenciaDias'],
                    'convPath'=>  $pathFile,
                ]
            );
        } catch (Exception $e) {
            $result[ 'status' ] = false;
            $result[ 'message' ] = $e->getMessage();
        }
        return response()->json( $result );
    }
}
