<?php 
 
namespace App\Helpers;
//use nusoap_client;
use DB;
use App\Empresa;
use App\MensajeServicio;
use lawiet\src\NuSoapClient;  
error_reporting(0);

class SincronizacionCatalogos
{
   function __construct() 
   {
        
   }
   
  public function sincronizacioncatalogo()
  {    
    $item = "listaCodigosRespuestas";
    $codigo = 0; 
    $noticia = "Verifique los datos de la empresa por favor";
   
   
        $empresa = Empresa::all();  
        //obteniendo el id  de la empresa voy a ser la  consulta para buscar el codigo punto venta
        $obj['codigo_ambiente'] = $empresa[0]['codigo_ambiente'];
        $obj['codigo_ambiente'] = $empresa[0]['codigo_ambiente'];

        //url del web services 

        $wsdl = "https://presiatservicios.impuestos.gob.bo:39118/FacturacionSincronizacion?wsdl";
        //instanciando un nuevo objeto cliente para consumir el webservice
        $client = new NuSoapClient($wsdl,'wsdl');
        //pasamos los parametros a un array
        $parametros =array("SolicitudSincronizacion" => array(                        
                        'codigoAmbiente'=>$codigoAmbiente,
                        'codigoAutorizacion'=>"0", 
                        'codigoPuntoVenta'=>0, 
                        'codigoSistema'=>$codigosistema,
                        'codigoSucursal'=>$sucursal,
                        'cuis' => $cuis,
                        'nit' => $nit                         
                    ));
        //llamando al método y pasándole el array con los parámetros
        $resultado = $client->call("sincronizarListaMensajesServicios",$parametros);

        //si ocurre algún error al consumir el Web Service
            if ($client->fault) { // si
                $error = $client->getError();
            if ($error) { // Hubo algun error
                    //echo 'Error:' . $error;
                    //echo 'Error2:' . $error->faultactor;
                    //echo 'Error3:' . $error->faultdetail;faultstring
                    return 'Error:  ' . $client->faultstring;
                }
                
                die();
            }           

            if ($resultado['RespuestaListaParametricas']['transaccion'] == "true") 
            {    
                //estamos contando el item listaCodigosRespuestas  el caso es por si es que hay datos que actualizar el nombre del itrem cambia a listaCodigos prohibido borrar el error reportin es para que reconosca el item->listaCodigosRespuestas

                 $contador=count($resultado['RespuestaListaParametricas']['listaCodigosRespuestas']);               
                //si el numero es igual 0 es que hay datos que actualizar caso contrario no  y nos bota un codigo de mensaje92

                 if ($contador === 0)
                 {
                      $codigoDescripcion['listaCodigoDescripcion'] = $resultado['RespuestaListaParametricas']['listaCodigos'];
                      
                      $contador = $codigoDescripcion['listaCodigoDescripcion'];

                      if ($contador < 1)
                      {
                        $listaCodigos['codigo'] = $codigoDescripcion['listaCodigoDescripcion']['codigoClasificador'];

                        $listaCodigos['descripcion'] = $codigoDescripcion['listaCodigoDescripcion']['descripcion']; 

                        DB::table('mensaje_servicio')->insert(array(
                         array('codigo' =>  $listaCodigos['codigo'], 'descripcion' =>  $listaCodigos['descripcion']),));

                        $resul['mensaje'] = "Se acaba de actualizar su catalogo";
                        $resul['transaccion'] = true;
                      }
                      else
                      {
                        for ($i=0; $i < $contador ; $i++)
                        { 
                          
                          $listaCodigos['codigo'] = $codigoDescripcion['listaCodigoDescripcion']['codigoClasificador'][$i];

                          $listaCodigos['descripcion'] = $codigoDescripcion['listaCodigoDescripcion']['descripcion'][$i];
                          
                          DB::table('mensaje_servicio')->insert(array(
                          array('codigo' =>  $listaCodigos['codigo'], 'descripcion' =>  $listaCodigos['descripcion']),)); 
                        }

                        $resul['mensaje'] = "Se acaba de actualizar su catalogo";
                        $resul['transaccion'] = true;
                      }              
                 }
                 else
                 {
                    
                    $codigo = $resultado['RespuestaListaParametricas']['listaCodigosRespuestas']['codigoMensaje']; 
                    
                    $descripcion =  MensajeServicio::mostrar_error( $codigo );         
                    
                    $resul['mensaje'] = $descripcion[0];
                    
                    $resul['transaccion'] = true; 
                    
                    return $resul;
                 }            
            }
            else
            {                             
              $listaRespuesta['listarespuesta'] = $resultado['RespuestaListaParametricas']['listaCodigosRespuestas']; 
              $contador = count($listaRespuesta['listarespuesta']);            

              if ($contador==1)
              {
                 $Obj =  json_decode(MensajeServicio::mostrar_error( $listaRespuesta['listarespuesta']),true); 

                 foreach ($Obj as $key => $value)
                 {
                   $resul['mensaje'] = $value." ".$noticia;
                 }
              }
              else
              {
                for ($i=0; $i < $contador; $i++) 
                { 
                  $descripcion = MensajeServicio::mostrar_error($listaRespuesta['listarespuesta'][$i]);

                  foreach ($descripcion as $key => $value)
                  {
                    $resul['mensaje'] .= $value." ";
                  } 
                }  
                 $resul['mensaje'] .=$noticia;             
              }             
                               
              $resul['transaccion'] = false; 
              return $resul;    
          
            }
  }
}
?>
