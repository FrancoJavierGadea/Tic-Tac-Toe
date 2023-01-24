import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { MultiplayerContext } from "../MutiplayerProvider/MultiplayerProvider";

const StyledModal = styled.div`

    width: 100vw;
    height: 100vh;
    background-color: rgba(80, 80, 80, .5);

    position: fixed;
    top: 0; left: 0;
    z-index: 1000;

    display: flex;
    justify-content: center;
    align-items: center;

    .gameover-modal {
        width: 70%;
        max-width: 500px;
    } 
`;

const StyledOptions = styled.div`

    width: 70%;
    max-width: 500px;
    margin: auto;
    padding: 10px;
    background-color: #1D1D5A;
    border-radius: 10px;
`;


function MultiplayerOptions({show}) {

    const {createGame, joinToGame} = useContext(MultiplayerContext);

    const [nameValue, setNameValue] = useState('');

    const [roomValue, setRoomValue] = useState('');

    const changeNameValue = ({target: {value}}) => setNameValue(value);

    const changeRoomValue = ({target: {value}}) => setRoomValue(value);



    return (<>
        {
            show && <StyledModal>

                <StyledOptions>

                    <div className="p-2">
                        <h3 className="text-light text-center p-2">Ingresa tu nombre</h3>
                        <input className="form-control" type="text" value={nameValue} onChange={changeNameValue} />
                    </div>

                    <div className="p-2 mt-2">
                        <h3 className="text-light text-center p-2">Ingresa el codigo de la sala</h3>

                        <div className="d-flex">
                            <input className="form-control me-2" type="text" value={roomValue} onChange={changeRoomValue} />

                            <Button variant="secondary" onClick={() => joinToGame(nameValue, roomValue)} style={{minWidth: '100px'}} disabled={!nameValue || !roomValue}>Join Game</Button>
                        </div>
                    </div>

                    <div className="p-2 mt-2">
                        <Button  variant="success" onClick={() => createGame(nameValue)} className="w-100" disabled={!nameValue || roomValue}>Create Game</Button>
                    </div>

                </StyledOptions>


            </StyledModal>
        }
    </>);
        
    
}

export default MultiplayerOptions;