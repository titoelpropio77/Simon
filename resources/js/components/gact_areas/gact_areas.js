import React,{useState} from "react"
import Wrapper from '../wrapper/Wrapper';
import Loading from '../loading/loading';
import Table,{reloadTableData } from "../table/table.js";
import ReactDOM  from 'react-dom';
import Form_Field from './fields'

import  properties_form from '../tools/properties_form'

const Areas = () => {
    const url = 'areas';
    const title = 'Areas';
    const urlListDataTable = 'getAreasAll';
    //columnas de la tabla
    const columnsTable = [
        {
            data: "id",
        },
        {
            data: "area_nombre"
        },
        {
            data: "area_nombre"
        },
    ];

    //Cabecera de la tabla
    const headTable = (
        <thead>
            <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Accion</th>
            </tr>
        </thead>
    );
    //columna del cual se quiera extraer la data( esto sirver para la accion eliminar )
    const getColumnTable = 'area_nombre';

    // const othersButton = ( elementId ) => (
    //     <button className="btn btn-warning btn-sm" title="Ver Area" onClick={ () => {
    //         window.location = "areas/"+elementId;
    //     }}>
    //         <i class="fa fa-eye"></i>
    //     </button>
    // );

    //posicion de los botones de acciones  en la tabla
    const target_action = 2;
    const head_column_table = {headTable , columnsTable, getColumnTable, target_action};
    /**
     * Setea y retorna todos los campos del formulario para luego actualizar, esto actua sobre properties_form
     * @param {json} data
     */
    const setDataInputs = ( data ) =>
    {
        const result = {

            //setea valores de los campos

            nombre: data.ame_nombre,

        };
        return result ;
    }
    const {btnOpenModal, modalBT, propertiesDataTable} = properties_form(url, head_column_table, setDataInputs, title);
    return (
            <div>
                <Wrapper
                loading  = {<Loading />}
                title='Areas'
                table = {<Table url={urlListDataTable}  propertiesDataTable = {propertiesDataTable}    />}
                modalBT = { modalBT( Form_Field ) }
                btnOpenModal = { btnOpenModal('Areas') }
                ></Wrapper>
            </div>
            );
};


ReactDOM.render(<Areas  />, document.getElementById('contentBody'));
