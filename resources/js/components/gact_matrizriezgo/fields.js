import React,{useState , useEffect} from 'react';
import { Button, Row, Col, Form, Alert } from "react-bootstrap";
import {getAllByClass} from "../tools/tools";
import Select from "react-select";

const Form_Field = ( onChangeValue, inputs ) => {

    const [OptionV_final, setOptionV_final] = useState([
        { label: "25", value: "25" },
        { label: "15", value: "15" },
        { label: "9", value: "9" },
        { label: "6", value: "6" },
        { label: "2", value: "2" },
        { label: "0", value: "0" }
    ]);


    const [OptionV_inicial, setOptionsv_inicial] = useState([
        { label: "15", value: "15"},
        { label: "10", value: "10" },
        { label: "7", value: "7" },
        { label: "3", value: "3" },
        { label: "1", value: "1" },
        { label: "0", value: "0" }
    ]);

    const optionNivel = [
        //const optionNivel = [
        { label: "Muy Alto", value: "Muy Alto"},
        { label: "Alto", value: "Alto" },
        { label: "Medio", value: "Medio" },
        { label: "Bajo", value: "Bajo" },
        { label: "Muy Bajo ", value: "Muy Bajo" },
        { label: "Ninguno ", value: "Ninguno" },
    ];
    const optionSigla = [
        { label: "MA", value: "MA"},
        { label: "A", value: "A" },
        { label: "M", value: "M" },
        { label: "B", value: "B" },
        { label: "A", value: "A" },
        { label: "Ninguno", value: "Ninguno" },
    ];
    // const [otrosInputs, setOtrosInputs] = useState({ label: "Seleccione un macro proceso" });
    useEffect(() => {
        const getMatrizRiezgo = async () => {
            const response = await getAllByClass(
                "getMatrizRiezgo",
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
        getMatrizRiezgo();
    },[]);
    return   (
            <Row>
                <Form.Group as={Col} sm="5" lg={6} md={6} controlId="validationCustom15" >
                    <Form.Label>Nivel</Form.Label>
                    <Select
                            name="nivel"
                            options={ optionNivel }
                            value={inputs.i_nivel}
                            required
                            onChange={(e, meta) => {
                                var data_select = { 'nivel' : e.value , i_nivel: e};
                                onChangeValue(e, data_select);
                            }}
                        />
                </Form.Group>
                <Form.Group as={Col} sm="7" lg={6} md={6} controlId="validationCustom14" >
                    <Form.Label>Sigla</Form.Label>
                    <Select
                            name="sigla"
                            options={ optionSigla }
                            value={inputs.i_sigla}
                            required
                            onChange={(e, meta) => {
                                var data_select = { 'sigla' : e.value , i_sigla: e};
                                onChangeValue(e, data_select);
                            }}
                        />
                </Form.Group>
                <Form.Group as={Col} sm="12" lg={6} md={6} controlId="validationCustom10" >
                        <Form.Label>Valor Inicial</Form.Label>
                        <Select
                            name="valor_inicial"
                            options={ OptionV_inicial }
                            required
                            // isDisabled={ disableSelect }
                            value={inputs.v_inicial}
                            onChange={(e, meta) => {
                                // setOtrosInputs({ valor inicial: e.value });

                                 var data_select = { 'valor_inicial' : e.value , v_inicial: e};
                                //Object.entries obtiene la cantidad de elementos
                                onChangeValue(e, data_select);
                            }}
                        />
                </Form.Group>
                <Form.Group as={Col} sm="12" lg={6} md={6} controlId="validationCustom10" >
                        <Form.Label>Valor Final</Form.Label>
                        <Select
                            name="valor_final"
                            options={ OptionV_final }
                            required
                            // isDisabled={ disableSelect }
                            value={inputs.v_final}
                            onChange={(e, meta) => {
                                // setOtrosInputs({ valor final: e.value });

                                 var data_select = { 'valor_final' : e.value , v_final: e};
                                //Object.entries obtiene la cantidad de elementos
                                onChangeValue(e, data_select);
                            }}
                        />
                </Form.Group>


            </Row>
    )

};

export default Form_Field;
