import React from "react";
import { Table, Row, Col, Form } from "react-bootstrap";

const TablePersonalizate = props => {
    // console.log(props);
    return (
        <Table striped bordered hover size="sm">
            {props.propertiesTable().head}
            <tbody>
                {props.rowTable
                    ? props.rowTable.map((item, index) =>
                          props.rowTableRender(item, index)
                      )
                    : <tr></tr>}
            </tbody>
        </Table>
    );
};
export default TablePersonalizate;
