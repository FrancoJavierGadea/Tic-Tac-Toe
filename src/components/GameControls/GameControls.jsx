import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import Chat from "../Chat/Chat";
import { MultiplayerContext } from "../Multiplayer/MultiplayerProvider";
import PlayerInfo from "./PlayerInfo";
import { useMediaQuery } from 'react-responsive'

const StyledGameControls = styled.div`

    position: absolute;
    top: 0; bottom: 0;
    z-index: 2000;
    width: 100vw;
    height: 100vh;

    .control-container {
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100vw;
    }
    .room-info {
        background-color: #2A2A4F;
        color: white;
        width: 350px;
        text-align: center;
        box-shadow: 0px 0px 5px 0px rgba(89, 127, 253, 0.4);
    }
    .room-info .room-code {
        color: black;
        background-color: #a8a8a8;
        width: fit-content;
        margin: auto;
        padding: 5px 15px;
        border-radius: 2px;
        position: relative;
    }

    .chat {
        box-shadow: 0px 0px 5px 0px rgba(89, 127, 253, 0.4);
    }

    .buttons {
        position: absolute;
        top: 10px; left: 10px;

        .btn {
            font-size: 28px;
            border: 0;
            display: block;
        }
    }
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

    const {room, leaveGame, startGame, player} = useContext(MultiplayerContext);

    const [coping, setCoping] = useState(false);

    const isMobile = useMediaQuery({ query: '(max-width: 960px)' });

    const copyRoomCode = () => {

        setCoping(true);

        navigator.clipboard.writeText(room).then(() => {

            setTimeout(() => setCoping(false), 1000);
        });
    }

    const out= () => {

        if(confirm('¿ Abandonar juego ?')){

            leaveGame();
        } 
    }

    const resetGame = () => {

        if(confirm('¿ Resetear contadores ?')){

            startGame({firstGame: true});
        }
    }   

    return (<StyledGameControls>

        <div className="buttons" style={isMobile ? {top: '110px', left: '5px'} : undefined}>

            <Button size={isMobile ? 'sm' : 'lg'} variant="outline-danger" title="Abandonar Sala" onClick={out}>
                <i className="bi bi-box-arrow-left"></i>
            </Button>

            {
                player === 'player 1' &&
                <Button size={isMobile ? 'sm' : 'lg'} variant="outline-secondary" title="Reiniciar Juego" onClick={resetGame}>
                    <i className="bi bi-arrow-counterclockwise"></i>
                </Button>
            }
        </div>

        <div className="control-container" style={{zIndex: 3000}}>

            { isMobile && <PlayerInfo className="rounded-2 mb-2 justify-content-center" style={{width: '350px'}} /> }

            <div className={'room-info p-2 ' + (isMobile ? 'rounded' : 'rounded-top')}>
                <h6 className="p-1">Comparte este codigo con un amigo</h6>

                <h3 className="room-code">
                    {room}
                    <StyledCopyButton onClick={copyRoomCode} title="Copiar">
                        { !coping && <i className="bi bi-clipboard"></i> }
                        { coping && <i className="bi bi-check2"></i> }
                    </StyledCopyButton>
                </h3>
            </div>

            { isMobile && <div className="chat mt-2 rounded-top" style={{overflow: "hidden"}}>
                <Chat style={{width: '350px'}} height="200px"/>
            </div> }
        </div>

        {!isMobile && <div className="control-container" style={{alignItems: 'flex-start'}}>
            <PlayerInfo />
        </div>}
        
        {!isMobile && <div className="control-container" style={{width: 'fit-content', right: 0, zIndex: 3100}}>

            <div className="chat" style={{borderTopLeftRadius: '10px', overflow: "hidden"}}>
                <Chat />
            </div>

        </div>}

    </StyledGameControls>);
}

export default GameControls;