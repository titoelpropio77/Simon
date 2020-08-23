import React,{useState , useEffect} from 'react';
import { Button, Row, Col, Form, Alert } from "react-bootstrap";
import {getAllByClass} from "../tools/tools";
import Select from "react-select";

const Form_Field = ( onChangeValue, inputs ) => {

    const [macroprocesOption, setMacroprocesOption] = useState([
        { label: "Seleccion", value: 0 }
    ]);
    const [otrosInputs, setOtrosInputs] = useState({ label: "Seleccione un macro proceso" });
    useEffect(() => {
        const getMacroprocesos = async () => {
            const response = await getAllByClass(
                "getMacroProceso",
                {}
            );
            if (response.status) {
                const data = response.data.map(x => ({
                    label: x.macpro_nombre,
                    value: x.id
                }));
                setMacroprocesOption(data);
            }
            return true;
        };
        getMacroprocesos();
    },[]);
    return   (
            <Row>
                <Form.Group
                    as={Col}
                    md="6"
                    lg={6}
                    md={6}
                    controlId="validationCustom10"
                >
                        <Form.Label>Macro Proceso</Form.Label>
                        <Select
                            name="macro_proceso"
                             options={ macroprocesOption }
                            // isDisabled={ disableSelect }
                            value={inputs.macroproceso}
                            onChange={(e, meta) => {
                                setOtrosInputs({ macro_proceso: e.value, });
                                
                                 var data_select = { 'macro_proceso' : e.value , macroproceso: e};
                                //Object.entries obtiene la cantidad de elementos
                                onChangeValue(e, data_select);
                            }}
                            
                        />
                </Form.Group>
                <Form.Group
                    as={Col}
                    md="6"
                    lg={6}
                    md={6}
                    controlId="validationCustom10"
                >
                        <Form.Label>Nombre Proceso</Form.Label>
                        <Form.Control
                                type="text"
                                name="nombre"
                                // required
                                // required={true}
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