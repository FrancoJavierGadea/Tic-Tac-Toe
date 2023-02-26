import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";
import { MultiplayerContext } from "../Multiplayer/MultiplayerProvider";

const StyledDiv = styled.div`
    .main {
        width: 400px;
        background-color: #0F0F3B;
        color: white;
        text-align: center;
        margin: 20px auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        box-shadow: 0px 0px 12px 0px rgba(89, 127, 253, 0.4);
    }
`;

const StyledJoinGameButton = styled(Button)`
    width: fit-content;
    white-space: nowrap;
    margin-left: 10px;
`;

const StyledCreateGameButton = styled(Button)`
    width: 100%;
`;

function CreateGameForm() {

    const {createGame, joinGame} = useContext(MultiplayerContext);

    const [roomCode, setRoomCode] = useState('');

    return (<StyledDiv>

        <div className="main rounded">

            <div className="border-bottom border-info">
                <h3>Unirse a un Juego</h3>

                <div className="d-flex py-4">
                    <Form.Control type="text" value={roomCode} onChange={({target: {value}}) => setRoomCode(value)} />

                    <StyledJoinGameButton variant="secondary" title="Unirse a una sala" disabled={!roomCode} onClick={() => joinGame(roomCode)}>Join Game</StyledJoinGameButton>
                </div>
            </div>

            <div className="pt-3">
                <StyledCreateGameButton variant="success" title="Crear juego" disabled={roomCode !== ''} onClick={() => createGame()}>Create Game</StyledCreateGameButton>
            </div>
        </div>

    </StyledDiv>);
}

export default CreateGameForm;