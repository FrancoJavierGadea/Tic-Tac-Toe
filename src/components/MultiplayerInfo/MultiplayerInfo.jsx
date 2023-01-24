import { useContext } from "react";
import styled from "styled-components";
import { MultiplayerContext } from "../MutiplayerProvider/MultiplayerProvider";

const StyledInfo = styled.div`

    position: fixed;
    bottom: 0;
    left: 0;

    background-color: white;

    display: flex;

    & > *{
        margin: 0 10px;
    }
`;

function MutiplayerInfo() {

    const {userName, room, isConnected} = useContext(MultiplayerContext);

    return (<StyledInfo className="rounded-top">
        <div>
            <strong>Conecction:</strong><span className="mx-1">{isConnected ? 'Conectado' : 'Desconectado'}</span>
        </div>

        <div>
            <strong>Room:</strong><span className="mx-1">{room}</span>
        </div>

        <div>
            <strong>User name:</strong><span className="mx-1">{userName}</span>
        </div>

    </StyledInfo>);
}

export default MutiplayerInfo;