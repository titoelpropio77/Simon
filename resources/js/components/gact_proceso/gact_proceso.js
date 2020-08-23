import React,{useState} from "react"
import Wrapper from '../wrapper/Wrapper';
import Loading from '../loading/loading';
import Table,{reloadTableData } from "../table/table.js";
import ReactDOM  from 'react-dom';
import Form_Field from './fields'

import  properties_form from '../tools/properties_form'

const GACT_PROCESO = () => {
    const url = 'gactProceso';
    //columnas de la tabla
    const columnsTable = [
        {
            data: "proc_nombre",
            render : function(type, data, row)
            {
                return row.proc_grado_automatizacion ;
            }
        },
        {
            data: "proc_grado_automatizacion"
        },
        {
            data: "proc_grado_automatizacion"
        },
        {
            data: "proc_grado_automatizacion"
        },
        {
            data: "proc_periodo_ejecucion"
        },

    ];
    //Cabecera de la tabla
    const headTable = (
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Nombre del proceso</th>
                <th>Grado acutomatizacion</th>
                <th>Estado</th>
                <th>Accion</th>
            </tr>
        </thead>
    );
    const getColumnTable = 'proc_nombre';
    const head_column_table = {headTable , columnsTable, getColumnTable};
    const {btnOpenModal, modalBT, propertiesDataTable} = properties_form(url, head_column_table);

    return (
            <div>
                <Wrapper
                loading  = {<Loading />}
                title='Proceso'
                table = {<Table url='getGactProcesoAll'  propertiesDataTable = {propertiesDataTable}    />}
                modalBT = { modalBT( Form_Field ) }
                btnOpenModal = { btnOpenModal('Proceso') }
                
                ></Wrapper>
            </div>
            );


};

ReactDOM.render(<GACT_PROCESO />, document.getElementById('contentBody'));