import React, { useState, useEffect, useLayoutEffect } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import Select from "react-select";
import Table, { reloadTableData } from "../table/table.js";
import TablePersonalizate from "../table/tablePersonalizate.js";
import {
    saveDataForm,
    getById,
    deletedElement,
    getAllByClass
} from "../tools/tools";

const propertiesTableLocalizacion = () => {
    const [selectElementOption, setSelectElementOption] = useState({
        value: 1,
        label: "Seleccione"
    });
    const [optionsElement, setOptionsElement] = useState([
        { value: 1, label: "Seleccione" }
    ]);
    const columns = (
        <tr>
            <td>
                <Select options={optionsElement} />
            </td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
        </tr>
    );
    let head = (
        <thead>
            <tr>
                <th>Departamento</th>
                <th>Provincia</th>
                <th>Municipio</th>
                <th>Comunidad</th>
                <th>Localidad</th>
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

/**
 * obtiene una lista de departamento
 * funcion principal: setear valor para Departamentos en el select
 */
const getDepartamentoAll = async () => {
    // const [ departamentos, setDepartamentos ] = useState();
    const response = getAllByClass("../getDepartamentoAllForProyecto", {});
    if (response.status) {
        const data = response.data;
        data.map(x => ({ label: x.locNombre, value: x.id }));
        return data;
    }
    return response;
};

const Localizacion = props => {
    const [departamentos, setDepartamentos] = useState([
        { label: "seleccione", value: 0 }
    ]);
    const [maskField, setMaskField] = useState([]);
    const [rowTable, setRowTable] = useState([]);

    useEffect(() => {
        console.log("useEfect");
        // Cree una función asíncrona de alcance en la
        async function anyFunction() {
            const response = await getDepartamentoAll();
            if (response.status) {
                const data = response.data.map(x => ({
                    label: x.locNombre,
                    value: x.id
                }));
                setDepartamentos(data);
                const proyectoId = document.getElementById("proyecto_id").value;
                if (proyectoId) {
                    const resultLocalitationAll = await getAllByClass(
                        "../getLocalitationByProyectoId",
                        { proyectoId: proyectoId }
                    );
                    if (resultLocalitationAll.status) {
                        const data = resultLocalitationAll.data;
                        handleAddRow(data);
                    }
                } else {
                    handleAddRow();
                }
                return data;
            }
        }
        // Ejecute la función creada directamente
        anyFunction();
    }, []);

    const saveForm = async (e) => {
        if(e)
        {
            e.preventDefault();
            e.stopPropagation();
        }

        // setMaskField( [ ...maskField, { proyectoId: props.codSinSin } ]);
        const response = saveDataForm("../proyectoLocalizacion", {
            maskField,
            proyectoId: props.codSinSin
        });
        if (response.status) {
        }
    };
    const getMaskField = () => {
        const fields = rowTable.map(x => ({
            localidad: x.localidad,
            id: x.index
        }));
        setMaskField(fields);
    };
    /**
     *
     * */
    const handleChangeSelect = async (e, meta, item, index) => {
        const name = meta.name;
        var nameSam = "";
        switch (name) {
            case "departamento":
                nameSam = "provincias";
                break;
            case "provincia":
                nameSam = "municipios";
                break;
            case "municipio":
                nameSam = "comunidades";
                break;
            case "comunidad":
                nameSam = "localidades";
                break;
        }
        const getProviciasByDepartamentoId = async dataSend => {
            const response = await getAllByClass(
                "../getProviciasByDepartamentoId",
                dataSend
            );
            if (response.status) {
                const data = response.data.map(x => ({
                    label: x.locNombre,
                    value: x.id
                }));

                let items = rowTable.map(row => {
                    if (row.id === item.id) {
                        row[nameSam] = data;
                        row[name] = e;
                    }
                    return row;
                });
                setRowTable(items);
                getMaskField();
                console.log(rowTable);
                return data;
            }
            return response;
        };
        const dataSend = { id: e.value };
        getProviciasByDepartamentoId(dataSend);
    };

    const handleAddRow = elements => {
        if (!elements) {
            let item = {
                id: rowTable.length ? rowTable[rowTable.length - 1].id + 1 : 0,
                index: 0,
                departamento: "",
                provincia: [{ label: "seleccione un valor", value: 0 }],
                municipio: [{ label: "seleccione un valor", value: 0 }],
                comunidad: [{ label: "seleccione un valor", value: 0 }],
                localidad: [{ label: "seleccione un valor", value: 0 }],

                departamentos: departamentos,
                provincias: [{ label: "seleccione un valor", value: 0 }],
                municipios: [{ label: "seleccione un valor", value: 0 }],
                comunidades: [{ label: "seleccione un valor", value: 0 }],
                localidades: [{ label: "seleccione un valor", value: 0 }]
            };
            setRowTable([...rowTable, item]);
        } else {
            // elements.forEach(element => {
            const items = elements.map(element => {
                return {
                    id: element.id,
                    index: element.id,
                    departamento: {
                        label: element.departamento[0].locNombre,
                        value: element.departamento[0].id
                    },
                    municipio: {
                        label: element.municipio[0].locNombre,
                        value: 0
                    },
                    provincia: {
                        label: element.provincia[0].locNombre,
                        value: element.provincia[0].id
                    },
                    comunidad: {
                        label: element.comunidad[0].locNombre,
                        value: element.comunidad[0].id
                    },
                    localidad: {
                        label: element.localidad[0].locNombre,
                        value: element.localidad[0].id
                    },
                    departamentos: departamentos,
                    provincias: element.provincia.map(x => ({
                        index: x.id,
                        label: x.locNombre,
                        value: x.id
                    })),
                    municipios: element.municipio.map(x => ({
                        index: x.id,
                        label: x.locNombre,
                        value: x.id
                    })),
                    comunidades: element.comunidad.map(x => ({
                        index: x.id,
                        label: x.locNombre,
                        value: x.id
                    })),
                    localidades: element.localidad.map(x => ({
                        index: x.id,
                        label: x.locNombre,
                        value: x.id
                    }))
                };
            });

            setRowTable(items);
            // console.log(elements);
            // setRowTable([...rowTable, elements]);
            // });
        }
        console.log(rowTable);
    };
    const handleRemoveSpecificRow = item => () => {
        let items = rowTable.filter(row => row.id != item.id);
        setRowTable(items);
    };
    const rowTableRender = (item, index) => {
        return (
            <tr key={index}>
                <td>
                    <Select
                        name={"departamento"}
                        options={departamentos}
                        onChange={(e, meta) => {
                            handleChangeSelect(e, meta, item, index);
                        }}
                        value={item.departamento}
                    />
                </td>
                <td>
                    <Select
                        name={`provincia`}
                        options={item.provincias}
                        onChange={(e, meta) => {
                            handleChangeSelect(e, meta, item, index);
                        }}
                        value={item.provincia}
                    />
                </td>
                <td>
                    <Select
                        name={`municipio`}
                        onChange={(e, meta) => {
                            handleChangeSelect(e, meta, item, index);
                        }}
                        options={item.municipios}
                        value={item.municipio}
                    />
                </td>
                <td>
                    <Select
                        name={`comunidad`}
                        options={item.comunidades}
                        onChange={(e, meta) => {
                            handleChangeSelect(e, meta, item, index);
                        }}
                        value={item.comunidad}
                    />
                </td>
                <td>
                    <Select
                        name={`localidad`}
                        options={item.localidades}
                        onChange={(e, meta) => {
                            handleChangeSelect(e, meta, item, index);
                        }}
                        value={item.localidad}
                    />
                </td>
                <td>
                    <Button
                        variant={"danger"}
                        onClick={handleRemoveSpecificRow(item)}
                    >
                        <i className="fas fa-trash-alt"></i>
                    </Button>
                </td>
            </tr>
        );
    };

    return (
        <Form>
            <Row>
                <Col lg={4} md={4}>
                    <h2>Codigo SISIN: {props.codSinSin}</h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                </Col>
                <Col lg={4} md={4}>
                    <h2>Nombre: {props.nombreProy}</h2>
                </Col>
                <Col lg={4} md={4}>
                    <Button
                        variant="primary float-right"
                        onClick={() => {
                            handleAddRow();
                        }}
                    >
                        Adicionar Nuevo
                    </Button>
                </Col>
            </Row>
            <TablePersonalizate
                propertiesTable={propertiesTableLocalizacion}
                rowTable={rowTable}
                rowTableRender={rowTableRender}
            />
            <Row>
                <Col lg={4} md={4}>
                    <Button variant="success">Ver mapa</Button>
                    <Button
                        variant="warning float-right"
                        onClick={() => saveForm()}
                    >
                        Grabar e ir Confinaciadores
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default Localizacion;
