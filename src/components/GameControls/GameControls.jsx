import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { MultiplayerContext } from "../Multiplayer/MultiplayerProvider";

const StyledGameControls = styled.div`

    position: fixed;
    top: 0; bottom: 0;
    z-index: 2000;

    .room-info {
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: center;
        width: 100vw;
    }
    .room-info > div {
        background-color: #2A2A4F;
        color: white;
        width: 350px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        padding: 10px;
        text-align: center;
        box-shadow: 0px 0px 5px 0px rgba(89, 127, 253, 0.4);
    }
    .room-code {
        color: black;
        background-color: #a8a8a8;
        width: fit-content;
        margin: auto;
        padding: 5px 15px;
        border-radius: 2px;
        position: relative;
    }

    .player-info {
        position: absolute;
        bottom: 0;
        left: 0;
        min-width: 130px;
        background-color: #2A2A4F;
        color: white;
        border-top-right-radius: 10px;
        box-shadow: 0px 0px 5px 0px rgba(89, 127, 253, 0.4);
    }
    .player-info i {
        font-size: 18px;
    }
`;

const StyledOutButton = styled(Button)`

    position: absolute;
    top: 10px; left: 10px;
    font-size: 28px;
    border: 0;
`;

const StyledResetButton = styled(Button)`

    position: absolute;
    top: 70px; left: 10px;
    font-size: 28px;
    border: 0;
`;

const StyledCopyButton = styled(Button)`

    position: absolute;
    left: 0; right: 0; top: 0; bottom: 0;
    margin: auto;
    opacity: 0;
    border-radius: 0;

    &:hover {
        opacity: 1;
        transition: all 0.5s;
        --bs-btn-hover-bg: #0b5dd799;
        --bs-btn-active-bg: #0b5dd799;
    }
`;


function GameControls() {

    const {room, playerTurn, player, leaveGame, startGame} = useContext(MultiplayerContext);

    const [coping, setCoping] = useState(false);

    const copyRoomCode = () => {

        setCoping(true);

        navigator.clipboard.writeText(room).then(() => {

            setTimeout(() => setCoping(false), 1000);
        });
    }

    return (<StyledGameControls>

        <StyledOutButton variant="outline-danger" title="Abandonar Sala" onClick={() => leaveGame()}>
            <i className="bi bi-box-arrow-left"></i>
        </StyledOutButton>

        <StyledResetButton variant="outline-secondary" title="Reiniciar Juego" onClick={() => startGame({firstGame: true})}>
            <i className="bi bi-arrow-counterclockwise"></i>
        </StyledResetButton>

        <div className="room-info">
            <div>
                <h6 className="p-1">Comparte este codigo con un amigo</h6>

                <h3 className="room-code">
                    {room}
                    <StyledCopyButton onClick={copyRoomCode} title="Copiar">
                        { !coping && <i className="bi bi-clipboard"></i> }
                        { coping && <i className="bi bi-check2"></i> }
                    </StyledCopyButton>
                </h3>
            </div>
        </div>

        <div className="player-info p-2 d-flex align-items-center">
            <h5 className="my-0 mx-2 pb-1">{player?.charAt(0).toUpperCase() + player?.slice(1)}:</h5>
            { playerTurn === 'o' && <i className="bi bi-circle text-success"></i> }
            { playerTurn === 'x' && <i className="bi bi-x-lg text-danger"></i> }
        </div>

    </StyledGameControls>);
}

export default GameControls;