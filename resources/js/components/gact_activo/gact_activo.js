import React,{useState} from "react"
import Wrapper from '../wrapper/Wrapper';
import Loading from '../loading/loading';
import Table,{reloadTableData } from "../table/table.js";
import ReactDOM  from 'react-dom';
import Form_Field from './fields'

import  properties_form from '../tools/properties_form'

const GACT_ACTIVO = () => {
    const prefijo = 'act_';
    const url = 'gactActivo';
    const titulo = 'Activo';
    const urlListDataTable = 'getDataTableActivo';
    //columnas de la tabla
    const columnsTable = [
        {
            data: prefijo+"macroproceso_id",
            render : function(type, data, row)
            {
                return row.macros.macpro_nombre ;
            }
        },
        {
            data: prefijo+"nombre_activo"
        },
        {
            data: prefijo+"macroproceso_id"
        },
        {
            data: "proc_grado_descentralizacion"
        },
        {
            data: prefijo+"macroproceso_id"
        },
        {
            data: prefijo+"macroproceso_id"
        },
        {
            data: prefijo+"macroproceso_id"
        },
       
        

    ];
    //Cabecera de la tabla
    const headTable = (
        <thead>
            <tr>
                <th>Unidad</th>
                <th>Nombre del Activo</th>
                <th>Descripción</th>
                <th>Propietario</th>
                <th>Clasificacion</th>
                <th>Proceso Asociado</th>
                <th>Accion</th>
            </tr>
        </thead>
    );
    //columna del cual se quiera extraer la data( esto sirver para la accion eliminar )
    const getColumnTable = prefijo+"macroproceso_id";
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
    const {btnOpenModal, modalBT, propertiesDataTable} = properties_form(url, head_column_table, setDataInputs,titulo);
    console.log("urlListDataTable: " +urlListDataTable);
    return (
            <div>
                <Wrapper
                loading  = {<Loading />}
                title={titulo}
                table = {<Table url={urlListDataTable}  propertiesDataTable = {propertiesDataTable}    />}
                modalBT = { modalBT( Form_Field ) }
                btnOpenModal = { btnOpenModal(titulo) }
                ></Wrapper>
            </div>
            );
};

ReactDOM.render(<GACT_ACTIVO />, document.getElementById('contentBody'));