import React,{useEffect} from 'react';
import { Col, Form } from "react-bootstrap";
import {getAllByClass} from "../tools/tools";
import Select from "react-select";

const Form_Field = ( onChangeValue, inputs ) => {
    // const [macroprocesOption, setMacroprocesOption] = useState([
    //     { label: "Seleccion", value: 0 }
    // ]);
    // const [optionsGradoAutomatizacion, setOptionsGradoAutomatizacion] = useState([
    //     { label: "Semiautomatizado", value: "Semiautomatizado"},
    //     { label: "Automatizado", value: "Automatizado" }
    // ]);

    const optionTipo = [
        { label: "Propietario", value: "Propietario"},
        { label: "Custodio", value: "Custodio" },
        { label: "Usuario", value: "Usuario" },
    ];

    // useEffect(() => {

    //     const getRRHH = async () => {
    //         const urlGet = "getrrhh";
    //         const response = await getAllByClass(
    //             urlGet,
    //             {}
    //         );
    //         // if (response.status) {
    //         //     const data = response.data.map(x => ({
    //         //         label: x.macpro_nombre,
    //         //         value: x.id
    //         //     }));
    //         //    // setProcesOption(data);
    //         // }
    //         return true;
    //     };
    //     getRRHH();
    // },[]);
    return (
        <row>
            <Form.Group as={Col} sm="6" lg={6} md={6} controlId="validationCustom11" >
                <Form.Label>Nombre Completo</Form.Label>
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
            <Form.Group as={Col} sm="8" lg={6} md={6} controlId="validationCustom12" >
                <Form.Label>Grado de automatización</Form.Label>
                <Select
                    name="grado_automatizacion"
                    options={ optionsGradoAutomatizacion }
                    value={inputs.gradoautomatizacion}
                    onChange={(e, meta) => {
                        var data_select = { 'grado_automatizacion' : e.value , gradoautomatizacion: e};
                        onChangeValue(e, data_select);
                    }}
                />
            </Form.Group>
            <Form.Group as={Col} sm="7" lg={6} md={6} controlId="validationCustom14" >
                <Form.Label>Grado Descentralización</Form.Label>
                <Select
                            name="grado_descentralizacion"
                            options={ optionGradoDescentralizacion }
                            value={inputs.gradodescentralizacion}
                            required
                            onChange={(e, meta) => {
                                var data_select = { 'grado_descentralizacion' : e.value , gradodescentralizacion: e};
                                onChangeValue(e, data_select);
                            }}
                        />
            </Form.Group>
            <Form.Group as={Col} sm="5" lg={6} md={6} controlId="validationCustom15" >
                <Form.Label>Periodo de Ejecución</Form.Label>
                <Select
                    name="periodo_ejecucion"
                    options={ optionPeriodoEjecucion }
                    value={inputs.periodoejecucion}
                    required
                    onChange={(e, meta) => {
                        var data_select = { 'periodo_ejecucion' : e.value , periodoejecucion: e};
                        onChangeValue(e, data_select);
                    }}
                />
            </Form.Group>
        </row>
    )
};
export default Form_Field;
