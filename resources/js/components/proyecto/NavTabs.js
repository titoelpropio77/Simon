import React, { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Form, Alert } from "react-bootstrap";
// import TabContainer from 'react-bootstrap/TabContainer'
const NavTabs = props => {
    const [key, setKey] = useState("home");
    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const handleSubmit = async event => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === true) {
            const response = await props.saveForm();

            setKey("localizacion");
        } else {
            setValidated(true);
        }
    };
    return (
        <div>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={k => setKey(k)}
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
                        </Form>
                    </div>
                </Tab>
                <Tab eventKey="localizacion" title="Localización">
                    <div className="card-body">
                        {props.fields.secondSection}
                    </div>
                </Tab>
                <Tab eventKey="confinaciadores" title="Confinaciadores">
                    <div className="card-body">{props.fields.thirdSection}</div>
                </Tab>
                <Tab eventKey="componentes" title="Componentes">
                  <div className="card-body">{props.fields.quarterSection}</div>
                </Tab>

                <Tab
                    eventKey="estructura_financiamiento"
                    title="Estructura Financiamiento"
                ></Tab>
            </Tabs>
            <Alert variant="danger" show={showAlert}></Alert>
        </div>
    );
};
export default NavTabs;
