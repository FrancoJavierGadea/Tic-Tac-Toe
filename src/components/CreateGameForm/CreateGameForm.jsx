import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import styled from "styled-components";
import MainAnimation from "../MainAnimation/MainAnimation";
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

    const {createGame, joinGame, playerName} = useContext(MultiplayerContext);

    const [roomCode, setRoomCode] = useState('');

    const [name, setName] = useState(playerName || '');

    const create = () => {

        if(name === '') return toast.info('Ingresa un nombre', {autoClose: 2000, hideProgressBar: true});

        createGame(name);
    }

    const join = () => {

        if(name === '') return toast.info('Ingresa un nombre', {autoClose: 2000, hideProgressBar: true});

        joinGame(roomCode, name);
    }

    return (<StyledDiv>

        <div className="main rounded">

            <div className="py-2">
                <h1>Tic Tac Toe</h1>
            </div>

            <MainAnimation />

            <div className="border-bottom border-info pt-2">
                <div className="d-flex py-4">
                    <Form.Control type="text" value={name} onChange={({target: {value}}) => setName(value)} placeholder="Ingresa un nombre"/>
                </div>
            </div>

            <div className="border-bottom border-info pt-2">
                <div className="d-flex py-4">
                    <Form.Control type="text" value={roomCode} onChange={({target: {value}}) => setRoomCode(value)} placeholder="Ingresa el codigo de la sala" />

                    <StyledJoinGameButton variant="secondary" title="Unirse a una sala" disabled={!roomCode} onClick={() => join()}>Unirse</StyledJoinGameButton>
                </div>
            </div>

            <div className="pt-3">
                <StyledCreateGameButton variant="success" title="Crear juego" disabled={roomCode !== ''} onClick={() => create()}>Crear Juego</StyledCreateGameButton>
            </div>
        </div>

    </StyledDiv>);
}

export default CreateGameForm;