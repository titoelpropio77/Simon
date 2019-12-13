import React from 'react';
import { Table, Row, Col, Form } from "react-bootstrap";

 const TablePersonalizate = (props) => {
    // console.log(props);
    return (<Table striped bordered hover size="sm">
        {props.propertiesTable().head}
    <tbody>
      {/* {props.propertiesTable().columns} */}
      {props.bodyTable.map( (index) => {return index.row} )}


    </tbody>
  </Table>);
}
export default TablePersonalizate;
