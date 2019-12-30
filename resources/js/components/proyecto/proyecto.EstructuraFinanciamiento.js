import React,{useState} from 'react'
import { Button, Row, Col, Form, Alert } from "react-bootstrap";
import Select from "react-select";
import TablePersonalizate from "../table/tablePersonalizate.js";
import {
    saveDataForm,
    getById,
    deletedElement,
    getAllByClass,
    saveTypeDataForm
} from "../tools/tools";
const EstructuraFinanciamiento = () => {
   // saveDataForm( 'usuario', { nombre: "modesto", apellido : "saldaña" }, elementId );
    const propertiesTableLocalizacion = () => {
        const columns = (
            <tr>
                <td>adf</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
            </tr>
        );
        let head = (
            <thead>
                <tr>
                    <th>Comopnente</th>
                    <th>partida</th>
                    <th>FechaFirma</th>
                    <th>Duracion En dias</th>
                    <th>Monto cofinaciado</th>
                    <th>Accion</th>
                </tr>
            </thead>
        );
        const btnActionUpdate = (
            <button
                className="btn btn-primary"
                // onClick={() => this.getByElementId(elementId)}
            >
                <i className="fas fa-edit"></i>
            </button>
        );
        const btnActionDelete = (
            <button
                className="btn btn-danger"
                // onClick={() => this.deletedElement(elementId)}
            >
                <i className="fas fa-trash-alt"></i>
            </button>
        );
        const btnActionOthers = "";
        return {
            columns: columns,
            head: head,
            targets: [6],
            btnActionDelete: btnActionDelete,
            btnActionUpdate: btnActionUpdate,
            btnActionOthers: btnActionOthers
        };
    };
    return (
        <Row>
            <Col md="4">
                <h1>1</h1>
                <Select></Select>
            </Col>
            <Col md="4">
            <h1>2</h1>

            </Col>
            <Col md="4">
            <h1>3</h1>

            </Col>
            <TablePersonalizate
            propertiesTable = { propertiesTableLocalizacion }
            />
        </Row>
    );
}
export default EstructuraFinanciamiento;
