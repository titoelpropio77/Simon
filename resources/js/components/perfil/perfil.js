import React,{Component} from 'react';
import ReactDOM  from 'react-dom';
import Table,{reloadTableData } from "../table/table.js";
import Wrapper from '../wrapper/Wrapper';
import ModalBT from "../modal/modal";
import Loading from '../loading/loading';
import { Button, Row, Col, Form, Alert } from "react-bootstrap";
import {saveDataForm,getById , deletedElement} from "../tools/tools";
export default class  Perfil extends Component {

    constructor(props)
    {
        super(props);
        
        this.state = {
            titleForm :'Perfil',
            color:'success',
            urlDataTable :'getPerfilAll',
            elementId : 0,
            statusModal : false,
            field : {
                nombre: '',
            }
          }
        this.url = 'perfil';
        this.onChangeValue = this.onChangeValue.bind(this);
        this.getByIdElement = this.getByIdElement.bind(this);
        this.field = this.field.bind(this);
        this.btnOpenModal = this.btnOpenModal.bind(this);
        this.deletedElement = this.deletedElement.bind(this);

        // this.modalBT = this.modalBT.bind(this);

    }
    render(){

        // const [show, setShow] = useState(false);
		return (
            <div>
                <Wrapper
                loading  = {<Loading />}
                urlSave = {this.url}
                title={this.state.titleForm}
                table = {<Table url={this.state.urlDataTable}  propertiesDataTable = {this.propertiesDataTable}   getByElementId={this.getByIdElement}  deletedElement={this.deletedElement}/>}
                // field = {<Field onChangeValue ={this.onChangeValue} dataField ={this.state}/>}
                // field = {this.field()}
                modalBT = {this.modalBT()}
                btnOpenModal = {this.btnOpenModal()}
                dataForm ={this.state}
                ></Wrapper>
            </div>
            );


    };

    async saveForm (event)  {

        const response = await saveDataForm(this.url,this.state.field, this.state.elementId);
        if( response.status )
        {
            this.setState({statusModal:false});
            reloadTableData();

        }
        else{

        }
    }
    async getByIdElement (id)  {
        const response = await getById(this.url,id);

        if( response.status )
        {
            this.setState({elementId: id});
           await this.setState({ field:{nombre : response.data.nombre } });
           await this.setState({statusModal:true});
        }
    }
    async deletedElement (elementId)  {
        const response = await deletedElement(this.url, elementId);
        if( response.status )
        {
            reloadTableData();
        }
        else{

        }
    }
    onChangeValue(e) {

        this.setState({
            field :{[e.target.name]: e.target.value}
        });

    }
    btnOpenModal() {

        return (<Button
            onClick={() => {
                // this.state.color = 'warning';
                // this.setState({ color:'warning' });
                // const alert = useAlert();
                // alert.show("Oh look, an alert!");
                this.setState({statusModal:true, elementId:0,
                    field: {
                        nombre : ''
                    }
                });
                }
            }
            variant={this.state.color}
        >
            Adicionar {this.state.titleForm}
        </Button>);
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
                title={this.state.titleForm}
                saveDataForm={() =>
                    this.saveForm()
                }
            />);
    }
    /**
     * retorna las columnas y la cabecera que se mostraran en el datatable
    */
    propertiesDataTable (elementId)  {
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
        // const btnAction = 'Editar1';
        const btnActionUpdate = (<button className="btn btn-primary" onClick={() => this.getByElementId(elementId)}><i className="fas fa-edit"></i></button>);
        const btnActionDelete = (<button className="btn btn-danger" onClick={() => this.deletedElement(elementId)}><i className="fas fa-trash-alt"></i></button>);
        const btnActionOthers = (<a title="perfilObjeto" className="btn btn-warning" href={`perfilobjeto/${elementId}`}><i className="fas fa-newspaper"></i></a>);
        return {
            columns : columns,
            head : head,
            targets : [2],
            btnActionDelete : btnActionDelete,
            btnActionUpdate : btnActionUpdate,
            btnActionOthers : btnActionOthers
        };
    }
}
// export default Wrapper;
ReactDOM.render(<Perfil  />, document.getElementById('contentBody'));
