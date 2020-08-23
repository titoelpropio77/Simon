import React, { useState, useEffect } from "react";
import { Button, Row, Col, Form, Alert } from "react-bootstrap";
import Select from "react-select";
import TablePersonalizate from "../table/tablePersonalizate.js";
import {
    saveDataForm,
    getById,
    deletedElement,
    getAllByClass,
    saveTypeDataForm
} from "../tools/tools";
const EstructuraFinanciamiento = props => {
    // saveDataForm( 'usuario', { nombre: "modesto", apellido : "saldaña" }, elementId );
    const [selectComponente, setSelectComponente] = useState([]);
    const [partida, setPartida] = useState([]);
    const [cofinaciadores, setCofinaciadores] = useState([]);
    const [componente, setComponente] = useState({});
    const [rowTable, setRowTable] = useState([]);
    const [inputs, setInputs] = useState([
        { componente: 0, partida: 0, arrayValue: [], arrayFuncId: [] }
    ]);

    const [ rowFooter, setRowFooter ] = useState([]);
    // const [ test, setTest ] = useState(props.confinaciadoresAll());
    const propertiesTableLocalizacion = () => {
        const columns = "";
        let head = ( //[{convNombre : "modesto" }, {convNombre : "tito" }, {convNombre : "rodrigo"}]
            <thead>
                <tr>
                    <th style={{ width: "20%" }}>Componente</th>
                    <th style={{ width: "20%" }}>Partida</th>
                    {cofinaciadores
                        ? cofinaciadores.map((item, index) =>
                              renderHeadTable(item, index)
                          )
                        : <th></th>}
                    <th>Total</th>
                    <th>Accion</th>
                </tr>
            </thead>
        );
        let footer = (
            <tfoot>
                <tr>
                    <td>Total</td>
                    <td></td>
                    {rowFooter
                        ? rowFooter.map((item, index) =>
                              tableRenderFooter(item, index)
                          )
                        : <td></td>}
                </tr>
            </tfoot>
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
            btnActionOthers: btnActionOthers,
            footer: footer
        };
    };

    const renderHeadTable = (item, index) => {
        return <th key={index}>{item.institucional.SIGLA}</th>;
    };
    useEffect(() => {
        setCofinaciadores(props.confinaciadoresAll.data);
        const setearComponen = async ()=>{
            if ( Object.keys(props.componenteAll).length ) {
            setComponente(props.componenteAll.data);
            const items =   props.componenteAll.data.map(x => ({
                    value: x.id,
                    label: x.cmpNombre,
                    monto: x.cmpMonto
                }));
                setSelectComponente(items);
            }
        }


        setearComponen();
        // getIndicadoresAll();
    }, [props.confinaciadoresAll, props.componenteAll]);

    useEffect(() => {
        /**
         * Obtiene la lista presupuestaria para setearla en el select
         */
        const getListClaPresupuestario = async () => {
            const response = await getAllByClass(
                "../getListClaPresupuestario",
                {}
            );
            if (response.status) {
                const options = response.data.map(x => {
                    return {
                        label: x.concepto,
                        value: x.id
                    };
                });
                setPartida(options);
            }
        };

        /**
         * Obtiene la lista de Estructura Financiamiento dado el proyecto id
         */
        const estructuraFinaciamientoByProyect = async () => {
            const response = await getAllByClass("../getEFByProyecto", {
                proyectoId: document.getElementById("proyecto_id").value
            });
            if (response.status) {
                // Start map response
                const items = response.data.map(elementEF => {
                    const arrayValue = elementEF.e_f_detalle.map(
                        x => x.pivot.monto
                    );
                    const arrayFuncId = elementEF.e_f_detalle.map(x => x.id);
                    const arrayEditFuncId = elementEF.e_f_detalle.map(
                        x => x.pivot.id
                    );
                    const total = arrayValue.reduce(
                        (a, b) => parseFloat(a) + parseFloat(b),
                        0
                    );
                    return {
                        id: elementEF.id,
                        arrayEditFuncId: arrayEditFuncId,
                        key: elementEF.id,
                        componente: elementEF.cmpId,
                        componenteSelected: {
                            label: elementEF.componente.cmpNombre,
                            value: elementEF.cmpId
                        },
                        partida: elementEF.presupId,
                        partidaSelected: {
                            label: elementEF.cla_presupuestario.concepto,
                            value: elementEF.presupId
                        },
                        total: total,
                        arrayValue: arrayValue,
                        arrayFuncId: arrayFuncId,
                        cofinaciadores: elementEF.e_f_detalle,
                        saveDisplay: "none",
                        editDisplay: "block",
                        isDisabled: true
                    };
                });
                //end maps response
                const arrayMontos = items.map(x => {
                    return x.arrayValue;
                });
                sumColumnas(arrayMontos);
                setRowTable([
                    ...items,
                    {
                        key: 0,
                        arrayEditFuncId: [],
                        id: rowTable.length
                            ? rowTable[rowTable.length - 1].id + 1
                            : 0,
                        componente: 0,
                        cofinaciadores: [],
                        componenteSelected: {},
                        partida: 0,
                        arrayValue: [],
                        arrayFuncId: [],
                        total: 0,
                        saveDisplay: "block",
                        editDisplay: "none",
                        isDisabled: false
                    }
                ]);
            }

            //   const response =  await getAllByClass( '../getEstructuraFinanciamientoByProyect', { proyectoId: document.getElementById( 'proyecto_id' ).value } );
        };
        getListClaPresupuestario();
        estructuraFinaciamientoByProyect();
    },[]);
    const sumColumnas = (arrayElement) => {
        if( arrayElement.length ){


        var arrayTotalCol = new Array();
        for (var i = 0; i < arrayElement[0].length; i++) {
            var sumarColumnas = 0;
            for (var j = 0; j < arrayElement.length; j++) {
                var col = arrayElement[j][i] ?arrayElement[j][i] : 0 ;
                sumarColumnas = sumarColumnas +  col  ;
            }
            arrayTotalCol.push(sumarColumnas);
        }
        var sumarTotales = arrayTotalCol.reduce((a,b) => parseFloat(a) + parseFloat(b), 0 );
        arrayTotalCol.push(sumarTotales);
        setRowFooter(arrayTotalCol);
        }
    }
    const handleOnchangeInput = (e, item, index, indexCof) => {
        const name = [e.target.name];
        const value = e.target.value ;

        const items = cofinaciadores.map(x => {
            if (x.id === item.id) {
                const valor = value == "" ? 0 : parseFloat(value);
                // rowTable[index]["total"] =
                // parseFloat( rowTable [ index ].total) + parseFloat( valor );
                rowTable[ index ][ "arrayValue" ][ indexCof] = parseFloat(value);
                rowTable[ index ]["arrayFuncId"][ indexCof ] = x.id;
                rowTable[ index ][ "total" ] = rowTable[ index ].arrayValue.reduce(
                    (a, b) => (parseFloat(a) + parseFloat(b)) == isNaN ? 0 : (parseFloat(a) + parseFloat(b)),
                    0
                );

                rowTable[ index ][ "total" ] = rowTable[ index ].total.isNaN ? 0 : rowTable[ index ].total;
            }

            return x;
        });

        const arrayMontos = rowTable.map(x => {
            return x.arrayValue;
        });
        sumColumnas(arrayMontos);
        setCofinaciadores(items);
    };
    const addRowTable = () => {
        setRowTable([
            ...rowTable,
            {
                key: 0,
                arrayEditFuncId: [],
                id: rowTable.length ? rowTable[rowTable.length - 1].id + 1 : 0,
                componente: 0,
                partida: 0,
                arrayValue: [],
                arrayFuncId: [],
                total: 0,
                saveDisplay: "block",
                editDisplay: "none"
            }
        ]);
    };
    const handleOnChangeSelect = (element, propsSelect, index, item) => {
        const name = propsSelect.name + "Selected";
        const items = rowTable.map(x => {
            if (x.id === item.id) {
                x[name] = element;
                x[propsSelect.name] = element.value;
            }
            return x;
        });
        setRowTable(items);
        // rowTable[index][name] = element;
    };
    const saveEstruturaFinanciamiento = async (index, item) => {
        if (!item.isDisabled) {
            const response = await saveDataForm("../estructuraFinanciamiento", {
                ...rowTable[index],
                proyectoId: document.getElementById("proyecto_id").value
            });
            if (response.status) {
                const items = rowTable.map(row => {
                    if (row.id === item.id) {
                        row["isDisabled"] = item.isDisabled ? false : true;
                        row["saveDisplay"] =
                            row.saveDisplay == "none" ? "block" : "none";
                        row["editDisplay"] =
                            row.editDisplay == "none" ? "block" : "none";
                        row["key"] = response.data;
                        row["arrayEditFuncId"] = response.arrayEditFuncId;
                    }
                    return row;
                });
                setRowTable(items);
                if (item.id === rowTable[rowTable.length - 1].id) {
                    addRowTable();
                }
            }
        } else {
            const items = rowTable.map(row => {
                if (row.id === item.id) {
                    row["isDisabled"] = item.isDisabled ? false : true;
                    row["saveDisplay"] =
                        row.saveDisplay == "none" ? "block" : "none";
                    row["editDisplay"] =
                        row.editDisplay == "none" ? "block" : "none";
                }
                return row;
            });
            setRowTable(items);
        }
    };
    /**
     * renderiza el body de la table, con el state rowTable
     * @param {*} item
     * @param {*} index
     */
    const tableRenderBody = (item, index) => {
        return (
            <tr key={index}>
                <td>
                    <Select
                        options={selectComponente}
                        name="componente"
                        value={item.componenteSelected}
                        isDisabled={item.isDisabled}
                        onChange={(e, propsSelect) =>
                            handleOnChangeSelect(e, propsSelect, index, item)
                        }
                    />
                </td>
                <td>
                    <Select
                        name="partida"
                        value={item.partidaSelected}
                        onChange={(e, propsSelect) =>
                            handleOnChangeSelect(e, propsSelect, index, item)
                        }
                        isDisabled={item.isDisabled}
                        options={partida}
                    />
                </td>
                {cofinaciadores
                    ? cofinaciadores.map((itemCof, indexCof) => {
                          const monto = item["arrayValue"].length
                              ? item["arrayValue"][indexCof]
                              : "";
                          return (
                              <td key={indexCof}>
                                  <Form.Control
                                      readOnly={item.isDisabled}
                                      type="number"
                                      value={monto}
                                      onChange={e =>
                                          handleOnchangeInput(
                                              e,
                                              itemCof,
                                              index,
                                              indexCof
                                          )
                                      }
                                  />
                              </td>
                          );
                      })
                    : ""}
                <td>
                    <span>{item.total}</span>
                </td>
                <td>
                    <Button
                        onClick={() => saveEstruturaFinanciamiento(index, item)}
                        style={{ display: item.saveDisplay }}
                    >
                        <i className="fas fa-save"></i>
                    </Button>
                    <Button
                        variant="warning"
                        onClick={() => saveEstruturaFinanciamiento(index, item)}
                        style={{ display: item.editDisplay }}
                    >
                        <i className="fas fa-edit"></i>
                    </Button>
                </td>
            </tr>
        );
    };
    /**
     *
     */
    const tableRenderFooter = (item, index) => {
        return <td key={index}>{rowFooter ? item : 0}</td>;
    };
    return (
        <Row>
            <TablePersonalizate
                propertiesTable={propertiesTableLocalizacion}
                rowTableRender={tableRenderBody}
                rowTable={rowTable}
                // rowFooter = {  }
            />
        </Row>
    );
};
export default EstructuraFinanciamiento;
