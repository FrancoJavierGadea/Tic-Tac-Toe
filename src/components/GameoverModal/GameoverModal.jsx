import { Children } from "react";
import styled from "styled-components";
import { TURNS } from "../../utils/GameLogic";


const StyledModal = styled.div`

    width: 100vw;
    height: 100vh;
    background-color: rgba(80, 80, 80, .5);

    position: fixed;
    top: 0; left: 0;
    z-index: 1000;

    .gameover-modal {
        background-color: #2E2E55;
        width: 70%;
        margin: 150px auto;
        text-align: center;
        box-shadow: -1px 0px 12px 1px rgba(255,255,255,.5);
        max-width: 500px;
    }
    .gameover-modal h1 {
        color: #ffffff;
    }
    .gameover-modal-content {
        color: #ffffff;
    }
    .gameover-modal-content h2 {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .gameover-modal-content i {
        font-size: 47px;
        margin: 0 10px;
    }

`;

function GameoverModal({show, winner}) {


    return (<>
        {
            show && <StyledModal>

                <div className="gameover-modal rounded p-2">
                    <h1 className="p-2 border-bottom border-info">Game over</h1>
                    
                    <div className="gameover-modal-content p-2">
                        { winner === null && <h2>Empate !</h2> }
                        { winner === TURNS.X && <h2><i className="bi bi-x-lg text-danger"></i> Gana !</h2> }
                        { winner === TURNS.O && <h2><i className="bi bi-circle text-success"></i> Gana !</h2> }
                    </div>
                </div>

            </StyledModal>
        }
    </>);
}

export default GameoverModal;