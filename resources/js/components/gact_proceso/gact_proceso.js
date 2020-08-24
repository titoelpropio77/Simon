import React,{useState} from "react"
import Wrapper from '../wrapper/Wrapper';
import Loading from '../loading/loading';
import Table,{reloadTableData } from "../table/table.js";
import ReactDOM  from 'react-dom';
import Form_Field from './fields'

import  properties_form from '../tools/properties_form'

const GACT_PROCESO = () => {
    const url = 'gactProceso';
    const title = 'Proceso';
    const urlListDataTable = 'getGactProcesoAll';
    //columnas de la tabla
    const columnsTable = [
        {
            data: "proc_nombre",
            render : function(type, data, row)
            {
                return row.macros.macpro_nombre ;
            }
        },
        {
            data: "proc_nombre"
        },
        {
            data: "proc_grado_automatizacion"
        },
        {
            data: "proc_grado_descentralizacion"
        },
        {
            data: "proc_periodo_ejecucion"
        },
        {
            data: "proc_periodo_ejecucion"
        },
        

    ];
    //Cabecera de la tabla
    const headTable = (
        <thead>
            <tr>
                <th>Macro Proceso</th>
                <th>Nombre del proceso</th>
                <th>Grado de automatización</th>
                <th>Grado Descentralizado</th>
                <th>Periodo de Ejecucion</th>
                <th>Accion</th>
            </tr>
        </thead>
    );
    //columna del cual se quiera extraer la data( esto sirver para la accion eliminar )
    const getColumnTable = 'proc_nombre';
    //posicion de los botones de acciones  en la tabla
    const target_action = 5;
    const head_column_table = {headTable , columnsTable, getColumnTable, target_action};
    /**
     * Setea y retorna todos los campos del formulario para luego actualizar, esto actua sobre properties_form
     * @param {json} data 
     */
    const setDataInputs = ( data ) =>
    {
        const result = { 
            //setea las opciones del SELECT
            macroproceso: { label :data.macros.macpro_nombre , value: data.macros.id },
            gradoautomatizacion: { label :data.proc_grado_automatizacion , value: data.proc_grado_automatizacion  },
            gradodescentralizacion: { label :data.proc_grado_descentralizacion , value: data.proc_grado_descentralizacion  },
            periodoejecucion: { label :data.proc_periodo_ejecucion , value: data.proc_periodo_ejecucion  },
            //setea valores de los campos
            macro_proceso : data.macros.id,
            grado_automatizacion : data.proc_grado_automatizacion,
            grado_descentralizacion : data.proc_grado_descentralizacion,
            periodo_ejecucion : data.proc_periodo_ejecucion,
            nombre: data.proc_nombre,
            // nombre: data.proc_nombre,
        };
        return result ;
    }
    const {btnOpenModal, modalBT, propertiesDataTable} = properties_form(url, head_column_table, setDataInputs);
    return (
            <div>
                <Wrapper
                loading  = {<Loading />}
                title='Proceso'
                table = {<Table url={urlListDataTable}  propertiesDataTable = {propertiesDataTable}    />}
                modalBT = { modalBT( Form_Field ) }
                btnOpenModal = { btnOpenModal('Proceso') }
                ></Wrapper>
            </div>
            );
};

ReactDOM.render(<GACT_PROCESO />, document.getElementById('contentBody'));