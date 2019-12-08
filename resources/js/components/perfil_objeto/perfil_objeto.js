import React, { Component } from "react";
import Select from "react-select";
import ReactDOM from "react-dom";
import Table, { reloadTableData } from "../table/table.js";
import Wrapper from "../wrapper/Wrapper";
import ModalBT from "../modal/modal";
import Loading from "../loading/loading";
import {
    saveDataForm,
    getById,
    deletedElement,
    getAllByClass
} from "../tools/tools";
export default class Objeto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleForm: "Perfil Objeto",
            urlDataTable: "../getPerfilObjetoDataTable",
            elementId: 0,
            statusModal: false,
            //fields
            objetoId : 0,
            objetoOptionElement :'',
            optionsSelected: { label: 'Seleccione un Objeto' , value : 0},
            puedeGuardar: 0,
            puedeEliminar: 0,
            idPerfil : document.getElementById('perfil_id').value,
            puedeImprimir: 0,
            puedeListar :0,
            puedeModificar: 0,
            puedeVerReporte: 0
        };
        // console.log(document.getElementById('perfil_id'));
        this.url = "../perfilobjeto";
        this.onChangeValue = this.onChangeValue.bind(this);
        this.getByIdElement = this.getByIdElement.bind(this);
        this.field = this.field.bind(this);
        this.btnOpenModal = this.btnOpenModal.bind(this);
        this.deletedElement = this.deletedElement.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getObjetoByPerfilId();

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
                    table={
                        <Table
                            url={this.state.urlDataTable}
                            propertiesDataTable={this.propertiesDataTable}
                            getByElementId={this.getByIdElement}
                            deletedElement={this.deletedElement}
                        />
                    }
                    // field = {<Field onChangeValue ={this.onChangeValue} dataField ={this.state}/>}
                    // field = {this.field()}
                    modalBT={this.modalBT()}
                    btnOpenModal={this.btnOpenModal()}
                    dataForm={this.state}
                ></Wrapper>
            </div>
        );
    }

    async saveForm() {
        const state = this.state;

        const fields = { puedeGuardar: state.puedeGuardar,
                        puedeEliminar : state.puedeEliminar,
                        puedeModificar: state.puedeModificar,
                        puedeListar : state.puedeListar,
                        puedeImprimir : state.puedeImprimir,
                        puedeVerReporte : state.puedeVerReporte,
                        idObjeto : state.objetoId,
                        idPerfil : state.idPerfil,
                     };
        const response = await saveDataForm(
            this.url,
            fields,
            this.state.elementId
        );
        if (response.status) {
            this.setState({ statusModal: false });
            reloadTableData();
            this.cleanForm();
            this.getObjetoByPerfilId();

        } else {
        }
    }
    cleanForm()
    {
        this.setState({
            objetoId : 0,
            optionsSelected: { label: 'Seleccione un Objeto' , value : 0},
            puedeGuardar: 0,
            puedeEliminar: 0,
            puedeListar: 0,
            puedeImprimir: 0,
            puedeModificar: 0,
            puedeVerReporte: 0
        });
    }
    async getByIdElement(id) {
        const response = await getById(this.url, id);
        if (response.status) {
            this.setState({ elementId: id });
            let data = response.data;
            await this.setState({
                puedeGuardar: data.puedeGuardar ? 1 : 0 ,
                puedeEliminar: data.puedeEliminar,
                puedeListar: data.puedeListar,
                puedeModificar: data.puedeModificar,
                puedeVerReporte: data.puedeVerReporte,
                puedeImprimir: data.puedeImprimir,
                objetoId: data.idObjeto,
                elementId : data.id,
                statusModal: true

            });
        }
    }

    async getObjetoByPerfilId() {
        const response = await getAllByClass("../getObjetoByPerfilId",{perfil_id : document.getElementById('perfil_id').value});
        if (response.status) {

            response.data.push({ nombre: 'Seleccione un Objeto' , id : 0});
            const data = response.data.map(x => ({
                label: x.nombre,
                value: x.id
            }));

            this.setState({ objetoOptionElement: data });
        }
    }
    async deletedElement(elementId) {
        const response = await deletedElement(this.url, elementId);
        if (response.status) {
            reloadTableData();
            this.getObjetoByPerfilId();
        } else {
        }
    }
    onChangeValue(e) {
        var value = e.target.value == 1 ? 0 : 1;
        this.setState({
            [e.target.name]: value
        });
    }
    handleChangeSelect(value) {
        this.setState({ optionsSelected: value, objetoId: value.value })
    }
    btnOpenModal() {
        return (
            <div className="row">
                    <div className="col  col-md-2 col-lg-4">
                        <label>Objeto</label>
                        <Select
                        name='objetIid'
                        value = {this.state.optionsSelected}
                        options = {this.state.objetoOptionElement}
                        onChange={
                            value =>
                                    this.handleChangeSelect(value)
                            }
                          />
                    </div>
                    <div className="col  col-md-8">
                        {this.checkBoxFunction()}
                        <button

                            onClick={() => {
                                this.saveForm();
                                // const alert = useAlert();
                                // alert.show("Oh look, an alert!");
                                // this.setState({statusModal:true, elementId:0,
                                //     field: {
                                //         nombre : ''
                                //     }
                                // });
                            }}
                            className="btn btn-success"
                        >
                            Guardar {this.state.titleForm}
                        </button>
                    </div>
                </div>
        );
    }
    checkBoxFunction() {
        return (
            <label>
                <label>
                    Guardar
                    <input
                        type="checkbox"
                        name="puedeGuardar"
                        checked={this.state.puedeGuardar}
                        value={this.state.puedeGuardar}
                        onChange={this.onChangeValue}
                    />
                </label>
                <label>
                    Modificar
                    <input
                        type="checkbox"
                        name="puedeModificar"
                        checked={this.state.puedeModificar}
                        value={this.state.puedeModificar}
                        onChange={this.onChangeValue}
                    />
                </label>
                <label>
                    Eliminar
                    <input
                        type="checkbox"
                        name="puedeEliminar"
                        checked={this.state.puedeEliminar}
                        value={this.state.puedeEliminar}
                        onChange={this.onChangeValue}
                    />
                </label>
                <label>
                    Puede Visionar
                    <input
                        type="checkbox"
                        name="puedeListar"
                        checked={this.state.puedeListar}
                        value={this.state.puedeListar}
                        onChange={this.onChangeValue}
                    />
                </label>
                <label>
                    Ver Reporte
                    <input
                        type="checkbox"
                        name="puedeVerReporte"
                        checked={this.state.puedeVerReporte}
                        value={this.state.puedeVerReporte}
                        onChange={this.onChangeValue}
                    />
                </label>
                <label>
                    Imprimir
                    <input
                        type="checkbox"
                        name="puedeImprimir"
                        checked={this.state.puedeImprimir}
                        value={this.state.puedeImprimir}
                        onChange={this.onChangeValue}
                    />
                </label>
            </label>
        );
    }
    handleChange(value) {
        this.setState({ optionsSelected: value, objetoId: value.value });

    }

    field() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <label>Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        value={this.state.nombre || ""}
                        onChange={this.onChangeValue}
                    ></input>
                </div>
                <div className="col-md-6">
                    <label>Tipo</label>
                    <select
                        name="tipoObjeto"
                        onChange={this.onChangeValue}
                        value={this.state.tipoObjeto}
                        className="form-control"
                    >
                        <option value="FORMULARIO">Formulario</option>
                        <option value="REPORTE">Reporte</option>
                        <option value="OTROS">Otros</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label>Url</label>
                    <input
                        type="text"
                        className="form-control"
                        name="urlObjeto"
                        value={this.state.urlObjeto || ""}
                        onChange={this.onChangeValue}
                    ></input>
                </div>
                <div className="col-md-6">
                    <label>Modulo</label>
                    <Select
                        name="idModulo"
                        value={this.state.optionsSelected}
                        onChange={value => this.handleChange(value)}
                        options={this.state.moduloOptionElement}
                    />
                </div>
                <div className="col-md-6">
                    <label>Visible en menu</label>
                    <select
                        name="visibleEnMenu"
                        value={this.state.visibleEnMenu}
                        onChange={this.onChangeValue}
                        className="form-control"
                    >
                        <option value="SI">SI</option>
                        <option value="NO">NO</option>
                    </select>
                </div>
            </div>
        );
    }
    modalBT() {
        return (
            <ModalBT
                state={this.state.statusModal}
                closeModal={() => {
                    this.setState({ statusModal: false })
                    this.cleanForm();
                }
                    }
                field={this.checkBoxFunction()}
                // onChangeField={onChangeValue}
                title={this.state.titleForm}
                saveDataForm={() => this.saveForm()}
            />
        );
    }
    /**
     * retorna las columnas y la cabecera que se mostraran en el datatable
     */
    propertiesDataTable(elementId) {
        const columns = [
            {
                data: "puedeGuardar",
                render: function(data, type, row) {
                    var nombreObjet = row.objeto
                        ? row.objeto.nombre
                        : "sin Objeto";
                    return nombreObjet;
                }
            },
            {
                data: "puedeGuardar"
            },
            {
                data: "puedeModificar"
            },
            {
                data: "puedeEliminar"
            },
            {
                data: "puedeListar"
                // render : function(data, type, row)
                // {
                //     console.log(row.modulo.nombre);
                //     return row.modulo.nombre;
                // }
            },
            {
                data: "puedeVerReporte"
            },
            {
                data: "puedeImprimir"
            },
            {
                data: "puedeVerReporte"
            }
        ];
        let head = (
            <thead>
                <tr>
                    <th>Objeto</th>
                    <th>Guardar</th>
                    <th>Modificar</th>
                    <th>Eliminar</th>
                    <th>Visionar</th>
                    <th>Ver Reporte</th>
                    <th>Imprimir</th>
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
                onClick={() => {
                    this.deletedElement(elementId)
                }
            }
            >
                <i className="fas fa-trash-alt"></i>
            </button>
        );
        const btnActionOthers = "";
        const dataSend = {
            perfil_id: document.getElementById("perfil_id").value
        };
        return {
            columns: columns,
            head: head,
            targets: [7],
            btnActionDelete: btnActionDelete,
            btnActionUpdate: btnActionUpdate,
            btnActionOthers: btnActionOthers,
            dataSend: dataSend
        };
    }
}
// export default Wrapper;
ReactDOM.render(<Objeto />, document.getElementById("contentBody"));
