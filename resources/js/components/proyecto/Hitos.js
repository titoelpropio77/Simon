import React, { useState, useEffect } from "react";
import TablePersonalizate from "../table/tablePersonalizate.js";
import ModalBT from "../modal/modal";
import { Button, Row, Col, Form, Alert } from "react-bootstrap";
import Select from "react-select";
import {
    saveDataForm,
    getById,
    deletedElement,
    getAllByClass,
    saveTypeDataForm
} from "../tools/tools";

const Hitos = props => {
    // const [showModal, setShowModal] = useState(props.showHito);
    const propertiesTableLocalizacion = () => {
        const columns = "";
        const btnActionUpdate = "";
        const btnActionDelete = "";
        const btnActionOthers = "";
        let head = (
            <thead>
                <tr>
                    <th>Hitos de Control Metas</th>
                    <th>Hito o meta</th>
                    <th>Plazo Dias medir</th>
                    <th>Cantidad</th>
                    <th>Accion</th>
                </tr>
            </thead>
        );
        return {
            columns: columns,
            head: head,
            targets: [6],
            btnActionDelete: btnActionDelete,
            btnActionUpdate: btnActionUpdate,
            btnActionOthers: btnActionOthers
        };
    };

    const [rowTable, setRowTable] = useState(props.dataRowHitos);
    const [opSelHitosMetas, setOpSelHitosMetas] = useState([]);
    const [inputs, setInputs] = useState();
    // const [ opsSelHito, setOpsSelHito ] = useState([{ label: "Meta", value : 1 }, { label: "Hito", value : 2}]);
    useEffect(() => {
        /**
         * Obtiene la lista de indicadores de la tabla Aux_indicadores para cargarlo en el selected de la tabla
         */
        const getIndicadoresAll = async () => {
            const response = await getAllByClass(
                "../getIndicadoresAllForProyect",
                {}
            );
            if (response.status) {
                const options = response.data.map(x => ({
                    label: x.indNombre,
                    value: x.id
                }));
                setOpSelHitosMetas(options);
            }
        };
        /**
         *  extraer todos los hitos dado un elemento seleccionado en la tabla de componentes
         */
        if (props.hito) {
            const getHitosByIdComponente = async () => {

                const response = await getAllByClass(
                    "../getHitosByIdComponente",
                    {
                        componenteId: props.hito
                    }
                );
                if (response.status) {

                    var items = response.data.map(x => {
                        return {
                            id: x.id,
                            key: x.id,
                            hito: x.tipo,
                            plazoDias: x.plazoMedirDias,
                            cantidad: x.cantidad,
                            saveDisplay: "none",
                            isDisabled: true,

                            editDisplay: "block",
                            //select
                            selectedHitosOfControl: {
                                label: x.aux_indicadores.indNombre,
                                value: x.aux_indicadores.id
                            },
                            selectedHitoMeta:
                                x.tipo == 1
                                    ? { label: "Meta", value: 1 }
                                    : { label: "Hito", value: 2 }
                        };
                    });
                    items = [
                        ...items,
                        {
                            id: items.length
                                ? items[items.length - 1].id + 1
                                : 0,
                            key: null,
                            hito: "",
                            plazoDias: "",
                            isDisabled: false,
                            cantidad: "",
                            saveDisplay: "block",
                            editDisplay: "none",
                            selectedHitoMeta: "",
                            selectedHitosOfControl: [
                                { label: "select", value: 0 }
                            ]
                        }
                    ];
                    setRowTable(items);
                    // handleAddRow
                    // setDataRowHitos(...x,);
                    // setHito(id);
                }
            };
            getHitosByIdComponente();
        }

        getIndicadoresAll();
    }, [props.hito]);
    ///  renderiza el body delmodal
    const bodyModal = () => {
        return (
            <Row>
                <Col md="12">
                    <span>Nombre Proyecto</span>
                    <br />
                    <span>componente</span>
                </Col>
                <Col md="12">
                    <TablePersonalizate
                        propertiesTable={propertiesTableLocalizacion}
                        rowTable={rowTable}
                        rowTableRender={rowTableRender}
                    />
                </Col>
            </Row>
        );
    };
    const handleAddRow = () => {
        setRowTable([
            ...rowTable,
            {
                id: rowTable.length ? rowTable[rowTable.length - 1].id + 1 : 0,
                key: null,
                hito: "",
                plazoDias: "",
                cantidad: "",
                isDisabled: false,
                saveDisplay: "block",
                editDisplay: "none",
                selectedHitoMeta: "",
                selectedHitosOfControl: { label: "select", value: 0 }
            }
        ]);
    };
    const saveHito = async item => {
        console.log(item);
        if (!item.isDisabled) {
            const response = await saveDataForm(
                "../compIndicadores",
                {
                    ...item,
                    componente: props.hito,
                    indId: item.selectedHitosOfControl.value,
                    tipo: item.selectedHitoMeta.value
                },
                item.key
            );
            if (response.status) {
                const items = rowTable.map(row => {
                    if (row.id === item.id) {
                        row["isDisabled"] = item.isDisabled ? false : true;
                        row["saveDisplay"] =
                            row.saveDisplay == "none" ? "block" : "none";
                        row["editDisplay"] =
                            row.editDisplay == "none" ? "block" : "none";
                        row["key"] = response.data;
                    }
                    return row;
                });
                setRowTable(items);
                if (item.id === rowTable[rowTable.length - 1].id) {
                    handleAddRow();
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
    const handleChangeInput = (e, item) => {
        const name = [event.target.name];
        const value = e.target.value;
        const items = rowTable.map(x => {
            if (x.id === item.id) {
                x[name] = value;
            }
            return x;
        });
        setRowTable(items);
    };
    const handleChangeSelect = (value, e, item) => {
        const name = [e.name];
        const items = rowTable.map(x => {
            if (x.id === item.id) {
                x[name] = value;
            }
            return x;
        });
        setRowTable(items);
    };
    const rowTableRender = (item, index) => {
        return (
            <tr key={index}>
                <td>
                    <Select
                        value={item.selectedHitosOfControl}
                        options={opSelHitosMetas}
                        name="selectedHitosOfControl"
                        isDisabled={item.isDisabled}
                        onChange={(value, e) => {
                            handleChangeSelect(value, e, item);
                        }}
                    />
                </td>
                <td>
                    <Select
                        value={item.selectedHitoMeta}
                        name="selectedHitoMeta"
                        isDisabled={item.isDisabled}
                        options={[
                            { label: "Meta", value: 1 },
                            { label: "Hito", value: 2 }
                        ]}
                        onChange={(value, e) => {
                            handleChangeSelect(value, e, item);
                        }}
                    />
                </td>
                <td>
                    <Form.Control
                        readOnly={item.isDisabled}
                        type="number"
                        name="plazoDias"
                        value={item.plazoDias}
                        onChange={e => handleChangeInput(e, item)}
                    />
                </td>
                <td>
                    <Form.Control
                        readOnly={item.isDisabled}
                        type="number"
                        name="cantidad"
                        value={item.cantidad}
                        onChange={e => handleChangeInput(e, item)}
                    />
                </td>
                <td>
                    <Button
                        onClick={() => saveHito(item)}
                        style={{ display: item.saveDisplay }}
                    >
                        <i className="fas fa-save"></i>
                    </Button>
                    <Button
                        variant="warning"
                        onClick={() => saveHito(item)}
                        style={{ display: item.editDisplay }}
                    >
                        <i className="fas fa-edit"></i>
                    </Button>
                </td>
            </tr>
        );
    };
    return (
        <ModalBT
            state={props.showHito}
            field={bodyModal()}
            title={"Metas e Hitos"}
            closeModal={props.closeHito}
            saveDataForm={saveHito}
        />
    );
};
export default Hitos;
