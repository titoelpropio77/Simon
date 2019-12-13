import React, { useState,useEffect, useLayoutEffect  } from "react";
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
import { object } from "prop-types";



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
const getDepartamentoAll =  async  () => {
// const [ departamentos, setDepartamentos ] = useState();
const response =   getAllByClass(
    "../getDepartamentoAllForProyecto",
            {}
        );
    if ( response.status)
    {
        const data =  response.data;
        data.map(x => ({ label : x.locNombre, value : x.id }) );
        return  data;
    }
    return  response;
};


const getProviciasByDepartamentoId =  async  (data) => {
    // const [ departamentos, setDepartamentos ] = useState();
    const response =  await getAllByClass(
        "../getProviciasByDepartamentoId",
             data
            );
        if ( response.status)
        {
            const data =  response.data;
            data.map(x => ({ label : x.locNombre, value : x.id }) );
            // setDepartamentos( data);

            return  data;
        }
        // console.log( await response );
        return  response;
    };
const localizacion = (props) => {
    const [ departamentos, setDepartamentos ] = useState([{label: 'seleccione', value: 0}]);
    const [ provincias, setProvincias ] = useState([{label: 'seleccione un valor', value:0}]);


    useEffect ((e) => {

        // Cree una función asíncrona de alcance en la
        async function anyFunction() {
           const response  = await getDepartamentoAll();
           if  (response.status)
           {
            const data = response.data.map(x => ({
                label: x.locNombre,
                value: x.id
            }));
            setDepartamentos(data);
           }
        }
        // Ejecute la función creada directamente
            anyFunction () ;
      }, []);
    const [rowTable, setRowTable] = useState([{ row :
        <tr>
            <td><Select name={`departamentoId0`} options={departamentos} /></td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
        </tr>, key : 0
    }
    ]);

    /**
     * se activa cuando se ejecuta un cambio de valor en el select
     * */
    const handleChangeSelect = (e) => {
        const getProviciasByDepartamentoId =  async  (dataSend) => {
            const response =  await getAllByClass(
                "../getProviciasByDepartamentoId",
                dataSend
                    );
                if ( response.status)
                {
                    const data = response.data.map(x => ({
                        label: x.locNombre,
                        value: x.id
                    }));

                    setProvincias( await data);
                    return  data;
                }
                return  response;
            };
        const dataSend = { id: e.value};
        getProviciasByDepartamentoId(dataSend);
    }

    const [count, setCount] = useState(1);
    const addRowTable = () => {
        setCount( count +1 );
        const newRow = (
            <tr>
                <td>
                    <Select
                    name={`departamentoId${count}`}
                    options={departamentos}
                    onChange={handleChangeSelect}
                    />
                </td>
                <td><Select
                    name={`provinciaId${count}`}
                    options={provincias}
                    // onChange={handleChangeSelect}
                    /></td>
                <td>Thornton</td>
                <td>@fat</td>
            </tr>
        );
        setRowTable(row => [...row, {row : newRow, key: count}]);
    };
    // getDepartamentoAll();
    return (
        <Form>
            <Row>
                <h2>Codigo SISIN: </h2>&nbsp;&nbsp;&nbsp;&nbsp;
                <h2>Nombre del Proyecto</h2>
                <Button
                    variant="primary float-right"
                    onClick={() => {addRowTable();

                    }}
                >
                    Adicionar Nuevo
                </Button>
            </Row>
            <TablePersonalizate
                propertiesTable={propertiesTableLocalizacion}
                bodyTable={rowTable}
            />
            <Row>
                <Button variant="success">Ver mapa</Button>
                <Button variant="warning float-right">
                    Grabar e ir Confinaciadores
                </Button>
            </Row>

        </Form>
    );
};

export default localizacion;
