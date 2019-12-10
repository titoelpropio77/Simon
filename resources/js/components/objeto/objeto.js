import React,{Component} from 'react';
import Select from 'react-select';
import ReactDOM  from 'react-dom';
import Table,{reloadTableData } from "../table/table.js";
import Wrapper from '../wrapper/Wrapper';
import ModalBT from "../modal/modal";
import Loading from '../loading/loading';
import {saveDataForm,getById , deletedElement, getAllByClass} from "../tools/tools";
export default class  Objeto extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            titleForm :'Objeto',
            urlDataTable :'getObjetoDataTable',
            elementId : 0,
            statusModal : false,
            //fields
            optionsSelected : '',
            urlObjeto: '',
            nombre: '',
            tipoObjeto: 'Formulario',
            visibleEnMenu: 'SI',
            idModulo : '',
            moduloOptionElement : ''

          }
        this.url = 'objeto';
        this.onChangeValue = this.onChangeValue.bind(this);
        this.getByIdElement = this.getByIdElement.bind(this);
        this.field = this.field.bind(this);
        this.btnOpenModal = this.btnOpenModal.bind(this);
        this.deletedElement = this.deletedElement.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getModuloAll();

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
                // table = {<Table url={this.state.urlDataTable}  propertiesDataTable = {this.propertiesDataTable}  getBydId={this.getByIdElement}  deletedElement={this.deletedElement}/>}
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

    async saveForm ()  {

        const response = await saveDataForm(this.url,this.state, this.state.elementId);
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
            let data = response.data;
           await this.setState( {
                nombre : data.nombre,
                urlObjeto : data.urlObjeto,
                visibleEnMenu : data.visibleEnMenu,
                tipoObjeto : data.tipoObjeto,
                idModulo : data.idModulo,
                optionsSelected : {value : data.idModulo, label: data.modulo  ? data.modulo.nombre : 'Sin Modulo'}
            });
           await this.setState({statusModal:true});
        }
    }

    async getModuloAll() {
        const response = await getAllByClass('getModuloAllForObjeto');
        if (response.status)
        {
            // console.log(response.data);
            response.data.push({ nombre: 'Sin Modulo' , id : 0});

           const data =  response.data.map(x => ({  label: x.nombre , value : x.id  }));

            this.setState({ moduloOptionElement : data });
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
        console.log(e.target.name);
        this.setState({
           [e.target.name]: e.target.value
        });

    }
    btnOpenModal() {

        return (<button
            variant="primary"
            onClick={() => {
                // const alert = useAlert();
                // alert.show("Oh look, an alert!");
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
    handleChange(value) {
        this.setState({ optionsSelected: value, idModulo: value.value })
        // console.log(value);
        // console.log(this.state.idModulo);
    }

    field ()
    {
        return (<div className="row">
            <div className="col-md-6">
                <label>Nombre</label>
                <input type="text" className="form-control" name="nombre" value={this.state.nombre  || ''} onChange={this.onChangeValue}></input>
            </div>
            <div className="col-md-6">
                <label>Tipo</label>
                <select name="tipoObjeto" onChange={this.onChangeValue} value={this.state.tipoObjeto} className="form-control">
                    <option value="FORMULARIO">Formulario</option>
                    <option value="REPORTE">Reporte</option>
                    <option value="OTROS">Otros</option>
                </select>
            </div>
            <div className="col-md-6">
                <label>Url</label>
                <input type="text" className="form-control" name="urlObjeto" value={this.state.urlObjeto || ''} onChange={this.onChangeValue}></input>
            </div>
            <div className="col-md-6">
                <label>Modulo</label>
                <Select
                    name='idModulo'
                    value = {this.state.optionsSelected}
                    onChange={
                        value =>
                                this.handleChange(value)
                        }
                    options = {this.state.moduloOptionElement}
                />

            </div>
            <div className="col-md-6">
                <label>Visible en menu</label>
                <select name="visibleEnMenu" value={this.state.visibleEnMenu} onChange={this.onChangeValue} className="form-control">
                    <option value="SI">SI</option>
                    <option value="NO">NO</option>
                </select>
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
    propertiesDataTable ( elementId  )  {
        const columns =[
            {
                "data" : "id"
            },
            {
                "data" : "nombre"
            },
            {
                "data" : "tipoObjeto"
            },
            {
                "data" : "urlObjeto"
            },
            {
                "data" : "visibleEnMenu",
                // render : function(data, type, row)
                // {
                //     console.log(row.modulo.nombre);
                //     return row.modulo.nombre;
                // }
            },
            {
                "data" : "visibleEnMenu",
                render : function(data, type, row)
                {
                    var modulo = 'Sin Modulo';
                    if (row.modulo != null )
                     modulo =  row.modulo.nombre

                    return modulo;
                }
            },
            {
                "data" : "visibleEnMenu",
            },
        ];
        let head =(<thead>
            <tr>
                <th>id</th>
                <th>Nombre2</th>
                <th>Tipo</th>
                <th>Url</th>
                <th>Visible</th>
                <th>Modulo</th>
                <th>Accion</th>
            </tr>
        </thead>);
         const btnActionUpdate = (<button className="btn btn-primary" onClick={() => this.getByElementId(elementId)}><i className="fas fa-edit"></i></button>);
         const btnActionDelete = (<button className="btn btn-danger" onClick={() => this.deletedElement(elementId)}><i className="fas fa-trash-alt"></i></button>);
         const btnActionOthers = '';
        return {
            columns : columns,
            head : head,
            targets : [6],
            btnActionDelete : btnActionDelete,
            btnActionUpdate : btnActionUpdate,
            btnActionOthers : btnActionOthers
        };
    }
}
// export default Wrapper;
ReactDOM.render(<Objeto  />, document.getElementById('contentBody'));
