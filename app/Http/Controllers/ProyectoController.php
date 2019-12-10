<?php

namespace App\Http\Controllers;

use App\Proyecto;
use Illuminate\Http\Request;
use DataTables;

class ProyectoController extends Controller
{
    private $url = "proyecto";
    public function __construct()
   {
       parent::__construct();
       $this->class = new Proyecto();
       $this->puedeVisionar( $this->url);
   }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view( 'proyecto.index', ['urlForm' => $this->url] );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view( 'proyecto.create', ['urlForm' => $this->url] );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Proyecto  $proyecto
     * @return \Illuminate\Http\Response
     */
    public function show(Proyecto $proyecto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Proyecto  $proyecto
     * @return \Illuminate\Http\Response
     */
    public function edit(Proyecto $proyecto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Proyecto  $proyecto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Proyecto $proyecto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Proyecto  $proyecto
     * @return \Illuminate\Http\Response
     */
    public function destroy(Proyecto $proyecto)
    {
        //
    }
    public function getDataTable(Request $request)
    {
        if ($request->ajax()) {
            $data = Proyecto::All();
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
}
