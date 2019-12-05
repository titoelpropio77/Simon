import React, { useState } from "React";
import ReactDOM from "react-dom";
import Table from "../table/table.js";
import Wrapper from "../wrapper/Wrapper";
import ModalBT from "../modal/modal";
import Loading from "../loading/loading";
import { saveDataForm, getById } from "../tools/tools";
import Fields from "./Fields";
///alerts
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { useAlert } from "react-alert";

import Field from "./field.js";

const functions = () => {
    // const {form, inputs} = Fields;
    const url = 'modulo';
    return (
        <div>
                {/* <Provider template={AlertTemplate} {...options}></Provider> */}
                <Wrapper
                loading  = {<Loading />}
                urlSave = 'modulo'
                title='Modulo'
                table = {<Table url='getModeloAll' propertiesDataTable = {propertiesDataTable}  getBydId={getBy}/>}
                // field = {<Field onChangeValue ={this.onChangeValue} dataField ={this.state}/>}
                // field = {form}
                // modalBT = {<ModalBT
                //     state={setShow(true)}
                //     closeModal={() => setShow(false)}
                //     field={this.field()}
                //     // onChangeField={onChangeValue}
                //     title="Modulo"
                //     saveDataForm={() => saveForm}
                // />}
                btnOpenModal = {btnOpenModal()}
                // dataForm ={this.state}
                ></Wrapper>
            </div>
    );
    const saveForm = async () => {
        const response = await saveDataForm(url, inputs);
        if (response.status) {
            // setShow(false);
            reloadTableData();
        } else {
        }
    };
    const getBy = async id => {
        const response = await getById("modulo", id);
        if (response.status) {
            setShow(false);

            // await this.setState({ field: { nombre: response.data[0].nombre } });
            // await this.setState({ statusModal: true });
        }
    };

    const useSignUpForm = callback => {
        const [inputs, setInputs] = useState({});
        const handleSubmit = event => {
            if (event) {
                event.preventDefault();
            }
        };
        const handleInputChange = event => {
            event.persist();
            setInputs(inputs => ({
                ...inputs,
                [event.target.name]: event.target.value
            }));
        };
        return {
            handleSubmit,
            handleInputChange,
            inputs
        };
    };
     function modalBT () {
        return (
            <ModalBT
                state={this.state.statusModal}
                closeModal={() => this.setState({ statusModal: false })}
                field={this.field()}
                // onChangeField={onChangeValue}
                title="Modulo"
                saveDataForm={() => saveForm}
            />
        );
    };
    const btnOpenModal = () => {
        return (
            <button
                variant="primary"
                onClick={() => {

                    const alert = useAlert();
                    // alert.show("Oh look, an alert!");
                    // this.setState({
                    //     statusModal: true,
                    //     elementId: 0,
                    //     field: {
                    //         nombre: ""
                    //     }
                    // });
                }}
                className="btn btn-success"
            >
                Guardar
            </button>
        );
    };
    const field = () => {
        return (
            <form>
                <div className="row">
                    <div className="col-md-6">
                        <label>Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nombre"
                            value={this.state.field.nombre}
                            onChange={this.onChangeValue}
                            required
                        ></input>
                    </div>
                </div>
            </form>
        );
    };
    /**
     * retorna las columnas y la cabecera que se mostraran en el datatable
     */
    const propertiesDataTable = () => {
        const columns = [
            {
                data: "id"
            },
            {
                data: "nombre"
            },
            {
                data: "nombre",
                render: function(data, type, row) {
                    return row.nombre;
                }
            }
        ];
        let head = (
            <thead>
                <tr>
                    <th>id</th>
                    <th>Nombre</th>
                    <th>Accion</th>
                </tr>
            </thead>
        );
        return {
            columns: columns,
            head: head
        };
    };

};

 export default functions;

