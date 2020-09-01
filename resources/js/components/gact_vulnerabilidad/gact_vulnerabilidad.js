import React,{useState, useEffect} from "react"
import Wrapper from '../wrapper/Wrapper';
import Loading from '../loading/loading';
import Table,{reloadTableData } from "../table/table.js";
import ReactDOM  from 'react-dom';
import Form_Field from './fields';

//import Select from "react-select";
//import ReactDOM from "react-dom";

import  properties_form from '../tools/properties_form'

const Vulnerabilidad = () => {
    const url = path_url_base+'/vulnerabilidad';
    const title = 'Vulnerabilidad';
    const urlListDataTable = path_url_base+'/getVulnerabilidadAll';
    const idAmenaza = amenaza_id;
    const dataInput = { amenaza_id:  amenaza_id };

    //columnas de la tabla
    const columnsTable = [
        {
            data: "id",
        },
        {
            data: "vul_nombre"
        },
        {
            data: "vul_nombre"
        },
    ];

    //Cabecera de la tabla
    const headTable = (
        <thead>
            <tr>
                <th>Id</th>
                <th>Nombre Vulnerabilidad</th>
                <th>Accion</th>
            </tr>
        </thead>
    );
    //columna del cual se quiera extraer la data( esto sirver para la accion eliminar )
    const getColumnTable = 'vul_nombre';
    //posicion de los botones de acciones  en la tabla
    const target_action = 2;
    const head_column_table = {headTable , columnsTable, getColumnTable, target_action};
    const data_send_datatable = ( d ) => {

        d.amenaza_id = amenaza_id
    }
    /**
     * Setea y retorna todos los campos del formulario para luego actualizar, esto actua sobre properties_form
     * @param {json} data
     */
    const setDataInputs = ( data ) =>
    { console.log(data);
        console.log("data input");
        const result = {
            //setea valores de los campos
            nombre: data.vul_nombre,
        };
        return result ;
    }
    const {btnOpenModal, modalBT, propertiesDataTable} = properties_form(url, head_column_table, setDataInputs, title, dataInput);
    return (
            <div>
                <Wrapper
                loading  = {<Loading />}
                title='Vulnerabilidad'
                table = {<Table url={urlListDataTable}  propertiesDataTable = {propertiesDataTable}  data_send_datatable = {data_send_datatable}  />}
                modalBT = { modalBT( Form_Field ) }
                btnOpenModal = { btnOpenModal('Vulnerabilidad') }
                ></Wrapper>
            </div>
            );
};


ReactDOM.render(<Vulnerabilidad  />, document.getElementById('contentBody'));
