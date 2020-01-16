import React, { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Form, Alert,Col,Row } from "react-bootstrap";
// import TabContainer from 'react-bootstrap/TabContainer'
const NavTabs = props => {
    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const handleSubmit = async event => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === true) {
            const response = await props.saveForm();

        } else {
            setValidated(true);
        }
    };
    return (
        <div>
            <Tabs
                id="controlled-tab-example"
                activeKey={props.navActive}
                onSelect={k => {
                    props.changeNavTab(k);
                }}
            >
                <Tab eventKey="home" title="Datos Generales">
                    <div className="card-body">
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                        >
                            {props.fields.firstSection}
                            <br />

                            <Row>
                                <Col md="3">
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                        onClick={() => {
                                            // props.saveForm();
                                            // setKey("localizacion");
                                        }}
                                    >
                                        Grabar e ir a Localización
                                    </button>
                                </Col>
                                
                                {buttonReporte(document.getElementById('proyecto_id').value)}

                            </Row>
                        </Form>
                    </div>
                </Tab>

                <Tab eventKey="localizacion" title="Localización">
                    <div className="card-body">
                        {props.fields.secondSection}
                    </div>
                </Tab>
                <Tab eventKey="cofinaciadores" title="Cofinaciadores">
                    <div className="card-body">{props.fields.thirdSection}</div>
                </Tab>
                <Tab eventKey="componentes" title="Componentes">
                    <div className="card-body">
                        {props.fields.quarterSection}
                    </div>
                </Tab>

                <Tab
                    eventKey="estructura_financiamiento"
                    title="Estructura Financiamiento"
                    disabled={props.disableTabEF}
                    onClick={() => console.log("estructura fin")}
                >
                    <div className="card-body">{props.fields.fifthSection}</div>
                </Tab>
            </Tabs>
            <Alert variant="danger" show={showAlert}></Alert>
        </div>
    );
};

const buttonReporte = (id) => {
    if (id != 0) {
        return (
            <Col md="3">
                <button
                    className="btn btn-success"
                    type="button"
                    onClick={() => {
                        // props.saveForm();
                        // setKey("localizacion");
                        // window.open('https://www.google.com/', 'Reporte')
                        // window.open( '../datosGenerales/'+ 1 );
                        console.log('Prueba de Evento en boton')
                    }}
                >
                    Ver Reporte
                </button>

            </Col>
        );
    }
}

export default NavTabs;
