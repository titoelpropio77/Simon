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
import { Button, Row, Container, Col, Form } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import TableAgGrid from "../table/TableAgGrid.js";
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
            //fields
            optionsSelected: "",
            optionsSelectedLic: "",
            password: "",
            name: "sdfdf",
            paterno: "",
            fechaInicio: "",
            licId: "",
            materno: "",
            email: "",
            repeatPassword: "",
            idPerfil: "",
            optionsElement: "",
            optionsElementLIc: ""
        };
        this.url = "usuario";
        this.onChangeValue = this.onChangeValue.bind(this);
        this.getByIdElement = this.getByIdElement.bind(this);
        this.field = this.field.bind(this);
        this.btnOpenModal = this.btnOpenModal.bind(this);
        this.deletedElement = this.deletedElement.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getSectorAll = this.getSectorAll.bind(this);
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
                    table={<NavTabs fields= {{ firstSection: this.field(), secondSection :this.secondSection() }} ></NavTabs> }
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
        return (
        <Form>
        <Row>
            <Button variant="primary">Adicionar Nuevo</Button>
        </Row>
        <Row>
            <Table
            url={this.state.urlDataTable}
            propertiesDataTable = {this.propertiesDataTable}
            getBydId={this.getByIdElement}
            deletedElement={this.deletedElement}
            />
        </Row>
        </Form>
        )
    }
    async saveForm() {
        const state = this.state;
        const fields = {
            name: state.name,
            email: state.email,
            paterno: state.paterno,
            materno: state.materno,
            repeatPassword: state.repeatPassword,
            password: state.password,
            perfil_id: state.idPerfil,
            licId: state.licId
        };
        const response = await saveDataForm(
            this.url,
            fields,
            this.state.elementId
        );
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

    async getPerfilAll() {
        const response = await getAllByClass("../getSectorAllForProyect");
        if (response.status) {
            // console.log(response.data);
            // response.data.push({ nombre: 'Sin Modulo' , id : 0});

            const data = response.data.map(x => ({
                label: x.nombre,
                value: x.id
            }));

            this.setState({ optionsElement: data });
        }
    }
    async getLicAll() {
        const response = await getAllByClass("getLicAllForUser");
        if (response.status) {
            // console.log(response.data);
            response.data.push({ licRepLegal: "Sin Licencia", id: 0 });

            const data = response.data.map(x => ({
                label: x.licRepLegal,
                value: x.id
            }));

            this.setState({ optionsElementLIc: data });
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
            <a
                variant="primary"
                href="proyecto/create"
                className="btn btn-success"
            >
                Adicionar nuevo {this.state.titleForm}
            </a>
        );
    }
    handleChange(value, nameObj) {
        switch (nameObj) {
            case "idPerfil":
                this.setState({
                    optionsSelected: value,
                    idPerfil: value.value
                });
                break;
            case "licId":
                this.setState({
                    optionsSelectedLic: value,
                    licId: value.value
                });
                break;
        }

        // console.log(value);
        // console.log(this.state.idModulo);
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
    field() {
        return (<Row>
            <Col xs ls="6" md="12">
                <Form.Label>Nombre Proyecto</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter email"
                    name="nombreProy"
                    value={this.state.name || ""}
                    onChange={this.onChangeValue}
                />
            </Col>
            <Col xs ls="6" md="6">
                <Form.Label>Cod. Sinsin</Form.Label>
                <Form.Control
                     type="text"
                     name="codSin"
                     value={this.state.paterno || ""}
                     onChange={this.onChangeValue}
                />
            </Col>
            <Col xs ls="6" md="6">
                <Form.Label>Funcionario Responsable</Form.Label>
                <Form.Control
                     type="text"
                     name="funcResp"
                     value={this.state.paterno || ""}
                     onChange={this.onChangeValue}
                />
            </Col>
            <Col xs ls="3" md="3">
                <Form.Label>Cod. Sectorial</Form.Label>
                <Select
                    name="idPerfil"
                    value={this.state.optionsSelected}
                    // onChange={value => this.handleChange(value, 'idPerfil')}
                    // options={this.state.optionsElement}
                />
            </Col>
            <Col xs ls="3" md="3">
                <label></label>
                <Select
                    name="licId"
                    placeholder="subSector"
                    value={this.state.optionsSelectedLic}
                    // onChange={value => this.handleChange(value, 'licId')}
                    // options={this.state.optionsElementLIc}
                />
            </Col>
            <Col xs ls="3" md="3">
            <label></label>
                <Select
                    name="licId"
                    placeholder="TipoProye"
                    value={this.state.optionsSelectedLic}
                    // onChange={value => this.handleChange(value, 'licId')}
                    // options={this.state.optionsElementLIc}
                />
            </Col>
            <Col xs ls="3" md="3">
                <Form.Label></Form.Label>
                <Form.Control
                     type="text"
                     name="funcResp"
                     placeholder="cod-sect"
                     readOnly={true}
                     value={this.state.paterno || ""}
                     onChange={this.onChangeValue}
                />
            </Col>
            <Col xs ls="4" md="4">
                <Form.Label>Fecha Inicio Programado</Form.Label>
                <InputMask
                    mask="99/99/9999"
                    className="form-control"
                    name="fechaInicio"
                    // dateFormat="dd/MM/yyyy"
                    onChange={this.onChangeValue}
                    value={this.state.fechaInicio}
                />
            </Col>
            <div className="col-md-4">
                <label>Duracion en mes</label>
                <input
                    type="text"
                    className="form-control"
                    name="repeatPassword"
                    value={this.state.repeatPassword || ""}
                    onChange={this.onChangeValue}
                ></input>
            </div>
            <div className="col-md-4">
                <label>Monto Total Comprometido</label>
                <input
                    type="text"
                    className="form-control"
                    name="repeatPassword"
                    value={this.state.repeatPassword || ""}
                    onChange={this.onChangeValue}
                ></input>
            </div>
            <div className="col-md-12">
                <label>Descripcion del Proyecto</label>
                <textarea row="50" className="form-control"></textarea>
            </div>
        </Row>);
    }
}
// export default Wrapper;
ReactDOM.render(<ProyectoCreate />, document.getElementById("contentBody"));
