import React, { Component } from "react";
import Select from "react-select";
import ReactDOM from "react-dom";
import Table, { reloadTableData } from "../table/table.js";
import Wrapper from "../wrapper/Wrapper";
import ModalBT from "../modal/modal";
import Loading from "../loading/loading";
import NavTabs from "./NavTabs.js";
import InputMask from "react-input-mask";
import { Button, Row, Col, Form } from "react-bootstrap";
import Localizacion from "./proyecto.localizacion";
import Confinaciadores from "./proyecto.confinaciadores";
import Componentes from "./proyecto.Componentes.js";
import EstructuraFinanciamiento from "./proyecto.EstructuraFinanciamiento"
import "react-datepicker/dist/react-datepicker-cssmodules.css";

import {
    saveDataForm,
    getById,
    deletedElement,
    getAllByClass
} from "../tools/tools";
export default class ProyectoCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleForm: "Proyecto",
            urlDataTable: "getProyectoDataTable",
            elementId:
                document.getElementById("proyecto_id").value != 0
                    ? document.getElementById("proyecto_id").value
                    : null,
            statusModal: false,
            validated: true,
            //habilita y deshabilita el tab de estructura financiamiento
            disableTabEF: true,
            navActive: "home",
            codSinSinGeneral: "",
            //fields

            nombreProy: "",
            codSinSin: "",
            funcResp: "",
            fechaInicio: "",
            codSelected: "", //codigo seleccionado EJ: 1-1-1

            duracionMes: "", // duracion en mes
            montoTotalComprometido: "",
            descripcion: "",

            sectorId: "",
            tipoProyectoId: "",
            subSectorId: "",
            confinaciadoresAll : [],
            componenteAll : [],
            //options Selected
            optionsSelectedSectorial: "",
            optionsSelectedLic: "",
            optionsSelectedTipoProyecto: "",
            optionsSelectedFuncResponsable: "",

            optionsElementSectorial: "",
            optionsElementTipoProyecto: "",
            optionsElementSubSectorial: "",
            optionsElementFuncResponsable: "",
        };
        this.url = "../proyecto";
        this.onChangeValue = this.onChangeValue.bind(this);
        this.getByIdElement = this.getByIdElement.bind(this);
        this.field = this.field.bind(this);
        this.btnOpenModal = this.btnOpenModal.bind(this);
        this.deletedElement = this.deletedElement.bind(this);
        this.handleChangeSelected = this.handleChangeSelected.bind(this);
        this.maskFields = this.maskFields.bind(this);
        this.saveForm = this.saveForm.bind(this);
        this.getAllConfinaciadoresByProyecto = this.getAllConfinaciadoresByProyecto.bind(this);
        this.getComponenteByProyectId = this.getComponenteByProyectId.bind(this);
        this.changeNavTab = this.changeNavTab.bind(this);
        this.getSectorialAll();
    }
    render() {
        // const [show, setShow] = useState(false);
        return (
            <div>
                <Wrapper
                    loading={<Loading />}
                    urlSave={this.url}
                    title={this.state.titleForm}
                    // table = {<Table url={this.state.urlDataTable}  propertiesDataTable = {this.propertiesDataTable}  getBydId={this.getByIdElement}  deletedElement={this.deletedElement}/>}
                    table={
                        <NavTabs
                            navActive={this.state.navActive}
                            changeNavTab = {this.changeNavTab}
                            disableTabEF={this.state.disableTabEF}
                            fields={{
                                firstSection: this.field(),
                                secondSection: (
                                    <Localizacion
                                        codSinSin={this.state.codSinSinGeneral}
                                        nombreProy={this.state.nombreProy}
                                        changeNavTab = {this.changeNavTab}

                                    />
                                ),
                                thirdSection : (<Confinaciadores
                                    codSinSin={this.state.codSinSinGeneral}
                                    nombreProy={this.state.nombreProy}
                                    getAllConfinaciadoresByProyecto = {this.getAllConfinaciadoresByProyecto}
                                    changeNavTab = {this.changeNavTab}
                                    montoTotalComprometido ={this.state.montoTotalComprometido}
                                    />),
                                quarterSection : (<Componentes
                                    codSinSin={this.state.codSinSinGeneral}
                                    nombreProy={this.state.nombreProy}
                                    getComponenteByProyectId ={this.getComponenteByProyectId}
                                    changeNavTab = {this.changeNavTab}
                                    montoTotalComprometido ={this.state.montoTotalComprometido}

                                />),
                                 fifthSection :( <EstructuraFinanciamiento
                                    codSinSin={this.state.elementId}
                                    confinaciadoresAll ={this.state.confinaciadoresAll}
                                    nombreProy={this.state.nombreProy}

                                    componenteAll = {this.state.componenteAll}
                                    /> )

                            }}
                            // getAllConfinaciadoresByProy = {this.getAllConfinaciadoresByProy}
                            saveForm={this.saveForm}
                        ></NavTabs>
                    }
                    // field = {<Field onChangeValue ={this.onChangeValue} dataField ={this.state}/>}
                    // field = {this.field()}
                    modalBT={this.modalBT()}
                    // btnOpenModal={this.btnOpenModal()}
                    dataForm={this.state}
                ></Wrapper>
            </div>
        );
    }
    maskFields() {
        const state = this.state;
        const fields = {
            nombreProy: state.nombreProy,
            nombreProyGeneral: state.nombreProy,
            codSinSin: state.codSinSin,
            funcResp: state.funcResp,
            fechaInicio: state.fechaInicio,
            codSelected: saveDataForm.codSelected, //codigo seleccionado EJ: 1-1-1
            codSinSinGeneral: state.codSinSin,
            duracionMes: state.duracionMes, // duracion en mes
            montoTotalComprometido: state.montoTotalComprometido,
            descripcion: state.descripcion,
            funcId : state.optionsSelectedFuncResponsable.value,
            sectorId: state.sectorId,
            tipoProyectoId: state.tipoProyectoId,
            subSectorId: state.subSectorId
        };
        return fields;
    }
    async saveForm() {
        const dataSend = this.maskFields();
        let messageSend = { status: true, menssage : "", error:  "" };
        if( !dataSend.tipoProyectoId )
        {
            messageSend.status = false;
            messageSend.error = "Debe Seleccionar el Cod Sectorial hasta tipo de proyecto";
        }
        const response = await saveDataForm(
            this.url,
            dataSend,
            this.state.elementId,
            messageSend
        );

        if (response.status) {
            this.setState({
                statusModal: false,
                elementId: response.data.id,
                codSinSinGeneral: response.data.id
            });

            document.getElementById("proyecto_id").value = response.data.id;
            this.changeNavTab( "localizacion" );
            // reloadTableData();
        } else {
        }
    }
    /**
     * se cambia el valor del tab para cambiar de formulario
     * @param {nombre del tab} tabKey
     */
    changeNavTab( tabKey )
    {
        // console.log("changeNavTab");
        // console.log(tabKey);
        this.setState({ navActive: tabKey });
    }
    componentDidMount() {
        const proyectoId = document.getElementById("proyecto_id").value;
        if (proyectoId != 0) {
            this.getByIdElement(proyectoId);
        }
    }
    async getByIdElement(id) {
        const response = await getById(this.url, id);

        if (response.status) {
            this.setState({ elementId: id });
            let data = response.data;
            const subSector = response.data.subSector.map(x => ({
                subSector: x.subSector,
                label: x.denominacion,
                value: x.id
            }));
            const tipoProyecto = response.data.tipoProyecto.map(x => ({
                tipo: x.tipo,
                label: x.denominacion,
                value: x.id
            }));
            this.setState({
                nombreProy: data.pryNombre,
                fechaInicio: data.fechAprobacion,
                duracionMes: data.duracion,
                optionsElementSubSectorial: subSector,
                codSinSinGeneral : data.pryCodSisin,
                optionsElementTipoProyecto: tipoProyecto,
                descripcion: data.pryDescripcion,
                codSinSin: data.pryCodSisin,
                montoTotalComprometido : data.montoTotal,
                // licId: data.licencia ? data.licencia.id : 0,
                sector: data.sectorial.Sector.Sector,
                tipo: data.sectorial.tipo.tipo,
                subSector: data.sectorial.subSector.subSector,
                sectorId: data.sectorial.tipo.id,
                optionsSelectedSectorial: {
                    value: data.sectorial.Sector.id,
                    sector: data.sectorial.Sector.Sector,
                    label: data.sectorial.Sector.denominacion
                },
                optionsSelectedSubSector: {
                    value: data.sectorial.subSector.id,
                    subSector: data.sectorial.subSector,
                    label: data.sectorial.subSector.denominacion
                },
                optionsSelectedTipoProyecto: {
                    value: data.sectorial.tipo.id,
                    label: data.sectorial.tipo.denominacion
                },
                codSelected:
                    data.sectorial.Sector.Sector +
                    "-" +
                    data.sectorial.subSector.subSector +
                    "-" +
                    data.sectorial.tipo.tipo
            });
        }
    }
    async getComponenteByProyectId()
    {
        if ( document.getElementById("proyecto_id").value != 0 )
        {
            const response = await getAllByClass('../getComponentesByProyecto', { proyectoId : document.getElementById( 'proyecto_id' ).value });
            if( response.data.length )
            {
                this.setState({disableTabEF : false});
            }
            this.setState({componenteAll : response});
            return response;
        }
        this.setState({componenteAll : {}, disableTabEF : false});
        return {};
    }
    async getSectorialAll() {
        const response = await getAllByClass("../getSectorAllForProyect", { proyectoId : document.getElementById( 'proyecto_id' ).value });
        if (response.status) {
            const sectorial = response.data.sector.map(x => ({
                label: x.denominacion,
                sector: x.Sector,
                value: x.id
            }));
            const functResponsable = response.data.funcionario.map( x => ({
                label: x.name,
                value: x.id
            }));
            console.log("Holi mundo");
            this.setState({
                optionsElementSectorial: sectorial,
                optionsElementSubSectorial: [{label:"seleccione", value: 0}],
                optionsElementTipoProyecto: [{label:"seleccione", value: 0}],
                optionsElementFuncResponsable: functResponsable,
                optionsSelectedFuncResponsable: functResponsable[0],
            });
        }
    }
    async getAllConfinaciadoresByProyecto()
    {
        if ( document.getElementById("proyecto_id").value != 0 )
        {
            const response = await getAllByClass("../getAllConfinaciadoresByProy", {
                proyectoId: document.getElementById("proyecto_id").value
            });
            this.setState({confinaciadoresAll : response});
            return response;
        }
        this.setState({confinaciadoresAll : {}});
        return {};
    }
    async deletedElement(elementId) {
        const response = await deletedElement(this.url, elementId);
        if (response.status) {
            reloadTableData();
        } else {
        }
    }

    btnOpenModal() {
        return (
            <Button variant="primary" className="float-right">
                Adicionar Nuevo
            </Button>
        );
    }

    onChangeValue(e) {
        // console.log(e);
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    modalBT() {
        return (
            <ModalBT
                state={this.state.statusModal}
                closeModal={() =>
                    this.setState({ statusModal: false, elementId: 0 })
                }
                field={this.field()}
                // onChangeField={onChangeValue}
                title={this.state.titleForm}
                saveDataForm={() => this.saveForm()}
            />
        );
    }
    cleanForm() {
        this.setState({
            name: "",
            email: "",
            paterno: "",
            materno: "",
            repeatPassword: "",
            password: "",
            perfil_id: 0
        });
    }
    /**
     * retorna las columnas y la cabecera que se mostraran en el datatable
     */
    propertiesDataTable(elementId) {
        const columns = [
            {
                data: "pryNombre",
                render: function(type, data, row) {
                    return row.name + " " + row.paterno + " " + row.materno;
                }
            },
            {
                data: "pryNombre"
            },
            {
                data: "pryNombre"
            },
            {
                data: "pryNombre"
            },
            {
                data: "email"
            }
        ];
        let head = (
            <thead>
                <tr>
                    <th>Departamento</th>
                    <th>Provincia</th>
                    <th>Municipio</th>
                    <th>Comunidad</th>
                    <th>Localidad</th>
                    <th>Accion</th>
                </tr>
            </thead>
        );
        const btnActionUpdate = (
            <button
                className="btn btn-primary"
                onClick={() => this.getByElementId(elementId)}
            >
                <i className="fas fa-edit"></i>
            </button>
        );
        const btnActionDelete = (
            <button
                className="btn btn-danger"
                onClick={() => this.deletedElement(elementId)}
            >
                <i className="fas fa-trash-alt"></i>
            </button>
        );
        const btnActionOthers = "";
        return {
            columns: columns,
            head: head,
            targets: [6],
            btnActionDelete: btnActionDelete,
            btnActionUpdate: btnActionUpdate,
            btnActionOthers: btnActionOthers
        };
    }
    async handleChangeSelected(value, nameObj) {
        switch (nameObj) {
            case "sector":
                // const {codSelected} = this.state;
                const response  = await getAllByClass( '../getSectorialByCodigo', { nameObj: nameObj, sector:  value.sector  } );
                if( response.status )
                {
                    const subSector = response.data.map(x => ({
                        subSector: x.subSector,
                        label: x.denominacion,
                        value: x.id
                    }));
                    this.setState({
                        optionsElementSubSectorial: subSector,
                        optionsSelectedSubSector : {label : "seleccione", value : 0},
                        optionsSelectedTipoProyecto : {label : "seleccione", value : 0},
                        optionsSelectedSectorial: value,
                        sector: value.sector,
                        codSelected: value.sector
                    });
                }
                break;
            case "subSector":
                const responseSubSector  = await getAllByClass( '../getSectorialByCodigo', { nameObj: nameObj, sector:  this.state.sector, subSector : value.subSector  } );
                if( responseSubSector.status )
                {
                    const tipoProyecto = responseSubSector.data.map(x => ({
                        tipo: x.tipo,
                        label: x.denominacion,
                        value: x.id
                    }));
                    this.setState({
                        optionsElementTipoProyecto: tipoProyecto,
                        optionsSelectedSubSector: value,
                        optionsSelectedTipoProyecto : {label : "seleccione", value : 0},
                        subSectorId: value.value,
                        subSector: value.subSector,
                        codSelected: this.state.sector + "-" + value.subSector
                    });
                }
                break;
            case "tipoProyecto":
                this.setState({
                    optionsSelectedTipoProyecto: value,
                    tipoProyectoId: value.value,
                    sectorId: value.value,
                    codSelected:
                        this.state.sector +
                        "-" +
                        this.state.subSector +
                        "-" +
                        value.tipo
                });
                break;
        }

        // console.log(value);
        // console.log(this.state.idModulo);
    }
    field() {
        return (
            // <Form  noValidate validated={this.state.validated} onSubmit={this.saveForm}>
            <Row>
                {/* <Col xs ls="6" md="12"> */}
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                    <Form.Label>Nombre Proyecto</Form.Label>
                    <Form.Control
                        type="text"
                        required={true}
                        placeholder="nombre"
                        name="nombreProy"
                        value={this.state.nombreProy || ""}
                        onChange={this.onChangeValue}
                    />
                    <Form.Control.Feedback type="invalid">
                        El campo nombre es obligatorio
                    </Form.Control.Feedback>
                </Form.Group>
                {/* </Col> */}

                <Col xs ls="6" md="6">
                    <Form.Label>Cod. Sinsin</Form.Label>
                    <Form.Control
                        type="text"
                        required={true}
                        name="codSinSin"
                        value={this.state.codSinSin || ""}
                        onChange={this.onChangeValue}
                    />
                </Col>
                <Col xs ls="6" md="6">
                    <Form.Label>Funcionario Responsable</Form.Label>
                    <Select
                     options ={this.state.optionsElementFuncResponsable}
                     value ={this.state.optionsSelectedFuncResponsable}
                     onChange = { (value) => {
                        this.setState({ optionsSelectedFuncResponsable:value });
                     }}

                    />
                    <Form.Control.Feedback type="invalid">
                        El campo es obligatorio
                    </Form.Control.Feedback>
                </Col>
                <Col xs ls="3" md="3">
                    <Form.Label>Cod. Sectorial</Form.Label>
                    <Select
                        name="sectorId"
                        value={this.state.optionsSelectedSectorial}
                        onChange={value =>
                            this.handleChangeSelected(value, "sector")
                        }
                        options={this.state.optionsElementSectorial}
                    />
                </Col>
                <Col xs ls="3" md="3">
                    <label></label>
                    <Select
                        name="subSectorId"
                        placeholder="subSector"
                        value={this.state.optionsSelectedSubSector}
                        onChange={value =>
                            this.handleChangeSelected(value, "subSector")
                        }
                        options={this.state.optionsElementSubSectorial}
                    />
                </Col>
                <Col xs ls="3" md="3">
                    <label></label>
                    <Select
                        name="tipoProyectoId"
                        placeholder="TipoProye"
                        value={this.state.optionsSelectedTipoProyecto}
                        onChange={value =>
                            this.handleChangeSelected(value, "tipoProyecto")
                        }
                        options={this.state.optionsElementTipoProyecto}
                    />
                </Col>
                <Col xs ls="3" md="3">
                    <Form.Label></Form.Label>
                    <Form.Control
                        type="text"
                        name="codSelected"
                        placeholder="cod-sect"
                        readOnly={true}
                        value={this.state.codSelected || ""}
                        onChange={this.onChangeValue}
                    />
                </Col>
                <Col xs ls="4" md="4">
                    <Form.Label>Fecha Inicio Programado</Form.Label>
                    <InputMask
                        mask="99/99/9999"
                        className="form-control"
                        name="fechaInicio"
                        required={true}
                        onChange={this.onChangeValue}
                        value={this.state.fechaInicio}
                    />
                    <Form.Control.Feedback type="invalid">
                        El campo es obligatorio
                    </Form.Control.Feedback>
                </Col>
                <div className="col-md-4">
                    <label>Duracion en mes</label>
                    <input
                        type="text"
                        className="form-control"
                        name="duracionMes"
                        value={this.state.duracionMes || ""}
                        onChange={this.onChangeValue}
                    ></input>
                </div>
                <div className="col-md-4">
                    <label>Monto Total Comprometido</label>
                    <input
                        type="text"
                        className="form-control"
                        name="montoTotalComprometido"
                        value={this.state.montoTotalComprometido || ""}
                        onChange={this.onChangeValue}
                    ></input>
                </div>
                <div className="col-md-12">
                    <label>Descripcion del Proyecto</label>
                    <textarea
                        name="descripcion"
                        value={this.state.descripcion || ""}
                        onChange={this.onChangeValue}
                        row="50"
                        className="form-control"
                    ></textarea>
                </div>
            </Row>
            // </Form>
        );
    }
}
// export default Wrapper;
ReactDOM.render(<ProyectoCreate />, document.getElementById("contentBody"));
