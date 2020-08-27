<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Redirect;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public $arrayPermission ;

    public $message = '';
    public $status = true;
    public $error = '';
    public $dataResponse = [];
    public function __construct()
    {
    	// $this->middleware('GeneralMiddelWare',['except',['index']]);
    }
    public function responseClient()
    {
      return  response()->json(  ['message' => $this->message, 'status' => $this->status, 'data' => $this->dataResponse] );
    }
    public function verifyPermission( $permiso )
    {
        return  $this->arrayPermission->$permiso ;
    }
    public function verifyPermissionByUrl( $url,$permiso )
    {
      session_start();
      $objeto = $_SESSION['objeto'] ?? 0;
      $havePermission = true;
      foreach ( $objeto as $obj )
      {
        if ( $url == $obj->urlObjeto )
        {
          $this->arrayPermission = $obj;
        }
      }
      return  $this->arrayPermission->$permiso ;
    }
    public function puedeVisionar(  $url )
    {
      session_start();
      $objeto = $_SESSION['objeto'] ?? 0;
      if ( !$objeto )
      {
        Redirect::to('login')->send();
      }
       foreach ( $objeto as $obj )
       {
          if ( $url == $obj->urlObjeto )
          {

            $this->arrayPermission = $obj;
            if (!$obj->puedeListar)
            {
                Redirect::to('login')->send();
            }
            return true;
          }
       }
      Redirect::to('/')->send();
    }
}
