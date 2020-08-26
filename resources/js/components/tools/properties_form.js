import React,{useState} from 'react';
import {deletedElement,saveDataForm,getById} from "../tools/tools";
import {reloadTableData } from "../table/table.js";
import ModalBT from "../modal/modal";
const properties_form = (url, head_column_table = {}, setDataInputs = {}, titulo='') => {
    const [ showModal, setShowModal ] = useState(false);//state del modal de bootstrap para mostrar o ocultar el modal,function ( modalBT )
    const [ validated, setValidated ] = useState(false);//state para activar o desactiva notificacion de validaciones en el form
    const [ inputs, setInputs ] = useState({});//state de los campos del formulario, setea y retorna valores del formulario
    const [ elementId, setElementId ] = useState(0);////este state trabaja con la tabla datatable, cuando se activa la accion de "editar" guarda el id del elemento seleccionado
    /**
     * Setea el state inputs con los valores de los formulario
     * @param {*} event //evento de los inputs de cualquier tipo( text, checkox, radio, etc )
     * @param {*} dataPersonalizate // data personalizada, esto siver para setear alguna informacion extra en el State Inputs
     */
    const onChangeValue = (event,dataPersonalizate = {}) => {
        //Object.entries extrae informacion del objeto
        if( Object.entries( dataPersonalizate ).length == 0 ){
            event.persist();
            setInputs(inputs => ({
                ...inputs,
                [event.target.name]: event.target.value
            }));
        }else
        {
            //recorre todo le json
            console.log("dataPersonalizada");
            console.log(dataPersonalizate);
            for (var key in dataPersonalizate) {
                setInputs(inputs => ({
                    ...inputs,
                    [key] : dataPersonalizate[key]
                }));
            }
        }
        console.log("valor de los inputs");
        console.log(inputs);
    };
    /**
     * ejectuta la accion de guardar y o modificar
     * @param {objeto} event
     */
    const handleSubmit= async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === true)
        {
            setValidated(false);
            const response = await saveDataForm(
                url,
                inputs,
                elementId,
                ''
            );
            if( response.status )
            {
                setShowModal(false);
                reloadTableData();
                setInputs({});
            }
            return;

        }
            setValidated(true);
    }
    /**
     * retorna componente Modal de bootrap
     * @param {object} fields componente de los campos a mostrar en formulario del modal
     */
    const modalBT =( fields ) =>
    {
        return (<ModalBT
                state={showModal}//estado del modal( true = show, false = hidden )
                closeModal={() => setShowModal(false) }
                field={fields( onChangeValue, inputs )}
                validated ={validated}
                title={'Añadir Nuevo ' + titulo }
                handleSubmit = {handleSubmit}
            />);
    }
    /**
     * retorna la etiqueta button de añadir nuevo elemento
     * @param {string} title titulo del boton
     */
    const btnOpenModal =(title) => {
        return (<button
            onClick={() => {
                setShowModal(true);
                setElementId(0);
                setInputs({});
                }
            }
            className="btn btn-success"
        >
            Añadir {title}
        </button>);
    }
    /**
     * obtiene la data dado un id de un elemento de la lista de la tabla
     * @param {int} id
     */
    const getByIdElement = async (id)  =>   {
        const response = await getById(url,id);
        if( response.status )
        {
            setShowModal(true);
            //getDataInputs retorna los valores para los campos en el formulario
            const dataInputs = setDataInputs( response.data );
            setInputs( dataInputs );
            setElementId( response.data.id );
        }
    }
    /**
     * retorna las propiedades necesarias para el Plugins DataTables
     * @param {integer} elementId id del elemento de una fila seleccionado en el datatable
     * @param {string} nombre nombre del elemento de una fila seleccionado en el datatable
     */
    const propertiesDataTable = (elementId, nombre = '')  => {

        const head = head_column_table.headTable;//cabecera de la table <Head>
        const columns = head_column_table.columnsTable;// columnas de la tabla
        const getColumn = head_column_table.getColumnTable;// columna que se quiere extraer de la tabla
        const target = head_column_table.target_action;// posicion de la columna donde se quiere mostrar los botones de acciones (editar, eliminar)
        const btnActionUpdate = (
            <button
            className="btn  btn-primary btn-sm"
            onClick={() => getByIdElement(elementId)}
            >
                <i className="fas fa-edit"></i>
            </button>
        );
        const btnActionDelete = (
            <button
                className="btn btn-danger btn-sm"
                onClick={() => deletedElement( url, elementId, nombre)}
            >
                <i className="fas fa-trash-alt"></i>
            </button>
        );
        const btnActionOthers = head_column_table.othersButton ? head_column_table.othersButton( elementId ) : '';

        return {
            columns: columns,
            head: head,
            targets: [target],
            btnActionDelete: btnActionDelete,
            btnActionUpdate: btnActionUpdate,
            getColumn: getColumn,
            btnActionOthers: btnActionOthers
        };

    }
    return {
        btnOpenModal, modalBT,  propertiesDataTable
    };
}





export  default properties_form;
