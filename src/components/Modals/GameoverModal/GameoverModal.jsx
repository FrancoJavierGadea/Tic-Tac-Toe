
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";
import { TURNS } from "../../../utils/GameLogic";

const StyledModal = styled(Modal)`

    .modal-content {
        --bs-modal-bg: #2E2E55;
        --bs-modal-color: #fff;
        box-shadow: -1px 0px 12px 1px rgba(255,255,255,.5);
    }
    .modal-header {
        --bs-modal-header-border-color: #1775d3;
    }

    h2 {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    h2 i {
        font-size: 50px;
        margin: 0 15px;
    }
`;

function GameoverModal({show, winner, handleClose = () => {}}) {

    return (<StyledModal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
            <Modal.Title className="w-100 text-center">Game over</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
            { winner === null && <h2>Empate !</h2> }
            { winner === TURNS.X && <h2><i className="bi bi-x-lg text-danger"></i> Gana !</h2> }
            { winner === TURNS.O && <h2><i className="bi bi-circle text-success"></i> Gana !</h2> }
        </Modal.Body>

    </StyledModal>);
}

export default GameoverModal;