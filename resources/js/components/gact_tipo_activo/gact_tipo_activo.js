import React,{useState} from "react"
import Wrapper from '../wrapper/Wrapper';
import Loading from '../loading/loading';
import Table,{reloadTableData } from "../table/table.js";
import ReactDOM  from 'react-dom';
import Form_Field from './fields'

import  properties_form from '../tools/properties_form'

const TipoActivo = () => {
    const url = 'tipoactivo';
    const title = 'Tipo Activo';
    const urlListDataTable = 'getTipoActivoAll';
    //columnas de la tabla
    const columnsTable = [
        {
            data: "id",
        },
        {
            data: "tipo_nombre"
        },
        {
            data: "tipo_descripcion"
        },
        {
            data: "tipo_descripcion"
        },



    ];
    //Cabecera de la tabla
    const headTable = (
        <thead>
            <tr>
                <th>Id</th>
                <th>Tipo Activo</th>
                <th>Descripcion</th>
                <th>Accion</th>
            </tr>
        </thead>
    );
    //columna del cual se quiera extraer la data( esto sirver para la accion eliminar )
    const getColumnTable = 'tipo_nombre';
    //posicion de los botones de acciones  en la tabla
    const target_action = 3;
    const head_column_table = {headTable , columnsTable, getColumnTable, target_action};
    /**
     * Setea y retorna todos los campos del formulario para luego actualizar, esto actua sobre properties_form
     * @param {json} data
     */
    const setDataInputs = ( data ) =>
    {
        const result = {

            //setea valores de los campos

            nombre: data.tipo_nombre,
            // nombre: data.proc_nombre,
            descripcion: data.tipo_descripcion,
        };
        return result ;
    }
    const {btnOpenModal, modalBT, propertiesDataTable} = properties_form(url, head_column_table, setDataInputs, title);
    return (
            <div>
                <Wrapper
                loading  = {<Loading />}
                title='Tipo de Activos'
                table = {<Table url={urlListDataTable}  propertiesDataTable = {propertiesDataTable}    />}
                modalBT = { modalBT( Form_Field ) }
                btnOpenModal = { btnOpenModal('Tipo de Activo') }
                ></Wrapper>
            </div>
            );
};


ReactDOM.render(<TipoActivo  />, document.getElementById('contentBody'));
