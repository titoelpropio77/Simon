import React, { useState } from "react";
// import {saveDataForm} from "../tools/tools";
// import Field from '../tools/field.js';

const Body = ({ table,   modalBT,btnOpenModal, title}) => {
    // const [show, setShow] = useState(false);
    // const saveForm  = async(urlSave,dataForm) => {
    //     const response = await  saveDataForm(urlSave,dataForm);
    //     if( response.status )
    //     {
    //         setShow(false);
    //         reloadTableData();
    //     }
    // }
    // const getFormById = async() ?>>
    // {

    // }
    return (

        <div className="container-fluid">

            <div className="row">
                <div className="col-sm-12 col-md-12">
                    <div className="card card-outline card-info">
                        <div className="card-header">
                            {modalBT}
                            <h3 className="card-title">Gestion de {title}</h3>
                            <div className="card-tools">
                                <button
                                    type="button"
                                    className="btn btn-tool btn-sm"
                                    data-card-widget="collapse"
                                    data-toggle="tooltip"
                                    title="Collapse"
                                >
                                    <i className="fas fa-minus"></i>
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-tool btn-sm"
                                    data-card-widget="remove"
                                    data-toggle="tooltip"
                                    title="Remove"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div className="card-body pad">
                            <div className="row">
                                <div className="col-md-12" style={{ marginBottom: "1%" }}>
                                {btnOpenModal}
                                </div>
                                <div className="col-md-12">
                                    <div className="table">
                                    {/* body del card */}
                                        {table}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Body;
