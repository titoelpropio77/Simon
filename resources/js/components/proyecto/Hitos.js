import React from 'react';
import TablePersonalizate from "../table/tablePersonalizate.js";
const Hitos = () =>
{
    const propertiesTableLocalizacion = () => {
        const columns = ""
        const btnActionUpdate = ""
        const btnActionDelete = ""
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
    }
    return (
        <Row>
            <Col md="12">
                <span>Nombre Proyecto</span><br/>
                <span>componente</span>
            </Col>
            <Col md="12">
            <TablePersonalizate
                propertiesTable={propertiesTableLocalizacion}
                // rowTable={rowTable}
                // rowTableRender={rowTableRender}
            />
            </Col>
        </Row>
    )
}
export default Hitos;
