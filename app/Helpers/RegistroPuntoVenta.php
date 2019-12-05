<?php 
 
namespace App\Helpers;
//use nusoap_client;
use App\MensajeServicio;
use lawiet\src\NuSoapClient; 


class RegistroPuntoVenta
{
   function __construct() 
   {
        
   }

  public function registropuntoventa($valor)
  {    
         

        //url del web services 

        $wsdl = "https://presiatservicios.impuestos.gob.bo:39117/FacturacionOperaciones?wsdl";
        //instanciando un nuevo objeto cliente para consumir el webservice
        $client = new NuSoapClient($wsdl,'wsdl');
        //pasamos los parametros a un array
        $parametros =array("SolicitudRegistroPuntoVenta" => array(                        
                        'codigoAmbiente'=>$valor['codigo_ambiente'],
                        'codigoModalidad'=>$valor['id_codigoModalidad'],
                        'codigoSistema'=>$valor['codigo_sistema'],
                        'codigoSistemaProveedor'=>$valor['codigo_proveedor'],
                        'codigoSucursal'=>$valor['codigo_sucursal'], 
                        'codigoTipoPuntoVenta'=>$valor['id_tipoPuntoVenta'],
                        'cuis' => $valor['cuis'],
                        'descripcion' => $valor['descripcion'],
                        'nit' => $valor['nit'],
                        'nombrePuntoVenta' => $valor['nombre']
                    ));
        //llamando al método y pasándole el array con los parámetros
        $resultado = $client->call("registroPuntoVenta",$parametros);

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

            if ($resultado['RespuestaRegistroPuntoVenta']['transaccion'] == "true") 
            {    
                $resul['puntoVenta'] = $resultado['RespuestaRegistroPuntoVenta']['codigoPuntoVenta'];
                $resul['transaccion'] = true; 
                return $resul;             
            }
            else
            {                             
              $listaRespuesta['listarespuesta'] = $resultado['RespuestaRegistroPuntoVenta']['listaCodigosRespuestas']; 
              $contador = count($listaRespuesta['listarespuesta']);            

              if ($contador==1)
              {
                 $Obj =  json_decode(MensajeServicio::mostrar_error( $listaRespuesta['listarespuesta']),true); 

                 foreach ($Obj as $key => $value)
                 {
                   $resul['puntoVenta'] = $value." ";
                 }
              }
              else
              {
                for ($i=0; $i < $contador; $i++) 
                { 
                  $descripcion = MensajeServicio::mostrar_error($listaRespuesta['listarespuesta'][$i]);

                  foreach ($descripcion as $key => $value)
                  {
                    $resul['puntoVenta'] .= $value." ";
                  } 
                }  
                              
              }             
                               
              $resul['transaccion'] = false; 
              return $resul;    
          
            }
  }
}
?>
