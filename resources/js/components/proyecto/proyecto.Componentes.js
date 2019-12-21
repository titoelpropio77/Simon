import React from "react";
import { Button, Row, Col, Form, Alert } from "react-bootstrap";
import Select from "react-select";
import TablePersonalizate from "../table/tablePersonalizate.js";
import DatePicker from "react-datepicker";
import moment from "moment";
import ModalBT from "../modal/modal";

const Componentes = props => {
    const field = () => {
        return (
            <Row>
                <Form.Group
                    as={Col}
                    md="12"
                    lg={12}
                    controlId="validationCustom10"
                >
                    <Form.Label column md="3" sm={3}>
                        Nombre del Componente
                    </Form.Label>
                    <Col sm={9} md="9" style={{ display: "inline-block" }}>
                        <Form.Control
                            type="text"
                            name="nombreDocumento"
                            required={true}
                            // onChange={onChangeValue}
                            // value={inputs ? inputs.nombreDocumento : ""}
                        />
                    </Col>
                </Form.Group>
                <Form.Group
                    as={Col}
                    md="6"
                    lg={6}
                    md={6}
                    controlId="fechaInicio"
                >
                    <Form.Label column md="6" sm={6}>
                        Fecha de Incio Programada :
                    </Form.Label>
                    <Col sm={6} md="6" style={{ display: "inline-block" }}>
                        <DatePicker
                            name="fechaInicio"
                            className="form-control"
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="tiempoDuracion">
                    <Form.Label column sm="6">
                        Tiempo de Duración Días:
                    </Form.Label>
                    <Col md="6" sm="6" style={{ display: "inline-block" }}>
                        <Form.Control
                            type="number"
                            name="tiempoDuracion"
                            required={true}
                            // onChange={onChangeValue}
                            // value={inputs ? inputs.nombreDocumento : ""}
                        />
                    </Col>
                </Form.Group>
                <Form.Group
                    as={Col}
                    md="6"
                    lg={6}
                    md={6}
                    controlId="fechaInicio"
                >
                    <Form.Label column md="6" sm={6}>
                        Fecha de Conclusion Programada :
                    </Form.Label>
                    <Col sm={6} md="6" style={{ display: "inline-block" }}>
                        <DatePicker
                            name="fechaInicio"
                            className="form-control"
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="costoComponente">
                    <Form.Label column sm="6">
                        Costo Del Componente
                    </Form.Label>
                    <Col md="6" sm="6" style={{ display: "inline-block" }}>
                        <Form.Control
                            type="number"
                            name="costoComponente"
                            required={true}
                            // onChange={onChangeValue}
                            // value={inputs ? inputs.nombreDocumento : ""}
                        />
                    </Col>
                </Form.Group>
                <Form.Group
                    as={Col}
                    md="3"
                    lg={3}
                    md={3}
                    controlId="tiempoEjecucion"
                >
                    <Form.Label column md="8">Tipo de Ejecucion</Form.Label>
                    <Col md="4" sm="4" style={{ display: "inline-block" }}>
                        <Form.Check
                            type={'radio'}
                            name="tiempoEjecucion"
                            required={true}
                            // onChange={onChangeValue}
                            // value={inputs ? inputs.nombreDocumento : ""}
                        />
                    </Col>
                </Form.Group>
                <Form.Group
                    as={Col}
                    md="3"
                    lg={3}
                    md={3}
                    controlId="contratacionTerceros"
                >
                    <Form.Label column md="8">Contratacion a Terceros</Form.Label>
                    <Col md="4" sm="4" style={{ display: "inline-block" }}>
                        <Form.Check
                            type={'radio'}
                            name="contratacionTerceros"
                            required={true}
                            // onChange={onChangeValue}
                            // value={inputs ? inputs.nombreDocumento : ""}
                        />
                    </Col>
                </Form.Group>
                <Form.Group
                    as={Col}
                    md="3"
                    lg={3}
                    md={3}
                    controlId="administracionPropia"
                >
                    <Form.Label column md="8">Administracion Propia</Form.Label>
                    <Col md="4" sm="4" style={{ display: "inline-block" }}>
                        <Form.Check
                            type={'radio'}
                            name="administracionPropia"
                            required={true}
                            // onChange={onChangeValue}
                            // value={inputs ? inputs.nombreDocumento : ""}
                        />
                    </Col>
                </Form.Group>
                <Form.Group
                    as={Col}
                    md="3"
                    lg={3}
                    md={3}
                >
                <Button variant="success">Grabar en Lista</Button>
                </Form.Group>
            </Row>
        );
    };

    return (
        <Row>
            <Col lg={4} md={4}>
                <h2>Codigo SISIN: {props.codSinSin}</h2>
                &nbsp;&nbsp;&nbsp;&nbsp;
            </Col>
            <Col lg={4} md={4}>
                <h2>Nombre: {props.nombreProy}</h2>
            </Col>
            {field()}
            <Row>

            </Row>
        </Row>
    );
};

export default Componentes;
