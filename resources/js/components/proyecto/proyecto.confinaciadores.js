import React, { useState, useEffect } from "react";
import { Button, Row, Col, Form, Alert } from "react-bootstrap";
import Select from "react-select";
import InputMask from "react-input-mask";
import TablePersonalizate from "../table/tablePersonalizate.js";
import DatePicker from "react-datepicker";
import moment from "moment";
import ModalBT from "../modal/modal";

import {
    saveDataForm,
    getById,
    deletedElement,
    getAllByClass,
    saveTypeDataForm
} from "../tools/tools";
const Confinaciadores = props => {
    let dateNow = moment(Date.now()).format("YYYY-MM-DD");
    const [inputs, setInputs] = useState({
        fechaConclusion: dateNow,
        fechaConvenio: dateNow,
        institucion: 0
    });
    const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState([
        { label: "Seleccion un tipo documento", value: 0 }
    ]);
    const [tipoDocumento, setTipoDocumento] = useState([
        { label: "Seleccion", value: 0 }
    ]);
    const [institucion, setInstitucion] = useState();
    const [institucionOptions, setInstitucionOptions] = useState([
        { label: "Seleccion", value: 0 }
    ]);
    const [startDate1, setStartDate1] = useState(new Date());
    const [startDate2, setStartDate2] = useState(new Date());
    const [validated, setValidated] = useState(false);
    const [rowTable, setRowTable] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [visibilityButton, setVisibilityButton] = useState( 'visible' );
    const [confinaciadorId, setConfinaciadorId] = useState( null);
    const [elementId, setElementId] = useState( null);
    const [rowFooter, setRowFooter] = useState([]);
    const [ totalMontoCof, setTotalMontoCof ] = useState();

    /**
     * Realiza una peticion al WS del confinacimiento dado un id
     * @param {id Del elemento a editar} id
     * @param {posicion de la fila a editar} indexRow
     */
    const handleGetElementById = async (id,indexRow) => {
        const response = await getById( '../confinaciamiento', id );
        setShowModal(true);
        setElementId(id);
        setVisibilityButton('hidden');
        if( response.status )
        {
            const data = response.data;
            setInputs({
                'indexRow':indexRow,
                'institucion' : data.instId,
                'nombreDocumento' : data.convNombre,
                'fechaConclusion' :  data.fechaConclusion,
                'fechaConvenio' : data.fechaFirma,
                'montoFinanciado' : data.convMonto,
                'montoFinanciadoSinActualizar' : data.convMonto,//este carga el monto para que pueda restar al monto total al actualizar
                'vigenciaDias' : data.convVigencia,
                'tipoDocumento' : data.tdocId,
            });


            // setStartDate1(data.fechaFirma);
            // setStartDate2(data.fechaConclusion);
            setTipoDocumento([{ label : data.tipo_documento.tDocNombre, value:data.tipo_documento.id   }]);

            setInstitucion( [{ label : data.institucional.denominacion, value : data.institucional.id } ]);
        }
    }

    const GetElementById = async (id) => {
        const response = await getById( '../confinaciamiento', id );
        // setShowModal(true);
        setElementId(id);
        // setVisibilityButton('hidden');
        if( response.status )
        {
            const data = response.data;
            setInputs({
                'institucion' : data.instId,
                'nombreDocumento' : data.convNombre,
                'fechaConclusion' :  data.fechaConclusion,
                'fechaConvenio' : data.fechaFirma,
                'montoFinanciado' : data.convMonto,
                'montoFinanciadoSinActualizar' : data.convMonto,//este carga el monto para que pueda restar al monto total al actualizar
                'vigenciaDias' : data.convVigencia,
                'tipoDocumento' : data.tdocId,
            });


            // setStartDate1(data.fechaFirma);
            // setStartDate2(data.fechaConclusion);
            setTipoDocumento([{ label : data.tipo_documento.tDocNombre, value:data.tipo_documento.id   }]);
            setInstitucion( [{ label : data.institucional.denominacion, value : data.institucional.id } ]);
        }
    }


    /**
     * llama al metodo getAllConfinamcimeto
     */
    const getAllConfinaciadoresByProy = async () => {
        const response  =  await props.getAllConfinaciadoresByProyecto();
        if (response.status) {
            // getAllConfinaciadoresByProy(response);
            // confinaciadoresAll=  response.data;
            const items = response.data.map(x => ({
                id: x.id,
                institucion: x.institucional.SIGLA,
                convPath: x.convPath,
                nombre: x.convNombre,
                fechaFirma: x.fechaFirma,
                duracionEnDias: x.convVigencia,
                monto: x.convMonto,
            }));
            const arrayMontos = items.map(x =>  x.monto);
            const totalMonto  = arrayMontos.reduce( (a,b) => a+b, 0 );
            setTotalMontoCof(totalMonto);
            setRowFooter(["TOTAL", "","","",  totalMonto]);
            setRowTable(items);
            GetElementById(items[0].id)
        }
    }
    const deletedItem = async (id) =>
    {
        const response = deletedElement( '../confinaciamiento',id );
        if( response.status )
        {
            getAllConfinaciadoresByProy();
        }

    }
    const dowloadFieldCofinaciadores = ( id ) => {
        window.open( '../dowloadFieldCofinaciadores/'+id );
    }
    const rowTableRender = (item, index) => {
        return (
            <tr key={index}>
                <td>{ item.institucion }</td>
                <td>{ item.nombre }</td>
                <td>{ item.fechaFirma }</td>
                <td>{ item.duracionEnDias }</td>
                <td>{ item.monto }</td>
                <td>
                    <Button variant={'primary'} onClick={ () => handleGetElementById( item.id, index ) }><i className="fas fa-edit"></i></Button>
                    <Button variant={'danger'} onClick={ () => deletedItem( item.id ) }><i className="fas fa-trash-alt"></i></Button>
                    <Button variant={'success'} onClick={ () => dowloadFieldCofinaciadores( item.id ) }>Descargar  Documento</Button>
                </td>
            </tr>
        );
    };
    const onChangeValue = event => {
        event.persist();
        setInputs(inputs => ({
            ...inputs,
            [event.target.name]: event.target.value
        }));
    };
    useEffect(() => {
        const getDocumentoAll = async () => {
            const response = await getAllByClass(
                "../getAllTypeDocumentForConfinaciamiento",
                {}
            );
            if (response.status) {
                const data = response.data.map(x => ({
                    label: x.tDocNombre,
                    value: x.id
                }));
                setTipoDocumentoOptions(data);
            }
        };
        const getInstitucionAll = async () => {
            const response = await getAllByClass(
                "../getInstitucionAllForConfinaciamiento",
                {}
            );
            if (response.status) {
                const data = response.data.map(x => ({
                    label: x.denominacion,
                    value: x.id
                }));
                setInstitucionOptions(data);
            }
        };
        getDocumentoAll();
        getInstitucionAll();
        getAllConfinaciadoresByProy();
    }, []);

    const propertiesTableLocalizacion = () => {
        const columns = (
            <tr>
                <td>adf</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
            </tr>
        );
        let head = (
            <thead>
                <tr>
                    <th>Institucio</th>
                    <th>Convenio Nombre-Numero</th>
                    <th>FechaFirma</th>
                    <th>Duracion En dias</th>
                    <th>Monto cofinaciado</th>
                    <th>Accion</th>
                </tr>
            </thead>
        );
        let footer = (
            <tfoot>
                <tr>
                    {rowFooter
                        ? rowFooter.map((item, index) =>
                              <td key={index}>{ item }</td>
                          )
                        : <td></td>}
                </tr>
            </tfoot>
        );
        const btnActionUpdate = (
            <button
                className="btn btn-primary"
                // onClick={() => this.getByElementId(elementId)}
            >
                <i className="fas fa-edit"></i>
            </button>
        );
        const btnActionDelete = (
            <button
                className="btn btn-danger"
                // onClick={() => this.deletedElement(elementId)}
            >
                <i className="fas fa-trash-alt"></i>
            </button>
        );
        const btnActionOthers = (<Button variant="success">Ver Documento</Button>);
        return {
            columns: columns,
            head: head,
            targets: [6],
            btnActionDelete: btnActionDelete,
            btnActionUpdate: btnActionUpdate,
            btnActionOthers: btnActionOthers,
            footer: footer
        };
    };
    const  updateForm =async () =>
    {
        const fileInput = document.getElementById("docConvenio").files[0];
        // primero se resta al valor total el monto del elemento con el monto cofinaciado anterior
        const totalMenosElemento = inputs.montoFinanciadoSinActualizar - totalMontoCof;
        const total = parseFloat(inputs.montoFinanciado) +parseFloat( totalMenosElemento );
        var messageSend = null;
        if( parseFloat(props.montoTotalComprometido) < total)
        {
            messageSend = { status : false, error : "El monto financiado total supera al monto comprometido del proyecto", message: "" };
        }

        var formData = new FormData();
        formData.append("docConvenio", fileInput);
        formData.append(
            "proyectoId",
            document.getElementById("proyecto_id").value
        );
        formData.append("institucion", inputs.institucion);
        formData.append("tipoDocumento", inputs.tipoDocumento);
        formData.append("nombreDocumento", inputs.nombreDocumento);
        formData.append("fechaConclusion", inputs.fechaConclusion);
        formData.append("fechaConvenio", inputs.fechaConvenio);
        formData.append("montoFinanciado", inputs.montoFinanciado);
        formData.append("vigenciaDias", inputs.vigenciaDias);
        formData.append( "elementId", elementId );
        const response = await saveTypeDataForm(
            "../confinaciamientoUpdate",
            formData,
            elementId,
            messageSend
        );
        if( response.status )
        {
            setVisibilityButton('visible');
            getAllConfinaciadoresByProy();
            setShowModal(false);
            cleanForm();
        }
    }
    const field = () => {
        return (
            <Row>
                <Form.Group
                    as={Col}
                    md="8"
                    lg={8}
                    md={8}
                    controlId="validationCustom10"
                >
                    <Form.Label>Intitucion de Confinaciamiento</Form.Label>
                    <Select
                        onChange={onChangeValue}
                        options={institucionOptions}
                        value={institucion}
                        required={true}
                        onChange={(e, meta) => {
                            setInputs({ ...inputs, institucion: e.value });
                            setInstitucion(e);
                        }}
                    />
                    <Form.Control.Feedback type="invalid">
                        El campo es obligatorio
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                    as={Col}
                    md="4"
                    lg={4}
                    md={4}
                    controlId="validationCustom11"
                >
                    <Form.Label>Tipo de Documento</Form.Label>
                    <Select
                        name="tipoDocumento"
                        options={tipoDocumentoOptions}
                        value={tipoDocumento}
                        onChange={(e, meta) => {

                            setInputs({ ...inputs, tipoDocumento: e.value });
                            setTipoDocumento(e);
                        }}
                    />
                    <Form.Control.Feedback type="invalid">
                        El campo es obligatorio
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                    as={Col}
                    md="12"
                    lg={8}
                    md={8}
                    controlId="validationCustom12"
                >
                    <Form.Label>Nombre del Documento</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombreDocumento"
                        required={true}
                        onChange={onChangeValue}
                        value={inputs ? inputs.nombreDocumento : ""}
                    />
                    <Form.Control.Feedback type="invalid">
                        El campo es obligatorio
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                    as={Col}
                    lg={4}
                    md={4}
                    controlId="validationCustom13"
                >
                    <Form.Label>Fecha de firma Convenio/Aprobacion</Form.Label>
                    <DatePicker
                        selected={startDate1}
                        className="form-control"
                        dateFormat="d/MM/yyyy"
                        name="fechaConvenio"
                        required=""
                        onChange={dateSelect => {
                            var fechaInicio = moment(dateSelect).format(
                                "YYYY-MM-DD"
                            );
                            const fechaConclusion = moment(inputs.fechaConclusion);
                            var vigenciaDias = fechaConclusion.diff( fechaInicio, 'days' );
                            if ( vigenciaDias < 0 )
                            {
                                alert("La fecha de convenio tiene que ser menor a la fecha de conclusion");
                                return;
                            }
                            setInputs({ ...inputs, fechaConvenio: fechaInicio, vigenciaDias: vigenciaDias });
                            setStartDate1(dateSelect);
                        }}
                    />
                </Form.Group>
                <Col lg={4} md={4}>
                    <Form.Label>Fecha de Conclusion</Form.Label>
                    <DatePicker
                        selected={startDate2}
                        name="fechaConclusion"
                        dateFormat="d/MM/yyyy"
                        className="form-control"
                        onChange={dateSelect => {
                            var fechaConclusion = moment(dateSelect).format(
                                "YYYY-MM-DD"
                            );
                            var fechaFin  = moment(fechaConclusion);
                            const fechaConvenio = moment(inputs.fechaConvenio);
                            var vigenciaDias = fechaFin.diff( fechaConvenio, 'days' );
                            if ( vigenciaDias < 0 )
                            {
                                alert("La fecha de convenio tiene que ser menor a la fecha de conclusion");
                                return;
                            }
                            setInputs({
                                ...inputs,
                                fechaConclusion: fechaConclusion,
                                vigenciaDias: vigenciaDias
                            });
                            setStartDate2(dateSelect);
                        }}
                    />
                </Col>
                <Form.Group
                    as={Col}
                    lg={4}
                    md={4}
                    controlId="validationCustom14"
                >
                    <Form.Label>Monto Financiado</Form.Label>
                    <Form.Control
                        type="text"
                        name="montoFinanciado"
                        type="number"
                        required={true}
                        onChange={onChangeValue}
                        value={inputs ? inputs.montoFinanciado : ""}
                    />
                    <Form.Control.Feedback type="invalid">
                        El campo es obligatorio
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                    as={Col}
                    lg={4}
                    md={4}
                    controlId="validationCustom15"
                >
                    <Form.Label>Vigencia de Días</Form.Label>
                    <Form.Control
                        type="text"
                        name="vigenciaDias"
                        required={true}
                        type="number"
                        onChange={onChangeValue}
                        value={inputs ? inputs.vigenciaDias : ""}
                    />
                    <Form.Control.Feedback type="invalid">
                        El campo es obligatorio
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} lg={4} md={4} controlId="docConvenio">
                    <Form.Label>Documento Convenio</Form.Label>
                    <Form.Control
                        name="docConvenio"
                        type="file"
                        onChange={onChangeValue}
                        // value={inputs ? inputs.vigenciaDias : ""}
                    />
                </Form.Group>
                <Form.Group as={Col} lg={8} md={8} >
                    <Form.Label></Form.Label>
                    <Button style={{ visibility:visibilityButton }} 
                            type="submit" variant={"primary pull-rigth"}>
                     Add List
                    </Button>
                </Form.Group>
            </Row>
        );
    };
    const saveForm = async event => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === true) {
            setValidated(false);
            const fileInput = document.getElementById("docConvenio").files[0];
            var formData = new FormData();
            formData.append("docConvenio", fileInput);
            formData.append(
                "proyectoId",
                document.getElementById("proyecto_id").value
            );
            const total = parseFloat(inputs.montoFinanciado) + parseFloat( totalMontoCof );
            var messageSend = null;
            if( parseFloat(props.montoTotalComprometido) < total)
            {
                messageSend = { status : false, error : "El monto Total Financiado supera al Monto Comprometido del proyecto", message: "" };
            }
            formData.append("institucion", inputs.institucion);
            formData.append("tipoDocumento", inputs.tipoDocumento);
            formData.append("nombreDocumento", inputs.nombreDocumento);//
            formData.append("fechaConclusion", inputs.fechaConclusion);//
            formData.append("fechaConvenio", inputs.fechaConvenio);//
            formData.append("montoFinanciado", inputs.montoFinanciado);//
            formData.append("vigenciaDias", inputs.vigenciaDias);//

            const response = await saveTypeDataForm(
                "../confinaciamiento",
                formData,
                elementId,
                messageSend
            );
            if( response.status )
            {
                getAllConfinaciadoresByProy();
                cleanForm();
            }
        } else {
            setValidated(true);
        }
    };
    const closeModal = () => {
        setValidated(false);
        setVisibilityButton('visible');
        cleanForm();
        setShowModal(false);
    }
    const cleanForm = () => {
        setInputs({
            nombreDocumento : '',
            montoFinanciado : '',
            vigenciaDias : '',
            fechaConclusion: dateNow,
            fechaConvenio: dateNow,
            institucion: 0,
            tipoDocumento: { label: "Seleccion", value: 0 }
        });
        setElementId(null);
    }
    return (
        <div>
            <ModalBT
            field={field()}
            state ={showModal}
            saveDataForm={updateForm}
            closeModal = {closeModal}
        />
        <Form
            incType="multipart/form-data"
            noValidate
            validated={validated}
            onSubmit={saveForm}
        >
            <Row>

                <Col lg={4} md={4}>
                    <h2>Codigo SISIN: {props.codSinSin}</h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                </Col>
                <Col lg={4} md={4}>
                    <h2>Nombre: {props.nombreProy}</h2>
                </Col>
                <Col lg={4} md={4}>
                    <h3>Monto Comprometido: </h3><span style={{ fontWeight: "bold" , fontSize: "19"}}>{props.montoTotalComprometido}</span>
                </Col>
            </Row>
            {field()}
            <br />
            <TablePersonalizate
                propertiesTable={propertiesTableLocalizacion}
                rowTable={rowTable}
                rowTableRender={rowTableRender}
            />
            <br />
            <Row>
                <Col lg={12} md={12}>
                    <Button variant="info float-right" type="button">
                        ir Componentes
                    </Button>
                </Col>
            </Row>
        </Form>
        </div>

    );
};

export default Confinaciadores;
