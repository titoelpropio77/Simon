<?php 
 
namespace App\Helpers;
//use nusoap_client;
use DB;
use SimpleXMLElement;
use App\Empresa;
use App\EntityDebts;
use App\EntityDebtsDetails;
use App\MensajeServicio;
use lawiet\src\NuSoapClient;  
error_reporting(0);
class HandlerPagolAlianza
{
	const _USER_ALIANZA = 'pagol2';
	const _ALIANZA_PASSWORD = 'pagol2';
	const _ALIANZA_USER_PAYMENT = '9970';
	const _ALIANZA_HOST = 'http://qualitynet.alianza.com.bo/ws/DataSending.asmx';//testing
    const _ID_COMMERCE = "9630";
    const _ID_ACQUIRER = "205";
    const _MCC= "6300";
    const _PURCHASE_CURRENCY_CODE= "068";
    const _SHA2_PASARELA_TESTING = "fwvLexWVDKXZWykmj!9228575592";
    const _SHA2_PASARELA_PRODUCCION = "rbgKkUpEBHvvReFtWk$85788375397";
    const _COMISION = "5";// este valor esta en porcentaje
	// const $_ALIANZA_HOST = 'http://www.alianza.com.bo/ws/DataSending.asmx';//produccion
    const UrlApiPaymeModalTesting = "http://parol-test.s3-website-us-east-1.amazonaws.com/pay3.html";
    const _METHOD_InsCollectionMovil = '/insCollectionMovil';
	const _METHOD_reaClientReminders = '/reaClientReminders';
    const _CODE_COMMERCE_ASSOCIATED= "409709";
     const _COMMERCE_ASSOCIATED= "ALIANZA%203D";
   function __construct() 
   {}
   /**
	 * @deprecated
	 * @param $data  Detalle de todo
   */
   public static function  ObtenerDetalleFactura( $data )
   {
    $xmlString ="<ROOT fila='1'>";
    $status = true;
    $message = '';
  
    $debts = EntityDebtsDetails::entityDebtsDetailByEntityId( $data['id'] );
    foreach ( $debts as $value ) 
    {
        
        $fila = $key +1;
        $arrayCodeItem = explode("|", $value->internal_code);//0 = nPolicy, 1 =nContrat, 2 =nDraft , 3 = nReceipt
        
        $xmlString .= "<NewDataSet><reaClientRemindersNet><sClient>". $data[ 'dataClient' ][ 'client_code' ] . "</sClient><nPremium>" . $value->amount ."</nPremium><nReceipt>".$arrayCodeItem[3]."</nReceipt><nContrat>" .  $arrayCodeItem[1] . "</nContrat><nUser>pagol2</nUser><nDraft>".$arrayCodeItem[2]."</nDraft><sPayCC>2</sPayCC><nType>1</nType></reaClientRemindersNet></NewDataSet>";
        break;
    }
         $xmlString .= "</ROOT>";
         echo $xmlString;
        // $xml = new SimpleXMLElement($xmlString);
        // var_dump($xml);
        $xmlEncode = urlencode($xmlString);
        // $xmlEncode = htmlentities($xmlString,ENT_QUOTES | 'ENT_XML1');
         // echo $xmlEncode;
    	$URL= self::_ALIANZA_HOST.self::_METHOD_InsCollectionMovil;
        // $parameters = "nUser=".self::_USER_ALIANZA."&sPassword=" . self::_ALIANZA_PASSWORD . "&XmlElement=".$xml."&nType=1";

        // $parameters = "nUser=".self::_ALIANZA_USER_PAYMENT."&sPassword=" . self::_ALIANZA_PASSWORD . "&XmlElement=".$xmlString."&nType=1";
        $fields= array("nuser" => self::_ALIANZA_USER_PAYMENT, "sPassword" => self::_ALIANZA_PASSWORD , "XmlElement" => $xmlEncode, "nType" => 1 );

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,$URL);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($parameters );
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($fields) );
        $server_output = curl_exec($ch);
        curl_close ($ch);
        // $xmlArray = xmlrpc_decode($server_output);
        var_dump($server_output);
        // if ( $server_output )
        // {
        //     $arrayXmlReponse = new SimpleXMLElement($server_output);
        //     if ( $arrayXmlReponse['sError'][0] != "" ) 
        //     {
        //         $message= 'service alizanza response : '. $arrayXmlReponse[ 'sError' ];
        //         $data= $arrayXmlReponse;
        //         $status = false;
        //     }
        // }
        // // , $data => $data
        // $response = ['status' => $status , 'message' => $message];
        // return  $response ;
   }
   /**
    * @deprecated
    * @param clientCode  = contiene el codigo de cliente = J000000011212
    * @param companyCode  
    * @param debtsCode  1= Npolicy, 2 = nContrat , 3 = nDraft
   */
   public static function  obtenerDeudasClient($clientCode,  $companyCode,$debtsCode)
   {
        $status = true;
        $message = '';
        $data = [];
        $ch = curl_init();
        $companyCodeInt = $companyCode == "ALIANZA" ? "2" : "1";
        $URL= self::_ALIANZA_HOST.self::_METHOD_reaClientReminders.'?nUser='.self::_USER_ALIANZA.'&sPassword='.self::_ALIANZA_PASSWORD .'&sParamClient='.$clientCode.'&nCompany='.$companyCodeInt;
        try {
        // $URL= self::_ALIANZA_HOST.self::_METHOD_InsCollectionMovil.'?sUser='.$sUser.'&sPassword='.self::_ALIANZA_PASSWORD.'&sXml='.$xml.'&nType=1';
        curl_setopt($ch, CURLOPT_URL,$URL);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        //Set CURLOPT_RETURNTRANSFER so that the content is returned as a variable.
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
            $server_output = curl_exec($ch);    
        } catch (Exception $e) {
             $status = false;
            echo $e;
        }
         if ( $server_output )
        {
             $total = 0;
            $arrayXmlReponse = new SimpleXMLElement($server_output);
             // $data= $arrayXmlReponse;
            if ( $arrayXmlReponse['sError'][0] != "" ) 
            {
            // echo $arrayXmlReponse['sError'];
                $message= 'service alizanza response : '. $arrayXmlReponse['sError'];
                $status = false;
            }
            else
            {
                $arrayDebts = [];
                $dataSet = $arrayXmlReponse->NewDataSet->reaClientRemindersNet;
               
                foreach ( $dataSet as $key => $DataSetValue ) 
                {
                     $debtCodeResponse = $DataSetValue->nPolicy  ."|".  $DataSetValue->nContrat  ."|" .  $DataSetValue->nDraft ;//0 = nPolicy, 1 =nContrat, 2 =nDraft , 3 = nReceipt
                     
                    foreach ( $debtsCode as  $debtsCodeValue ) 
                    {
                        if ($debtCodeResponse == $debtsCodeValue) 
                        {
                            $nPremium = $DataSetValue->nCurrency == "2" ?   $DataSetValue->nPremium  * $DataSetValue->nExchange : $DataSetValue->nPremium ; // 2 code currency 
                            $total = $total + $nPremium;
                            $statusTaxted = $DataSetValue->sTaxed  == "1" ? "Active" : "Inactivo";
                            $arrayDebCodeRes = ["code" => $debtCodeResponse ."|" .  $DataSetValue->nReceipt, "amount" => $nPremium  , "description" => " ".$DataSetValue->sMessage , "status" =>  $statusTaxted];
                            array_push($arrayDebts, $arrayDebCodeRes);
                        }
                    }
                }
                $createEntityDebts = self::saveEntityDebts($companyCodeInt, $total , $message ,$server_output);
                if ( $createEntityDebts ) 
                {
                    self::saveEntityDebtDetails( $createEntityDebts, $arrayDebts  );
                }
                //var_dump( $dataSet);
            }

        }
        $response = ['status' => $status , 'message' => $message  , 'debts' => $arrayDebts, 'url' => $createEntityDebts['url_payme'], 
                    'id' => $createEntityDebts['id'],
                    'amount' => $createEntityDebts['amount'],
                    'total' => $createEntityDebts['total'],
                    'fee' => $createEntityDebts['fee'],
                    'id_operation' => $createEntityDebts['id_operation']
                    ];
        return  $response ;
   }
   public static function saveEntityDebtDetails( $entityDebts, $arrayDebts )
   {
        foreach ( $arrayDebts as  $value ) 
        {
            try {
                EntityDebtsDetails::create([
                'internal_code' => $value['code'],
                'entitydebts_id' => $entityDebts['id'],
                'amount' => $value['amount'],
                'description'=>  $value['description'],
                'status' =>   $value['status']
                 ]);    
            } catch (Exception $e) {
               return false; 
            }
            
        }
   }
   public static function saveEntityDebts($companyCode,  $amount , $message ,$server_output)
   {
        $resultQuery = DB::table( 'entity_debts' )->max( 'id_operation' );

        $idOperation = $resultQuery + 1;
        $fee = floatval($amount * self::_COMISION / 100);
        $total = round($amount + $fee, 2);
        $totalReplace = str_replace(".", "", $total);
        $internalCode = md5($idOperation. $companyCode . intval( $totalReplace ) );// genera el codigo interno 
        $prePurchaseVerification =  self::_ID_ACQUIRER . self::_ID_COMMERCE . $idOperation . $totalReplace . self::_PURCHASE_CURRENCY_CODE . self::_SHA2_PASARELA_TESTING ;
        $purchaseVerification= openssl_digest($prePurchaseVerification, 'sha512');
        $url = self::UrlApiPaymeModalTesting .'?acquirerId=' . self::_ID_ACQUIRER . 
                 '&idCommerce=' . self::_ID_COMMERCE .
                 '&purchaseAmount=' . $totalReplace .
                 '&purchaseOperationNumber=' . $idOperation .
                 '&purchaseVerification='. $purchaseVerification .
                 '&mcc='. self::_MCC.
                 '&codeCommerceAssociated='. self::_CODE_COMMERCE_ASSOCIATED .
                 '&commerceAssociated='. self::_COMMERCE_ASSOCIATED ;
        try {
                $create = EntityDebts::create([
                'company' => $companyCode,
                'id_operation' => $idOperation,
                'internal_code' => $internalCode,
                'id_acquirer' => self::_ID_ACQUIRER,
                'amount' => $amount,
                'description'=> $message,
                'server_output'=> $server_output,
                'fee' => $fee,
                'total' => $total,
                'url_payme' => $url
                ]);    
                return $create;
            } catch (Exception $e) {
                return false;
            }
   }
}
      