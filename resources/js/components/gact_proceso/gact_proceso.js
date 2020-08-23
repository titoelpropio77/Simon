import React,{useState} from "react"
import Wrapper from '../wrapper/Wrapper';
import Loading from '../loading/loading';
import Table,{reloadTableData } from "../table/table.js";
import ReactDOM  from 'react-dom';
import Form_Field from './fields'

import  properties_form from './properties_form'

const GACT_PROCESO = () => {
    const url = 'gactProceso';
    
    const {btnOpenModal, modalBT, propertiesDataTable} = properties_form(url);
    const deletedElement =  async  (elementId)  => {
        const response = await deletedElement( url, elementId);
        if( response.status )
        {
            reloadTableData();
        }
        else{

        }
    }
    return (
            <div>
                <Wrapper
                loading  = {<Loading />}
                title='Proceso'
                table = {<Table url='getGactProcesoAll'  propertiesDataTable = {propertiesDataTable}     />}
                modalBT = { modalBT( Form_Field ) }
                btnOpenModal = { btnOpenModal('Proceso') }
                ></Wrapper>
            </div>
            );


};

ReactDOM.render(<GACT_PROCESO />, document.getElementById('contentBody'));