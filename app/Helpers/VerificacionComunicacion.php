<?php 
namespace App\Helpers;
use nusoap_client;
use App\Helpers\MensajeSoap;  

class VerificacionComunicacion{

	 function __construct() {
        
    }

	public function verificar()
	{

        //url del web services 

        $wsdl = "https://presiatservicios.impuestos.gob.bo:39268/FacturacionSolicitudCufd?wsdl";
        //instanciando un nuevo objeto cliente para consumir el webservice
        $client = new nusoap_client($wsdl,'wsdl');
        //pasamos los parametros a un array
        $parametros = "";
        //llamando al método y pasándole el array con los parámetros
        $resultado = $client->call("verificarComunicacion");

        //si ocurre algún error al consumir el Web Service
            if ($client->fault) { // si
                $error = $client->getError();
            if ($error) { // Hubo algun error
                    //echo 'Error:' . $error;
                    //echo 'Error2:' . $error->faultactor;
                    //echo 'Error3:' . $error->faultdetail;faultstring
                    echo 'Error:  ' . $client->faultstring;
                }
                
                die();
            }

            //print_r($resultado['return']);
            $result= new MensajeSoap(); 
            $msg = $result->obtenerMensaje($resultado['return']);  
            if ($msg == "Comunicacion exitosa") 
            { 
              return true;
            }
            else
            {   //este error sale cundo los enpoint esta mal
            	//$msg="No se encontró ningún servicio.";
                return false;
            }            
	}

}

?>