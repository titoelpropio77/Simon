import React,{useState} from "react"
import Wrapper from '../wrapper/Wrapper';
import Loading from '../loading/loading';
import Table,{reloadTableData } from "../table/table.js";
import ReactDOM  from 'react-dom';
import Form_Field from './fields'

import  properties_form from '../tools/properties_form'

const Clasificacion = () => {
    const url = 'clasificacion';
    const title = 'Clasificacion';
    const urlListDataTable = 'getClasificacionAll';
    //columnas de la tabla
    const columnsTable = [
        {
            data: "id",
        },
        {
            data: "clasif_nombre"
        },
        {
            data: "clasifi_descripcion"
        },
        {
            data: "clasifi_descripcion"
        },
    ];
    //Cabecera de la tabla
    const headTable = (
        <thead>
            <tr>
                <th>N°</th>
                <th>Clasificación</th>
                <th>Descripcion</th>
                <th>Accion</th>
            </tr>
        </thead>
    );
    //columna del cual se quiera extraer la data( esto sirver para la accion eliminar )
    const getColumnTable = 'clasif_nombre';
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

            nombre: data.clasif_nombre,
            // nombre: data.proc_nombre,
            descripcion: data.clasifi_descripcion,
        };
        return result ;
    }
    const {btnOpenModal, modalBT, propertiesDataTable} = properties_form(url, head_column_table, setDataInputs, title);
    return (
            <div>
                <Wrapper
                loading  = {<Loading />}
                title='Clasificacion'
                table = {<Table url={urlListDataTable}  propertiesDataTable = {propertiesDataTable}    />}
                modalBT = { modalBT( Form_Field ) }
                btnOpenModal = { btnOpenModal('Clasificacion') }
                ></Wrapper>
            </div>
            );
};


ReactDOM.render(<Clasificacion  />, document.getElementById('contentBody'));
