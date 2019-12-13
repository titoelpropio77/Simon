import React, { Component } from "react";
import Select from "react-select";
import ReactDOM from "react-dom";
import Table, { reloadTableData } from "../table/table.js";
import Wrapper from "../wrapper/Wrapper";
import ModalBT from "../modal/modal";
import Loading from "../loading/loading";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import NavTabs from "./NavTabs.js";
import InputMask from "react-input-mask";
import { Button, Row,  Col, Form , } from "react-bootstrap";
import Localizacion from "./proyecto.localizacion"
import Alert from "react-bootstrap/Alert";
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

            elementId: 0,
            statusModal: false,
            validated : false,
            //fields

            nombreProy: "",
            codSinSin: "",
            funcResp: "",
            fechaInicio: "",
            codSelected : "",//codigo seleccionado EJ: 1-1-1

            duracionMes: "",// duracion en mes
            montoTotalCompartido: "",
            descripcion: "",

            sectorId: "",
            tipoProyectoId: "",
            subSectorId: "",

            //options Selected
            optionsSelectedSectorial: "",
            optionsSelectedLic: "",
            optionsSelectedTipoProyecto : "",

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
                    table={<NavTabs fields= {{ firstSection: this.field(), secondSection :<Localizacion/> } } saveForm={this.saveForm} ></NavTabs> }
                    // field = {<Field onChangeValue ={this.onChangeValue} dataField ={this.state}/>}
                    // field = {this.field()}
                    modalBT={this.modalBT()}
                    // btnOpenModal={this.btnOpenModal()}
                    dataForm={this.state}
                ></Wrapper>
            </div>
        );
    }

    secondSection ()
    {
        // return (
        // <Form>
        // <Row>
        //     <h2>Codigo SISIN: {this.state.codSinSin}</h2>&nbsp;&nbsp;&nbsp;&nbsp;
        //     <h2>Nombre del Proyecto {this.state.nombreProy}</h2>
        //     <Button variant="primary float-right" >Adicionar Nuevo</Button>
        // </Row>
        //     <Table
        //     url={this.state.urlDataTable}
        //     propertiesDataTable = {this.propertiesDataTable}
        //     getBydId={this.getByIdElement}
        //     deletedElement={this.deletedElement}
        //     />
        // <Row>
        //     <Button variant="success">Ver mapa</Button>
        //     <Button variant="warning float-right">Grabar e ir Confinaciadores</Button>
        // </Row>
        // </Form>
        // )
    }
    maskFields () {
        const state = this.state;
        const fields = {
            nombreProy: state.nombreProy,
            codSinSin: state.codSinSin,
            funcResp: state.funcResp,
            fechaInicio: state.fechaInicio,
            codSelected : saveDataForm.codSelected,//codigo seleccionado EJ: 1-1-1

            duracionMes: state.duracionMes,// duracion en mes
            montoTotalCompartido: state.montoTotalCompartido,
            descripcion: state.descripcion,

            sectorId: state.sectorId,
            tipoProyectoId: state.tipoProyectoId,
            subSectorId: state.subSectorId,
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
            this.setState({ statusModal: false });
            reloadTableData();
        } else {

        }
    }
    async getByIdElement(id) {
        const response = await getById(this.url, id);

        if (response.status) {
            this.setState({ elementId: id });
            let data = response.data;
            await this.setState({
                name: data.name,
                email: data.email,
                materno: data.materno,
                paterno: data.paterno,
                visibleEnMenu: data.visibleEnMenu,
                tipoObjeto: data.tipoObjeto,
                idPerfil: data.perfil_id,
                licId: data.licencia ? data.licencia.id : 0,
                optionsSelected: {
                    value: data.perfil_id,
                    label: data.perfil.nombre
                },
                optionsSelectedLic: {
                    value: data.licencia ? data.licencia.id : 0,
                    label: data.licencia
                        ? data.licencia.licRepLegal
                        : "Sin Licencia"
                },
                statusModal: true
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
                value: x.id
            }));
            const subSector = response.data.subSector.map(x => ({
                label: x.denominacion,
                value: x.id
            }));
            const tipoProyecto = response.data.tipoProyecto.map(x => ({
                label: x.denominacion,
                value: x.id
            }));

            this.setState({ optionsElementSectorial: sectorial , optionsElementSubSectorial : subSector, optionsElementTipoProyecto : tipoProyecto });
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
        switch (nameObj) {
            case "sector":
                this.setState({
                    optionsSelectedSectorial: value,
                    sectorId: value.value
                });
                break;
            case "subSector":
                this.setState({
                    optionsSelectedSubSector: value,
                    subSectorId: value.value
                });
                break;
            case "tipoProyecto":
                this.setState({
                    optionsSelectedTipoProyecto: value,
                    tipoProyectoId: value.value
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
                <Form.Control.Feedback  type="invalid">El campo nombre es obligatorio</Form.Control.Feedback>
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
                <Form.Control.Feedback  type="invalid">El campo es obligatorio</Form.Control.Feedback>
            </Col>
            <Col xs ls="3" md="3">
                <Form.Label>Cod. Sectorial</Form.Label>
                <Select
                    name="sectorId"
                    value={this.state.optionsSelectedSectorial}
                    onChange={value => this.handleChangeSelected(value, 'sector')}
                    options={this.state.optionsElementSectorial}
                />
            </Col>
            <Col xs ls="3" md="3">
                <label></label>
                <Select
                    name="subSectorId"
                    placeholder="subSector"
                    value={this.state.optionsSelectedSubSector}
                    onChange={value => this.handleChangeSelected(value, 'subSector')}
                    options={this.state.optionsElementSubSectorial}
                />
            </Col>
            <Col xs ls="3" md="3">
            <label></label>
                <Select
                    name="tipoProyectoId"
                    placeholder="TipoProye"
                    value={this.state.optionsSelectedTipoProyecto}
                    onChange={value => this.handleChangeSelected(value, 'tipoProyecto')}
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
                    // dateFormat="dd/MM/yyyy"
                    onChange={this.onChangeValue}
                    value={this.state.fechaInicio}
                />
                <Form.Control.Feedback  type="invalid">El campo es obligatorio</Form.Control.Feedback>
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
                <textarea name="descripcion" value={this.state.descripcion || ""}  onChange={this.onChangeValue} row="50" className="form-control"></textarea>
            </div>
        </Row>
        // </Form>
        );
    }
}
// export default Wrapper;
ReactDOM.render(<ProyectoCreate />, document.getElementById("contentBody"));
