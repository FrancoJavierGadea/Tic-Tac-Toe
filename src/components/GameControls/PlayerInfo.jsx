import { useContext } from "react";
import styled from "styled-components";
import { MultiplayerContext } from "../Multiplayer/MultiplayerProvider";

const StyledPlayerInfo = styled.div`

    min-width: 130px;
    padding: 10px;
    background-color: #2A2A4F;
    color: white;
    border-top-right-radius: 10px;
    box-shadow: 0px 0px 5px 0px rgba(89, 127, 253, 0.4);

    display: flex;
    align-items: center;
    
    i {
        font-size: 18px;
    }
`;

function PlayerInfo({style, className}) {

    const {playerTurn, player} = useContext(MultiplayerContext);

    return (<StyledPlayerInfo className={className} style={style}>

        <h5 className="my-0 mx-2 pb-1">{player?.charAt(0).toUpperCase() + player?.slice(1)}:</h5>

        { playerTurn === 'o' && <i className="bi bi-circle text-success"></i> }

        { playerTurn === 'x' && <i className="bi bi-x-lg text-danger"></i> }

    </StyledPlayerInfo>);
}

export default PlayerInfo;