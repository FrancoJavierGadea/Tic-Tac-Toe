import { Alert } from "react-bootstrap";
import styled from "styled-components";

const StyledModal = styled.div`

    width: 100vw;
    height: 100vh;
    background-color: rgba(80, 80, 80, .5);

    position: fixed;
    top: 0; left: 0;
    z-index: 1500;

    display: flex;
    justify-content: center;
    align-items: center;

    .gameover-modal {
        width: 70%;
        max-width: 500px;
    } 
`;


function MultiplayerModal({show, children, isError, isInfo, onClose}) {

    return (<>
        {
            show && <StyledModal>

                <div className="gameover-modal rounded">

                    {isError && <Alert variant="danger" onClose={onClose} dismissible={onClose}>{children}</Alert>}

                    {isInfo && <Alert variant="info" onClose={onClose} dismissible={onClose}>{children}</Alert>}

                    {!isError && !isInfo && <Alert variant="secondary" onClose={onClose} dismissible={onClose}>{children}</Alert>}

                </div>

            </StyledModal>
        }
    </>);
}

export default MultiplayerModal;