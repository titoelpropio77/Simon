import React,{useState , useEffect} from 'react';
import { Button, Row, Col, Form, Alert } from "react-bootstrap";
import {getAllByClass} from "../tools/tools";
import Select from "react-select";

const Form_Field = ( onChangeValue, inputs ) => {

    // const [otrosInputs, setOtrosInputs] = useState({ label: "Seleccione un macro proceso" });
    useEffect(() => {
        const getVulnerabilidad = async () => {
            const response = await getAllByClass(
                path_url_base+"/gact_vulnerabilidad",
                {id:amenaza_id}
            );
            // if (response.status) {
            //     const data = response.data.map(x => ({
            //         label: x.macpro_nombre,
            //         value: x.id
            //     }));
            //     getVulnerabilidadOption(data);
            // }
            console.log("hola2");
        };
        getVulnerabilidad();

    },[]);
    return   (
            <Row>
                <Form.Group as={Col} sm="8" lg={8} md={8} controlId="validationCustom11" >
                    <Form.Label>Nombre de la Vulnerabilidad</Form.Label>
                    <Form.Control
                            type="text"
                            name="nombre"
                            required={true}
                            onChange={onChangeValue}
                            value={inputs ? inputs.nombre : ""}
                    />
                    <Form.Control.Feedback type="invalid">
                        El campo es obligatorio
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
    )

};

export default Form_Field;
