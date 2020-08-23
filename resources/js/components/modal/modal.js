import React from "React";
import Modal from "react-bootstrap/Modal";
import {  Form } from "react-bootstrap";

const stateModal = state => {
    return state;
};
const ModalBT = props => {
    return (
            <Modal
                show={props.state}
                onHide={props.closeModal}
                size="lg"
                name={props.name}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
            <Form 
            onSubmit={ props.handleSubmit } 
            validated={props.validated}
            >
            
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                         {props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        {props.field}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" type={ props.handleSubmit ? 'submit' : 'button' } style={{ display: props.visibleBtnSave }} onClick={() => 
                       {
                           console.log(props.saveDataForm);
                            if ( props.saveDataForm != undefined )
                            {
                                props.saveDataForm();
                            }
                          }
                        }>
                        Guardar
                    </button>
                    <button className="btn btn-danger" type="button" onClick={ props.closeModal}>
                        Cancelar
                    </button>
                </Modal.Footer>
             </Form>
            </Modal>
    );
};
export default ModalBT;
