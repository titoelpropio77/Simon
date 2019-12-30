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
import Alert from "react-bootstrap/Alert";
import EstructuraFinanciamiento from "./proyecto.EstructuraFinanciamiento"
import "react-datepicker/dist/react-datepicker-cssmodules.css";
// import TableAgGrid from "../table/TableAgGrid.js";
// import DatePicker from "react-datepicker";
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
            validated: false,
            navActive: "home",
            codSinSinGeneral: "",
            //fields

            nombreProy: "",
            codSinSin: "",
            funcResp: "",
            fechaInicio: "",
            codSelected: "", //codigo seleccionado EJ: 1-1-1

            duracionMes: "", // duracion en mes
            montoTotalCompartido: "",
            descripcion: "",

            sectorId: "",
            tipoProyectoId: "",
            subSectorId: "",

            //options Selected
            optionsSelectedSectorial: "",
            optionsSelectedLic: "",
            optionsSelectedTipoProyecto: "",

            optionsElementSectorial: "",
            optionsElementTipoProyecto: "",
            optionsElementSubSectorial: ""
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

        // if( proyectoId )
        // {
        //     getByIdElement(proyectoId)
        // }
        this.getSectorialAll();
        // this.modalBT = this.modalBT.bind(this);
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
                            fields={{
                                firstSection: this.field(),
                                secondSection: (
                                    <Localizacion
                                        codSinSin={this.state.elementId}
                                        nombreProy={this.state.nombreProy}
                                    />
                                ),
                                thirdSection : (<Confinaciadores
                                    codSinSin={this.state.elementId}
                                    nombreProy={this.state.nombreProy}
                                />),
                                quarterSection : (<Componentes
                                    codSinSin={this.state.elementId}
                                    nombreProy={this.state.nombreProy}
                                />),
                                 fifthSection :( <EstructuraFinanciamiento

                                 /> )
                            }}
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
            montoTotalCompartido: state.montoTotalCompartido,
            descripcion: state.descripcion,

            sectorId: state.sectorId,
            tipoProyectoId: state.tipoProyectoId,
            subSectorId: state.subSectorId
        };
        return fields;
    }
    async saveForm() {
        const response = await saveDataForm(
            this.url,
            this.maskFields(),
            this.state.elementId
        );
        console.log(response);
        if (response.status) {
            this.setState({
                statusModal: false,
                navActive: "localizacion",
                elementId: response.data.id,
                codSinSinGeneral: response.data.id
            });
            document.getElementById("proyecto_id").value = response.data.id;
            // reloadTableData();
        } else {
        }
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
            this.setState({
                nombreProy: data.pryNombre,
                codSinSin: data.codSinSin,
                fechaInicio: data.fechAprobacion,
                duracionMes: data.duracion,
                descripcion: data.pryDescripcion,
                codSinSin: data.pryCodSisin,
                // montoTotalCompartido : data.duracion,
                // funcResp : data.codSinSin,
                // email: data.email,
                // materno: data.materno,
                // paterno: data.paterno,
                // visibleEnMenu: data.visibleEnMenu,
                // tipoObjeto: data.tipoObjeto,
                // idPerfil: data.perfil_id,
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

    async getSectorialAll() {
        const response = await getAllByClass("../getSectorAllForProyect");
        if (response.status) {
            // console.log(response.data);
            // response.data.push({ nombre: 'Sin Modulo' , id : 0});

            const sectorial = response.data.sector.map(x => ({
                label: x.denominacion,
                sector: x.Sector,
                value: x.id
            }));
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
                optionsElementSectorial: sectorial,
                optionsElementSubSectorial: subSector,
                optionsElementTipoProyecto: tipoProyecto
            });
        }
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
    handleChangeSelected(value, nameObj) {
        console.log(value);
        switch (nameObj) {
            case "sector":
                // const {codSelected} = this.state;

                this.setState({
                    optionsSelectedSectorial: value,
                    sector: value.sector,
                    codSelected: value.sector
                });
                break;
            case "subSector":
                this.setState({
                    optionsSelectedSubSector: value,
                    subSectorId: value.value,
                    subSector: value.subSector,
                    codSelected: this.state.sector + "-" + value.subSector
                });
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
                    <Form.Control
                        type="text"
                        name="funcResp"
                        required={true}
                        value={this.state.funcResp || ""}
                        onChange={this.onChangeValue}
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
                        name="montoTotalCompartido"
                        value={this.state.montoTotalCompartido || ""}
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
