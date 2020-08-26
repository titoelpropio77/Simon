import React,{useState} from "react"
import Wrapper from '../wrapper/Wrapper';
import Loading from '../loading/loading';
import Table,{reloadTableData } from "../table/table.js";
import ReactDOM  from 'react-dom';
import Form_Field from './fields'

import  properties_form from '../tools/properties_form'

const GAct_MatrizRiezgo = () => {
    const url = 'matriezgo';
    const title = 'Matriz de Riezgo';
    const urlListDataTable = 'getMatrizRiezgoAll';
    //columnas de la tabla
    const columnsTable = [
        {
            data: "id",
        },
        {
            data: "nivel"
        },
        {
            data: "sigla"
        },
        {
            data: "valor_inicial"
        },
        {
            data: "valor_final"
        },
        {
            data: "valor_final"
        },

    ];
    //Cabecera de la tabla
    const headTable = (
        <thead>
            <tr>
                <th>N°</th>
                <th>Nivel</th>
                <th>Sigla</th>
                <th>Valor Inicial</th>
                <th>Valor Final</th>
                <th>Accion</th>
            </tr>
        </thead>
    );
    //columna del cual se quiera extraer la data( esto sirver para la accion eliminar )
    const getColumnTable = 'nivel';
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
            nivel: data.nivel,
            sigla: data.sigla,
            valor_inicial: data.valor_inicial,
            valor_final: data.valor_final,
            i_nivel:{label :data.nivel, value: data.nivel},
            i_sigla:{label :data.sigla, value: data.sigla},
            v_inicial:{label :data.valor_inicial, value: data.valor_inicial},
            v_final:{label :data.valor_final, value: data.valor_final},

        };
        return result ;
    }
    const {btnOpenModal, modalBT, propertiesDataTable} = properties_form(url, head_column_table, setDataInputs, title);
    return (
            <div>
                <Wrapper
                loading  = {<Loading />}
                title='Matriz de Riezgo'
                table = {<Table url={urlListDataTable}  propertiesDataTable = {propertiesDataTable}    />}
                modalBT = { modalBT( Form_Field ) }
                btnOpenModal = { btnOpenModal('Matriz de Riezgo') }
                ></Wrapper>
            </div>
            );
};

ReactDOM.render(<GAct_MatrizRiezgo />, document.getElementById('contentBody'));
