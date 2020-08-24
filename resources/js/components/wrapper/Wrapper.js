import React, { Component, useState } from 'react';

import Body from '../body/Body';



const Wrapper = ({title,table,field, urlSave, dataForm, loading,modalBT,btnOpenModal})  => {
        return (

            <div>
            <Body
                urlSave ={urlSave}
                title={title}
                table = {table}
                field = {field}
                dataForm ={dataForm}
                loading ={loading}
                modalBT = {modalBT}
                btnOpenModal = {btnOpenModal}
            > </Body>
            </div>
			);

    }
export default Wrapper;
