import React,{useState , useEffect} from 'react';
import { Button, Row, Col, Form, Alert } from "react-bootstrap";
// import {getAllByClass} from "../tools/tools";
import ModelUsuario from "../Models/ModelUsuario"
import MultiSelect from "react-multi-select-component";

const Form_Field = ( onChangeValue, inputs ) => {

    // const [otrosInputs, setOtrosInputs] = useState({ label: "Seleccione un macro proceso" });
    const { getAllUsuario } = ModelUsuario();
    const [usersOption, setUsersOption] = useState([
        { label: "Seleccion", value: 0 }
    ]);
    useEffect(  () => {
            // alert(path_url_base);
            const setOptionSelectUsers = async ()=> {
                let listUsuario = await  getAllUsuario();
                listUsuario = listUsuario.map(x => ({
                    label : x.name,
                    value : x.id,
                }));
                setUsersOption(listUsuario);
            }
            setOptionSelectUsers();
            
    },[]);
    return   (
            <Row>
                
                <Form.Group as={Col} sm="6" lg={6} md={6} controlId="validationCustom11" >
                    <Form.Label>Nombre Macro Proceso</Form.Label>
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
                    <Form.Label>Usuarios</Form.Label>
                    <MultiSelect
                        options={usersOption}
                        value={inputs.i_usersOption}
                        onChange={(e, meta) => {
                            var data_select = { 'usuarios' : e.value , i_usersOption: e};
                            onChangeValue(e, data_select);
                        }}
                        labelledBy={"Select"}
                    />
                    {/* <Select
                            name="usuarios"
                            options={ usersOption }
                            value={inputs.i_usersOption}
                            onChange={(e, meta) => {
                                var data_select = { 'usuarios' : e.value , i_usersOption: e};
                                onChangeValue(e, data_select);
                            }}
                        /> */}
                </Form.Group>
                <Form.Group as={Col} sm="12" lg={12} md={12} controlId="validationCustom13" >
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control
                            type="text"
                            name="descripcion"
                            required={true}
                            onChange={onChangeValue}
                            value={inputs ? inputs.descripcion : ""}
                    />
                    <Form.Control.Feedback type="invalid">
                        El campo es obligatorio
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
    )

};

export default Form_Field;
