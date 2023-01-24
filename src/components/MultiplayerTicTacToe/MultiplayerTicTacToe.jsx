import { useContext } from "react";
import { Button, Container } from "react-bootstrap";
import styled from "styled-components";
import GameChat from "../GameChat/GameChat";
import MutiplayerInfo from "../MultiplayerInfo/MultiplayerInfo";
import MultiplayerModal from "../MultiplayerModal/MultiplayerModal";
import MultiplayerOptions from "../MultiplayerOptions/MultiplayerOptions";
import { MultiplayerContext } from "../MutiplayerProvider/MultiplayerProvider";




function MutiplayerTicTacToe() {

    const {leaveGame, gameErrors, setGameErrors, waitingPlayer, userName, room, isConnected} = useContext(MultiplayerContext);

    return (<div>

        <MultiplayerModal show={!isConnected} isError>No hay conexion con el servidor...</MultiplayerModal>

        <MultiplayerOptions show={isConnected && (!userName || !room)} />

        <MultiplayerModal show={gameErrors} isError onClose={() => setGameErrors(null)}>{gameErrors?.message}</MultiplayerModal>

        <MultiplayerModal show={waitingPlayer} isInfo>
            <h2 className="text-center border-bottom border-info p-2">Esperando Jugador...</h2>
            <h4 className="text-center">Comparte este codigo con un amigo</h4>
            <h1 className="text-center">{room}</h1>
        </MultiplayerModal>




            
        <GameChat />

        {
            room &&
            <Button className="position-fixed m-1 border-0 fs-2" style={{top: 0, left: 0, zIndex: 3000}} variant="outline-danger" title="Abandonar sala" onClick={() => leaveGame(room)}>
                <i className="bi bi-box-arrow-left"></i>
            </Button>
        }
                
        <MutiplayerInfo />
    </div>);
}

export default MutiplayerTicTacToe;