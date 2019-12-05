<?php 
namespace App\Helpers;

/**
 * 
 */
class MensajeSoap
{
	function __construct() {
        
    }
	public function obtenerMensaje($codigo)
	{
		switch ($codigo) {
			case '1':
			  $mensaje="Ambiente Ivalido";
			   return $mensaje;
			   break;

			case '2':				
			   $mensaje="Código de Sistema Invalido";
			   return $mensaje;
				break;

			case '3':
			   $mensaje = "Código Único de Inicio de Sistema (CUIS) Invalido";
			   return $mensaje;				
				break;

			case '4':
			     $mensaje="Código Único de Facturación Diario (CUFD) Invalido";
			   return $mensaje;					
				break;

			case '5':
			     $mensaje="Documento Fiscal Invalido";
			   return $mensaje;					
				break;

			case'6':
			     $mensaje="Tipo Emisión Invalido";
			   return $mensaje;	
			    break;

			case '7':
			     $mensaje="Modalidad Invalida";
			   return $mensaje;					
				break;

			case '8':
			     $mensaje="Sucursal Invalida";
			   return $mensaje;					
				break;

			case '9':
			     $mensaje="NIT Invalido";
			   return $mensaje;					
				break;

			case '10':
			     $mensaje="Archivo Invalido";
			   return $mensaje;					
				break;

			case '11':
			     $mensaje="Firma Incorrecta";
			   return $mensaje;					
				break;

			case'12':
			     $mensaje="Firma No corresponde al Contribuyente";
			   return $mensaje;	
			    break;

			case '13':
			    $mensaje="Código de Recepción Invalido";
			   return $mensaje;	 				
				break;

			case '14':
			    $mensaje="Numero Documento Fiscal Duplicado";
			   return $mensaje;	 				
				break;

			case '15':
			    $mensaje="Numero Documento Fiscal Inexistente";
			   return $mensaje;	 				
				break;

			case '16':
			    $mensaje="Nombre de Cajero con caracteres inválidos";
			   return $mensaje;	 				
				break;

			case '17':
			    $mensaje="Fecha Emision mayor a definido en normativa";
			   return $mensaje;	 				
				break;

			case '18':
			   $mensaje="Fecha Emision menor a definido en normativa";
			   return $mensaje;	  
			    break;

			case '19':
			    $mensaje="Tipo Documento Identidad Invalido";
			   return $mensaje;	 				
				break;

			case '20':
			    $mensaje="Código Único de Factura (CUF) Invalido";
			   return $mensaje;	 				
				break;

			case '21':
			    $mensaje="XML Invalido";
			   return $mensaje;	 				
				break;

			case '22':
			    $mensaje="El periodo_facturado no contiene un valor valido";
			   return $mensaje;	 				
				break;

			case '23':
			    $mensaje="El campo Estudiante es requerido para este tipo de factura";
			   return $mensaje;	 				
				break;

			case '24':
			   $mensaje="El Tipo Cambio es requerido en este tipo de factura";
			   return $mensaje;	  
			    break;

			case '25':
			    $mensaje="Incoterm es requerido en este tipo de factura";
			   return $mensaje;	 				
				break;

			case '26':
			    $mensaje="Puerto destino es requerido en este tipo de factura";
			   return $mensaje;	 				
				break;

			case '27':
			    $mensaje="Tipo moneda es requerido en este tipo de factura";
			   return $mensaje;	 				
				break;

			case '28':
			    $mensaje="Tipo de  Moneda Invalido";
			   return $mensaje;	 				
				break;

			case '29':
			    $mensaje="Precio valor bruto es requerido en este tipo de factura";
			   return $mensaje;	 				
				break;

			case '30':
			   $mensaje="Gastos transporte frontera es requerido en este tipo de factura";
			   return $mensaje;	  
			    break;

			case '31':
			    $mensaje="Gastos seguro frontera es requerido en este tipo de factura";
			   return $mensaje;	 				
				break;

			case '32':
			    $mensaje="Total fob frontera es requerido en este tipo de factura";
			   return $mensaje;				
				break;

			case '33':
			    $mensaje="Monto transporte internacional es requerido en este tipo de factura";
			   return $mensaje;				
				break;

			case '34':
			    $mensaje="Monto seguro internacional es requerido en este tipo de factura";
			   return $mensaje;				
				break;

			case '35':
			    $mensaje="Otros montos es requerido en este tipo de factura";
			   return $mensaje;				
				break;

			case '36':
			    $mensaje="Total Moneda es requerido en este tipo de factura";
			   return $mensaje;
			    break;

			case '37':
			    $mensaje="Total Puerto es requerido en este tipo de factura";
			   return $mensaje;				
				break;

			case '38':
			    $mensaje="Operador Turismo receptivo es requerido en este tipo de factura";
			   return $mensaje;				
				break;

			case '39':
			    $mensaje="Remitente es requerido en este tipo de factura";
			   return $mensaje;				
				break;

			case '40':
			    $mensaje="Consignatario es requerido en este tipo de factura";
			   return $mensaje;				
				break;

			case '41':
			    $mensaje="Placa es requerido en este tipo de factura";
			   return $mensaje;				
				break;

			case '42':
			    $mensaje="Código de pais es requerido en este tipo de factura";
			   return $mensaje;
			    break;

			case '43':
			    $mensaje="Código de País Invalido";
			   return $mensaje;				
				break;

			case '44':
			    $mensaje="Monto Ley 317 es requerido en este tipo de factura";
			   return $mensaje;				
				break;

			case '45':
			    $mensaje="Monto Total Sujeto a IVA es requerido en este tipo de factura";
			   return $mensaje;				
				break;

			case '46':
			    $mensaje="Monto Total Sujeto a IPJ es requerido en este tipo de factura";
			   return $mensaje;				
				break;

			case '47':
			    $mensaje="Monto Total IJ es requerido en este tipo de factura";
			   return $mensaje;				
				break;

			case '48':
			    $mensaje="Monto por diferencia de tipo de cambio es requerido en este tipo de factura";
			   return $mensaje;
			    break;        

			case '49':
			    $mensaje="Monto ICE es requerido en este tipo de factura";
			   return $mensaje;				
				break;

			case '50':
			    $mensaje="Monto IDH es requerido en este tipo de factura";
			   return $mensaje;				
				break;

			case '51':
			    $mensaje="Código de Producto Invalido";
			   return $mensaje;				
				break;

			case '52':
			    $mensaje="Producto no coincide con la actividad";
			   return $mensaje;				
				break;

			case '53':
			     $mensaje="Actividad Invalida";
			   return $mensaje;					
				break;

			case '54':
			    $mensaje="Monto total no coincide con la sumatoria de los subtotales y descuentos";
			   return $mensaje;	
			    break;

			case '55':
			    $mensaje="Calculo del subtotal incorrecto";
			   return $mensaje;					
				break;

			case '56':
			    $mensaje="Monto Ley 317 incorrecto";
			   return $mensaje;					
				break;

			case '57':
			    $mensaje="Monto Total Sujeto a IVA incorrecto";
			   return $mensaje;					
				break;

			case '58':
			    $mensaje="Monto Total Sujeto IPJ incorrecto";
			   return $mensaje;					
				break;

			case '59':
			    $mensaje="Monto Total IJ incorrecto";
			   return $mensaje;					
				break;

			case '60':
			    $mensaje="Monto ICE incorrecto";
			   return $mensaje;	
			    break;

			case '61':
			    $mensaje="Monto IDH incorrecto";
			   return $mensaje;					
				break;

			case '62':
			    $mensaje="Motivo de Anulación Invalido";
			   return $mensaje;					
				break;

			case '63':
			    $mensaje="Error de ejecución del servicio";
			   return $mensaje;					
				break;

			case '64':
			    $mensaje="Servicio de verificación de recepción incorrecto";
			   return $mensaje;					
				break;

			case '65':
			    $mensaje="Error de datos";
			   return $mensaje;					
				break;

			case '66':
			    $mensaje = "Comunicacion exitosa";
			   return $mensaje;	
			    break;

			case '67':
			    $mensaje="Error al recuperar datos básicos asociados al NIT";
			   return $mensaje;					
				break;

			case '68':
			    $mensaje="Error durante la validación de datos de emisor";
			   return $mensaje;					
				break;

			case '69':
			    $mensaje="Error durante la recepción de Nota Fiscal";
			   return $mensaje;					
				break;

			case '70':
			    $mensaje="Error durante la recepción de Nota Fiscal Paquete";
			   return $mensaje;					
				break;

			case '71':
			    $mensaje="Error durante la recepción del documento fiscal";
			   return $mensaje;					
				break;

			case '72':
			    $mensaje="Fecha Firma Invalida";
			   return $mensaje;	
			    break;

			case '73':
			    $mensaje="Firma Revocada";
			   return $mensaje;					
				break;

			case '74':
			    $mensaje="Certificado Firma Invalido";
			   return $mensaje;				
				break;
			case '75':
			    $mensaje="NIT no tiene asociada la modalidad";
			   return $mensaje;				
				break;
			case '76':
			    $mensaje="El NIT presenta marcas de control";
			   return $mensaje;				
				break;
			case '77':
			    $mensaje="NIT Inactivo";
			   return $mensaje;				
				break;
			case '78':
			    $mensaje="CUIS no esta vigente";
			   return $mensaje;
			    break;
			case '79':
			    $mensaje="CUIS no corresponde a la Sucursal/punto Venta";
			   return $mensaje;				
				break;
			case '80':
			    $mensaje="Codigo Documento Sector invalido";
			   return $mensaje;				
				break;
			case '81':
			    $mensaje="Codigo de Sector no corresponde al servicio";
			   return $mensaje;				
				break;
			case '82':
			    $mensaje="Punto de venta invalido";
			   return $mensaje;				
				break;
			case '83':
			    $mensaje="Anulacion Fuera de Plazo";
			   return $mensaje;				
				break;
			case '84':
			    $mensaje="Archivo no corresponde a la huella";
			   return $mensaje;
			    break;
			case '85':
			    $mensaje="Feha envío inválida";
			   return $mensaje;				
				break;
			case '86':
			    $mensaje="Factura Inexistente";
			   return $mensaje;				
				break;
			case '87':
			    $mensaje="Factura ya esta Anulada";
			   return $mensaje;				
				break;
			case '88':
			    $mensaje="Error en parámetros enviados al servicio";
			   return $mensaje;				
				break;
			case '89':
			    $mensaje="El Documento Fiscal no cumple con el formato del XSD especificado";
			   return $mensaje;				
				break;
			case '90':
			    $mensaje="Servicio solo habilitado para entorno de producción";
			   return $mensaje;
			    break;
			case '91':
			    $mensaje="Error de ejecución del servicio en validación a detalle del Documento Fiscal";
			   return $mensaje;				
				break;
			case '92':
			    $mensaje="Su catalogo ya se encuentra sincronizado";
			   return $mensaje;				
				break;	    
			case '93':
			    $mensaje="La Fecha y Hora ya se encuentra sincronizado";
			   return $mensaje;				
				break;
			case '94':
			    $mensaje="Factura no consignada correctamente";
			   return $mensaje;				
				break;		
			case '95':
			    $mensaje="Nit sin asociación con tipo documento sector";
			   return $mensaje;				
				break;
			case '96':
			    $mensaje="Código Método de Pago Inválido";
			   return $mensaje;				
				break;
			case '97':
			    $mensaje="97	Factura no disponible para anulación";
			   return $mensaje;				
				break;
			case '98':
			    $mensaje="Numero Documento de Identidad Invalido";
			   return $mensaje;				
				break;				
			case '99':
			    $mensaje="Nit Emisor Invalido";
			   return $mensaje;				
				break;	
			case '100':
			    $mensaje="Numero de Tarjeta Invalido";
			   return $mensaje;				
				break;
			case '101':
			    $mensaje="Monto Total en Moneda Invalido";
			   return $mensaje;				
				break;
			case '102':
			    $mensaje="Código de Producto SIN Invalido";
			   return $mensaje;				
				break;
			case '103':
			    $mensaje="Producto no coincide con Codigo Nandina";
			   return $mensaje;				
				break;
			case '104':
			    $mensaje="Sistema no asociado al contribuyente";
			   return $mensaje;				
				break;
			case '105':
			    $mensaje="Codigo de Autorizacion de Sincronizacion no valido";
			   return $mensaje;
			    break;
			case '106':
			    $mensaje="Campo Descripcion obligatorio";
			   return $mensaje;				
				break;
			case '107':
			    $mensaje="Codigo de Solicitud de nuevo valor de producto/servicio no valido";
			   return $mensaje;
			    break;
			case '108':
			    $mensaje="Solicitud de nuevo valor producto/servicio pendiente de respuesta";
			   return $mensaje;				
				break;
			case '109':
			    $mensaje="Solicitud de nuevo valor producto/servicio rechazada";
			   return $mensaje;				
				break;
			case '110':
			    $mensaje="Actualizar en la sincronización siguiente habilitada";
			   return $mensaje;				
				break;
			case '111':
			    $mensaje="Asociar al código de producto/servicio que se indica";
			   return $mensaje;				
				break;
			case '112':
			    $mensaje="Codigo de Recepcion de Evento Significativo no Habilitado";
			   return $mensaje;				
				break;
			case '113':
			    $mensaje="Formato de fecha incorrecta";
			   return $mensaje;
			    break;
			case '117':
			    $mensaje="Codigo Tipo Punto Venta invalido";
			   return $mensaje;				
				break;
			case '118':
			    $mensaje="Nombre Punto Venta vacio";
			   return $mensaje;				
				break;
			case '119':
			    $mensaje="Descripcion Punto Venta vacio";
			   return $mensaje;				
				break;
			case '120':
			    $mensaje="Codigo Evento invalido";
			   return $mensaje;				
				break;
			case '121':
			    $mensaje="Descripcion Evento vacio";
			   return $mensaje;				
				break;
			case '500':
			    $mensaje="Tiempo espera agotado Conexion a Base de Datos";
			   return $mensaje;
			    break;
			case '901':
			    $mensaje="Recepción Pendiente";
			   return $mensaje;				
				break;
			case '902':
			    $mensaje="Recepción Rechazada";
			   return $mensaje;				
				break;
			case '903':
			    $mensaje="Recepción Procesada";
			   return $mensaje;				
				break;
			case '904':
			    $mensaje="Recepción Observada";
			   return $mensaje;				
				break;
			case '905':
			    $mensaje="Anulación Confirmada";
			   return $mensaje;				
				break;
			case '906':
			    $mensaje="Anulación Rechazada";
			   return $mensaje;
			    break;
			case '907':
			    $mensaje="Anulación Pendiente de Confirmación";
			   return $mensaje;				
				break;
			case '908':
			    $mensaje="Recepción Validada";
			   return $mensaje;
			    break;
			case '909':
			    $mensaje="Anulada Procesado por PIN";
			   return $mensaje;				
				break;
			case '910':
			    $mensaje="Ya existe una solicitud de Anulación";
			   return $mensaje;				
				break;
			case '911':
			    $mensaje="Hash Invalido";
			   return $mensaje;				
				break;
			case '912':
			    $mensaje="Gestion incorrecta";
			   return $mensaje;				
				break;
			case '913':
			    $mensaje="Fecha ingreso hospedaje incorrecto";
			   return $mensaje;				
				break;
			case '914':
			    $mensaje="Documento medico incorrecto";
			   return $mensaje;
			    break;
			case '915':
			    $mensaje="NIT salon incorrecto";
			   return $mensaje;				
				break;
			case '916':
			    $mensaje="Fecha evento incorrecto";
			   return $mensaje;				
				break;
			case '917':
			    $mensaje="Monto total puerto incorrecto";
			   return $mensaje;				
				break;
			case '918':
			    $mensaje="Monto total fob frontera incorrecto";
			   return $mensaje;				
				break;
			case '919':
			    $mensaje="Codigo nandina incorrecto";
			   return $mensaje;				
				break;
			case '920':
			    $mensaje="Monto total devuelto incorrecto";
			   return $mensaje;
			    break;
			case '921':
			    $mensaje="Monto efectivo credito debito incorrecto";
			   return $mensaje;				
				break;
			case '922':
			    $mensaje="Monto original incorrecto";
			   return $mensaje;				
				break;
			case '923':
			    $mensaje="Monto Iehd incorrecto";
			   return $mensaje;				
				break;
			case '924':	
			    $mensaje="Ingreso diferencia cambio incorrecto";
			   return $mensaje;			
				break;		      
		
		}
	}	
}
?>