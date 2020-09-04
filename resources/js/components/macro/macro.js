import React,{useState} from "react"
import Wrapper from '../wrapper/Wrapper';
import Loading from '../loading/loading';
import Table,{reloadTableData } from "../table/table.js";
import ReactDOM  from 'react-dom';
import Form_Field from './fields'

import  properties_form from '../tools/properties_form'

const Macro = () => {
    const url = 'macro';
    const title = 'Macro Proceso';
    const urlListDataTable = 'getMacroAll';
    //columnas de la tabla
    const columnsTable = [
        {
            data: "id",
        },
        {
            data: "macpro_nombre"
        },
        {
            data: "macpro_descripcion"
        },
        {
            data: "idPropietario"
        },
        {
            data: "idCustodio"
        },
        {
            data: "idUsuario"
        },
        {
            data: "idUsuario"
        },



    ];
    //Cabecera de la tabla
    const headTable = (
        <thead>
            <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Propietario</th>
                <th>Custodio</th>
                <th>Usuario</th>
                <th>Accion</th>
            </tr>
        </thead>
    );
    //columna del cual se quiera extraer la data( esto sirver para la accion eliminar )
    const getColumnTable = 'macpro_nombre';
    //posicion de los botones de acciones  en la tabla
    const target_action = 6;
    const head_column_table = {headTable , columnsTable, getColumnTable, target_action};
    /**
     * Setea y retorna todos los campos del formulario para luego actualizar, esto actua sobre properties_form
     * @param {json} data
     */
    const setDataInputs = ( data ) =>
    {
        const result = {

            //setea valores de los campos

            nombre: data.macpro_nombre,
            // nombre: data.proc_nombre,
            descripcion: data.macpro_descripcion,
        };
        return result ;
    }
    const {btnOpenModal, modalBT, propertiesDataTable} = properties_form(url, head_column_table, setDataInputs);
    return (
            <div>
                <Wrapper
                loading  = {<Loading />}
                title='Macro Proceso'
                table = {<Table url={urlListDataTable}  propertiesDataTable = {propertiesDataTable}    />}
                modalBT = { modalBT( Form_Field ) }
                btnOpenModal = { btnOpenModal('Macro Proceso') }
                ></Wrapper>
            </div>
            );
};


ReactDOM.render(<Macro  />, document.getElementById('contentBody'));
