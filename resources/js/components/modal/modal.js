import React from "React";
import Modal from "react-bootstrap/Modal";

const stateModal = state => {
    return state;
};
const ModalBT = props => {
    return (
        <form>
            <Modal
                show={props.state}
                onHide={props.closeModal}
                size="lg"
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Guardar {props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        {props.field}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" onClick={() => props.saveDataForm()}>
                        Guardar
                    </button>
                    <button className="btn btn-danger" type="submit" onClick={props.closeModal}>
                        Cancelar
                    </button>
                </Modal.Footer>
            </Modal>
        </form>
    );
};
export default ModalBT;
