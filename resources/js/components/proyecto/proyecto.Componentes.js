import React, { useState ,useEffect} from "react";
import { Button, Row, Col, Form, Alert } from "react-bootstrap";
import Select from "react-select";
import TablePersonalizate from "../table/tablePersonalizate.js";
import DatePicker from "react-datepicker";
import moment from "moment";
import ModalBT from "../modal/modal";
import alertify from 'alertifyjs';

import {
    saveDataForm,
    getById,
    deletedElement,
    getAllByClass,
    saveTypeDataForm
} from "../tools/tools";
import Hitos from "./Hitos";

const Componentes = props => {
    let dateNow = moment(Date.now()).format("YYYY-MM-DD");
    // const [startDate1, setStartDate1] = useState(new Date());
    //section hooks
    const [inputs, setInputs] = useState({
        fechaInicio: new Date(),
        fechaConclusion:new Date(),
        tipoEjecucion : "contratacionTerceros"
    });
    const [ totalDias, setTotalDias ] = useState(0);
    const [elementId, setElementId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [ rowTable, setRowTable ] = useState([]);
    const [validated, setValidated] = useState(false);
    //showHito open modal  of hito
    const [ showHito, setShowHito] = useState(false);
    const [ hito, setHito ] =useState(0);
    const [ dataRowHitos, setDataRowHitos ] = useState([]);
    const [ visibleBtnSave, setVisibleBtnSave ] = useState("block");
    const [ nombreComponente, setNombreCompente ] = useState("");
    /// en section
    const save = async () => {
        const fechaInicio = moment(inputs.fechaInicio).format("YYYY-MM-DD");
        const fechaConclusion = moment(inputs.fechaConclusion).format("YYYY-MM-DD");
        const response = await saveDataForm("../componente", {
            ...inputs,
            fechaInicio: fechaInicio,
            fechaConclusion: fechaConclusion,
            proyectoId: document.getElementById("proyecto_id").value,
            tiempoDuracion : totalDias
        }, elementId);
        if( response.status )
        {
            closeModal();
            getComponente();
        }

    };

    const getComponente = async () =>{
        const response = await props.getComponenteByProyectId();
        if( response.status )
        {
            const items = response.data.map( x => ({
                id: x.id,
                nombre: x.cmpNombre,
                fechaInicio: x.fechaInicio,
                duracionDias: x.duracionDias ,
                monto: x.cmpMonto
            }));
            setRowTable( items );
        }
    }
    useEffect(() =>{

        const diffTime = Math.abs(inputs.fechaConclusion - inputs.fechaInicio);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setTotalDias(diffDays)


    },[inputs.fechaConclusion, inputs.fechaInicio])
    useEffect(() => {
        getComponente();
    }, [])
    const deletedItem =  (id) =>
    {
        let token = document
        .querySelector("meta[name='csrf-token']")
        .getAttribute("content");
        alertify.confirm('Eliminar item', 'Esta seguro que desea eliminar ', async function(){
            var request = await fetch( '../componente' + "/" + id, {
               method: "DELETE",
               headers: {
                   "X-CSRF-TOKEN": token,
                   Accept: "application/json",
                   "Content-Type": "application/json"
               }
           })
           .then(res => res.json())
           .then(
                   result => {
                       if( result.status )
                       {
                           alertify.success(result.message);
                           getAllConfinaciadoresByProy();
                       }
                       else{
                            alertify
                            .alert("Error",result.message, function(){
                                 alertify.message('OK');
                            });
                       }
                       return result;
                   },
                   error => {

                       console.log(error);
                   }
               );
            return request;
        },
        function(){
           alertify.error('Cancelado');
        });

    }
    const field = () => {
        return (
            <Row>
                <Form.Group
                    as={Col}
                    md="12"
                    lg={12}
                    controlId="validationCustom10"
                >
                    <Form.Label column md="3" sm={3}>
                        Nombre del Componente
                    </Form.Label>
                    <Col sm={9} md="9" style={{ display: "inline-block" }}>
                        <Form.Control
                            type="text"
                            name="nombreComponente"
                            required={true}
                            onChange={onChangeValue}
                            value={inputs.nombreComponente ? inputs.nombreComponente : ""}
                        />
                    </Col>
                </Form.Group>
                <Form.Group //FechaInicio
                    as={Col}
                    md="6"
                    lg={6}
                    md={6}
                    controlId="fechaInicio"
                >
                    <Form.Label column md="6" sm={6}>
                        Fecha de Inicio Programada :
                    </Form.Label>
                    <Col sm={6} md="6" style={{ display: "inline-block" }}>
                        <DatePicker
                            selected={inputs.fechaInicio}
                            onChange={dateSelect => {
                                var dateFormat = moment(dateSelect).format(
                                    "YYYY-MM-DD"
                                );
                                setInputs({
                                    ...inputs,
                                    fechaInicio: dateSelect
                                });
                            }}
                            name="fechaInicio"
                            dateFormat="d/MM/yyyy"
                            className="form-control"
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="tiempoDuracion">
                    <Form.Label column sm="6">
                        Tiempo de Duración Días:
                    </Form.Label>
                    <Col md="6" sm="6" style={{ display: "inline-block" }}>
                        <Form.Control
                            name="tiempoDuracion"
                            required={true}
                            value={`Dias: ${totalDias}`}
                        />
                    </Col>
                </Form.Group>
                <Form.Group //fechaConclusion
                    as={Col}
                    md="6"
                    lg={6}
                    md={6}
                    controlId="fechaConclusion"
                >
                    <Form.Label column md="6" sm={6}>
                        Fecha de Conclusion Programada :
                    </Form.Label>
                    <Col sm={6} md="6" style={{ display: "inline-block" }}>
                        <DatePicker
                            name="fechaConclusion"
                            dateFormat="d/MM/yyyy"
                            className="form-control"
                            onChange={dateSelect => {
                                setInputs({
                                    ...inputs,
                                    fechaConclusion: dateSelect
                                });
                            }}
                            selected={inputs.fechaConclusion}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="costoComponente">
                    <Form.Label column sm="6">
                        Costo Del Componente
                    </Form.Label>
                    <Col md="6" sm="6" style={{ display: "inline-block" }}>
                        <Form.Control
                            type="number"
                            name="costoComponente"
                            required={true}
                            onChange={onChangeValue}
                            value={inputs ? inputs.costoComponente : ""}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} md="3" lg={3} md={3} controlId="">
                    <Form.Label column md="8">
                        Tipo de Ejecucion
                    </Form.Label>
                </Form.Group>
                <Form.Group  //contratacion Terceros
                    as={Col}
                    md="3"
                    lg={3}
                    md={3}
                    controlId="contratacionTerceros"
                >
                    <Form.Label column md="8">
                        Contratacion a Terceros
                    </Form.Label>
                    <Col md="4" sm="4" style={{ display: "inline-block" }}>
                        <Form.Check
                            type={"radio"}
                            name="tipoEjecucion"
                            required={true}
                            value="contratacionTerceros"
                            onChange={onChangeValue}
                            checked={
                                inputs.tipoEjecucion ===
                                "contratacionTerceros"
                                    ? true
                                    : false
                            }
                        />
                    </Col>
                </Form.Group>
                <Form.Group // administracionPropia
                    as={Col}
                    md="3"
                    lg={3}
                    md={3}
                    controlId="administracionPropia"
                >
                    <Form.Label column md="8">
                        Administracion Propia
                    </Form.Label>
                    <Col md="4" sm="4" style={{ display: "inline-block" }}>
                        <Form.Check
                            type={"radio"}
                            name="tipoEjecucion"
                            required={true}
                            onChange={onChangeValue}
                            checked={
                                inputs.tipoEjecucion ===
                                      "administracionPropia"
                                    ? true
                                    : false
                            }
                            value="administracionPropia"
                        />
                    </Col>
                </Form.Group>

                </Row>
        );
    };
    const getComponenteById = async( id ) => {
        setShowModal(true);
        const response = await getById('../componente', id);
        if( response.status )
        {
            const data= response.data;
            var fechaInicio = new Date(data.fechaInicio);
            var fechaConclusion = new Date(data.fechaConclusion);
            setElementId( id );
            setInputs(
                {
                    nombreComponente: data.cmpNombre,
                    tiempoDuracion: data.duracionDias,
                    costoComponente: data.cmpMonto,
                    fechaInicio: fechaInicio,
                    tipoEjecucion: data.cmpTipoEjecucion,
                    fechaConclusion: fechaConclusion
                }
            );
        }
    }
    const propertiesTableLocalizacion = () => {
        const columns =""
        let head = (
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Inicio Programado</th>
                    <th>Duración Días</th>
                    <th>Monto</th>
                    <th>Accion</th>
                </tr>
            </thead>
        );
        const btnActionUpdate = ""
        const btnActionDelete = ""
        const btnActionOthers = "";
        return {
            columns: columns,
            head: head,
            targets: [6],
            btnActionDelete: btnActionDelete,
            btnActionUpdate: btnActionUpdate,
            btnActionOthers: btnActionOthers
        };
    };
    /**
    *  extraer todos los hitos dado un elemento seleccionado en la tabla de componentes
    */
    const getHitosByIdComponente = async (id, nombreComponente) =>{
            setShowHito(true);
            setVisibleBtnSave("none");
            setHito(id);
            setNombreCompente(nombreComponente);
    }
    /**
     * renderiza el body de la table
     * **/
    const rowTableRender = (item, index) => {
        return (
            <tr key={ index }>
                <td>{item.nombre}</td>
                <td>{item.fechaInicio}</td>
                <td>{item.duracionDias}</td>
                <td>{item.monto}</td>
                <td>
                    <Button variant="primary" onClick={() => getComponenteById( item.id )}> <i className="fas fa-edit"></i> </Button>
                    <Button variant="warning" onClick={() => {  setHito( item.id ); getHitosByIdComponente(item .id, item.nombre) }} ><i class="fas fa-align-left"></i></Button>
                    <Button variant="danger" onClick={ () => deletedItem( item.id ) }> <i className="fas fa-trash-alt"></i> </Button>
                </td>
            </tr>
        );
    };
    const onChangeValue = event => {
        const name = [event.target.name];
        const value = event.target.value;
        setInputs(inputs => ({
            ...inputs,
            [name]: value
        }));
        console.log(inputs);
    };
    const closeModal = () =>{
        setShowModal(false);

        setInputs({
            nombreComponente : "",
            tiempoDuracion : "",
            costoComponente : "",
            fechaInicio: new Date(),
            fechaConclusion:  new Date(),
            tipoEjecucion : "contratacionTerceros"
        });
        setElementId(null);
    }
    const closeHito = () =>  {
        setShowHito(false);
        setVisibleBtnSave("block");

    }
    return (
        <Row>
            <ModalBT
                state ={showModal}
                field ={field()}
                title ={ 'Componente' }
                closeModal = {closeModal}
                saveDataForm = {save}
                visibleBtnSave ={ visibleBtnSave }
            />
            <Hitos nombreComponente={nombreComponente} showHito ={ showHito } closeHito ={closeHito} dataRowHitos={dataRowHitos} hito={hito}  visibleBtnSave ={ visibleBtnSave } />
            <Col lg={4} md={4}>
                <h2>Codigo SISIN: {props.codSinSin}</h2>
                &nbsp;&nbsp;&nbsp;&nbsp;
            </Col>
            <Col lg={4} md={4}>
                <h2>Nombre: {props.nombreProy}</h2>
            </Col>
                {field()}
                <Form.Group as={Col} md="3" lg={3} md={3}>
                    <Button variant="success" onClick={() => save()}>
                        Grabar en Lista
                    </Button>
                </Form.Group>
            <TablePersonalizate
                propertiesTable={propertiesTableLocalizacion}
                rowTable={rowTable}
                rowTableRender={rowTableRender}
                visibleBtnSave ={ visibleBtnSave }
            />
            <Row>
                {renderButton(document.getElementById('proyecto_id').value)}

            </Row>
        </Row>
    );
};


const renderButton = (id) => {
    if (id != 0){
        return(
            <React.Fragment>
                <Col lg={6} md={6}>
                    <Button variant="info float-right" type="button">
                        Ir Estructura Financiamiento
                    </Button>
                </Col>

                <Col lg={6} md={6}>
                    <Button
                        variant="success float-right"
                        type="button"
                        onClick={() => {
                            window.open(`../exportReportProyByType/${document.getElementById('proyecto_id').value}/componentes`);
                        }}>
                        Ver Reporte
                    </Button>
                </Col>
            </React.Fragment>
        );
    } else {
        return (
            <Col lg={12} md={12}>
                <Button variant="info float-right" type="button">
                    Ir Estructura Financiamiento
                </Button>
            </Col>
        );
    }
}

export default Componentes;
