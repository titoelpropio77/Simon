import React, { Component,useState } from 'React';
import ReactDOM  from 'react-dom';
import Table from "../table/table.js";
import Wrapper from '../wrapper/Wrapper';
import ModalBT from "../modal/modal";
import Loading from '../loading/loading';
import {saveDataForm,getById} from "../tools/tools";
///alerts
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { useAlert } from "react-alert";


import Field from './field.js';



const modelo= () => {
return (
    <div>
        <Provider template={AlertTemplate} {...options}></Provider>
        <Wrapper
        loading  = {<Loading />}
        urlSave = 'modulo'
        title='Modulo'
        table = {<Table url='getModeloAll' headTable = {this.headTable()} propertiesDataTable = {this.propertiesDataTable}  getBydId={this.getBy}/>}
        // field = {<Field onChangeValue ={this.onChangeValue} dataField ={this.state}/>}
        field = {this.field()}
        modalBT = {this.modalBT()}
        btnOpenModal = {this.btnOpenModal()}
        dataForm ={this.state}
        ></Wrapper>
    </div>
);
}

export default class  Modelo extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            titleForm :'Modulo',
            elementId : 0,
            statusModal : false,
            field : {
                nombre: '',
            }
          }
        this.url = 'modulo';
        this.onChangeValue = this.onChangeValue.bind(this);
        this.getBy = this.getBy.bind(this);
        this.field = this.field.bind(this);
        this.btnOpenModal = this.btnOpenModal.bind(this);
        // this.modalBT = this.modalBT.bind(this);

    }
    render(){
        const options = {
            timeout: 5000,
            position: positions.BOTTOM_CENTER
          };
        // const [show, setShow] = useState(false);
		return (
            <div>
                <Provider template={AlertTemplate} {...options}></Provider>
                <Wrapper
                loading  = {<Loading />}
                urlSave = 'modulo'
                title='Modulo'
                table = {<Table url='getModeloAll' headTable = {this.headTable()} propertiesDataTable = {this.propertiesDataTable}  getBydId={this.getBy}/>}
                // field = {<Field onChangeValue ={this.onChangeValue} dataField ={this.state}/>}
                field = {this.field()}
                modalBT = {this.modalBT()}
                btnOpenModal = {this.btnOpenModal()}
                dataForm ={this.state}
                ></Wrapper>
            </div>
            );


    };

    async saveForm ()  {
        const response = await saveDataForm(this.url,this.state.field);
        if( response.status )
        {
            this.setState({statusModal:false});
            reloadTableData();

        }
        else{

        }
    }
    async getBy (id)  {
        const response = await getById('modulo',id);
        if( response.status )
        {
           await this.setState({ field:{nombre : response.data[0].nombre } });
           await this.setState({statusModal:true});
        }
    }

    onChangeValue(e) {

        this.setState({
            [e.target.name]: e.target.value
        });

    }
    headTable()
    {
        return  [
            {title: 'Id'},
            {title: 'Nombre'},
            {title: 'Accion'},
        ];
    }
    btnOpenModal() {

        return (<button
            variant="primary"
            onClick={() => {
                const alert = useAlert();
                alert.show("Oh look, an alert!");
                this.setState({statusModal:true, elementId:0,
                    field: {
                        nombre : ''
                    }
                });
                }
            }
            className="btn btn-success"
        >
            Guardar {this.state.titleForm}
        </button>);
    }

    field ()
    {
        return (<div className="row">
            <div className="col-md-6">
                <label>Nombre</label>
                <input type="text" className="form-control" name="nombre" value={this.state.field.nombre} onChange={this.onChangeValue}></input>
            </div>

        </div>)
    }
    modalBT ()
    {
        return (<ModalBT
                state={this.state.statusModal}
                closeModal={() => this.setState({ statusModal:false })}
                field={this.field()}
                // onChangeField={onChangeValue}
                title='Modulo'
                saveDataForm={() =>
                    this.saveForm()
                }
            />);
    }
    /**
     * retorna las columnas y la cabecera que se mostraran en el datatable
    */
    propertiesDataTable ()  {
        const columns =[
            {
                "data" : "id"
            },
            {
                "data" : "nombre"
            },
            {
                "data" : "nombre",
                "render" :function(data, type, row){
                    return row.nombre
                }
            },
        ];
        let head =(<thead>
            <tr>
                <th>id</th>
                <th>Nombre</th>
                <th>Accion</th>
            </tr>
        </thead>);
        return {
            columns : columns,
            head : head
        };
    }
}
// export default Wrapper;
ReactDOM.render(<Modelo />, document.getElementById('contentBody'));
