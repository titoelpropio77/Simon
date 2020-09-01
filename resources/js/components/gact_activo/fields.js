import React,{useState , useEffect} from 'react';
import { Button, Row, Col, Form, Alert } from "react-bootstrap";
import MultiSelect from "react-multi-select-component";
import {getAllByClass} from "../tools/tools";
import ModelZona from "../Models/ModelZona"
import ModelTipoActivo from "../Models/ModelTipoActivo"
import ModelClasificacionActivo from "../Models/ModelClasificacionActivo"
import Select from "react-select";

const Form_Field = ( onChangeValue, inputs ) => {
    const [optionsProceso , setOptionsProceso]  = useState([]);
    const [selected, setSelected] = useState([]);
    const [optionsZona,setOptionsZona ] = useState([]);
    const [optionsUbicacion,setOptionsUbicacion ] = useState([]);
    const [optionsTipoActivo,setOptionsTipoActivo ] = useState([]);
    const [optionsClasificacion,setOptionsClasificacion ] = useState([]);
    
    const { getAllZona } = ModelZona();
    const { getAllTipoActivo } = ModelTipoActivo();
    const { getAllClasificacion } = ModelClasificacionActivo();
    
    const optionsControlAcceso = [
        {   'label' : 'Acceso protegido con llave' , value : 1 },
        {   'label' : 'Sin llave' , value : 2 },
        {   'label' : 'Acceso protegido con credenciales' , value : 3 },
        {   'label' : 'Sin credenciales' , value : 4 },
        {   'label' : 'No aplica' , value : 5 },
    ];
    const optionsEstado = [
        {   'label' : 'Vigente' , value : 1 },
    ];
    
    useEffect(() => {
        const getMacroprocesos = async () => {
            const urlGet = "getProcesoAll";
            const response = await getAllByClass(
                urlGet,
                {}
            );
            if (response.status) {
                const data = response.data.map(x => ({
                    label: x.proc_nombre,
                    value: x.id
                }));
                setOptionsProceso(data);
            }
            return true;
        };
        const getOptionsZona = async () => {
            let listaZona =await getAllZona();
            listaZona = listaZona.map(x => ({
                label : x.zona_nombre,
                value : x.id,
            }));
            setOptionsZona(listaZona);

        };
        const getOptionsTipoActivo = async () => {
            let listaTipoActivo =await getAllTipoActivo();
            listaTipoActivo = listaTipoActivo.map(x => ({
                label : x.tipo_nombre,
                value : x.id,
            }));
            setOptionsTipoActivo(listaTipoActivo);
        };
        const getOptionsClasificacion = async () => {
            let lista =await getAllClasificacion();
            lista = lista.map(x => ({
                label : x.clasif_nombre,
                value : x.id,
            }));
            setOptionsClasificacion(lista);
        };
        // const getOptionsUbicacion = async () => {
        //     let listaUbicacion =await getAllUbicacion();
        //     listaUbicacion = listaUbicacion.map(x => ({
        //         label : x.ubicacion_nombre,
        //         value : x.id,
        //     }));
        //     setOptionsZona(listaZona);

        // };
        getMacroprocesos();
        getOptionsZona();
        getOptionsTipoActivo();
        getOptionsClasificacion();
    },[]);
    return   (
            <Row>
                <Col sm="12" lg={12} md={12}>
                    <Col  sm="6" lg={6} md={6}  >
                            <Form.Label>ID Aleatorio</Form.Label>
                            <Form.Control
                                type="text"
                                name="id_aleatorio"
                                required={true}
                                disabled={true}
                                onChange={onChangeValue}
                                value={inputs ? inputs.nombre : ""}
                            />
                    </Col>
                </Col>
                <Form.Group as={Col} sm="6" lg={6} md={6} controlId="validationCustom11" >
                    <Form.Label>Nombre del Activo</Form.Label>
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
                <Form.Group as={Col} sm="6" lg={6} md={6} controlId="validationCustom11" >
                    <Form.Label>Unidad Macro-Proceso</Form.Label>
                    <MultiSelect
                        options={optionsProceso}
                        value={selected}
                        onChange={setSelected}
                        labelledBy={"Select"}
                    />
                    <Form.Control.Feedback type="invalid">
                        El campo es obligatorio
                    </Form.Control.Feedback>
                </Form.Group>
                
               
                <Form.Group as={Col} sm="7" lg={6} md={6} controlId="validationCustom14" >
                    <Form.Label>Zona</Form.Label>
                    <Select
                            name="zona"
                            options={ optionsZona }
                            value={inputs.i_zona ? inputs.i_zona : {}}
                            required
                            onChange={(e, meta) => {
                                var data_select = { 'zona' : e.value , i_zona: e};
                                onChangeValue(e, data_select);
                            }}
                        />
                </Form.Group>
                <Form.Group as={Col} sm="5" lg={6} md={6} controlId="validationCustom15" >
                    <Form.Label>Ubicación</Form.Label>
                    <Select
                            name="ubicacion"
                            options={ optionsUbicacion }
                            value={inputs.i_ubicacion}
                            required
                            onChange={(e, meta) => {
                                var data_select = { 'ubicacion' : e.value , i_ubicacion: e};
                                onChangeValue(e, data_select);
                            }}
                        />
                </Form.Group>
                <Form.Group as={Col} sm="5" lg={6} md={6} controlId="validationCustom15" >
                    <Form.Label>Control de Acceso</Form.Label>
                    <Select
                            name="ubicacion"
                            options={ optionsControlAcceso }
                            value={inputs.i_control_acceso}
                            required
                            onChange={(e, meta) => {
                                var data_select = { 'control_acceso' : e.value , i_control_acceso: e};
                                onChangeValue(e, data_select);
                            }}
                        />
                </Form.Group>
                <Form.Group as={Col} sm="5" lg={6} md={6} controlId="validationCustom15" >
                    <Form.Label>Tipo activo</Form.Label>
                    <Select
                            name="tipo_activo"
                            options={ optionsTipoActivo }
                            value={inputs.i_tipo_activo}
                            required
                            onChange={(e, meta) => {
                                var data_select = { 'tipo_activo' : e.value , i_tipo_activo: e};
                                onChangeValue(e, data_select);
                            }}
                        />
                </Form.Group>
                <Form.Group as={Col} sm="5" lg={6} md={6} controlId="validationCustom15" >
                    <Form.Label>Clasificacion</Form.Label>
                    <Select
                            name="clasificacion"
                            options={ optionsClasificacion }
                            value={inputs.i_clasificacion}
                            required
                            onChange={(e, meta) => {
                                var data_select = { 'clasificacion' : e.value , i_clasificacion: e};
                                onChangeValue(e, data_select);
                            }}
                        />
                </Form.Group>
                <Form.Group as={Col} sm="5" lg={6} md={6} controlId="validationCustom15" >
                    <Form.Label>Estado</Form.Label>
                    <Select
                            name="estado"
                            options={ optionsEstado }
                            value={inputs.i_estado}
                            required
                            onChange={(e, meta) => {
                                var data_select = { 'estado' : e.value , i_estado: e};
                                onChangeValue(e, data_select);
                            }}
                        />
                </Form.Group>
                <Form.Group as={Col} sm="12" lg={12} md={12} controlId="validationCustom11" >
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control
                            as="textarea"
                            name="descripcion"
                            rows="3"
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
