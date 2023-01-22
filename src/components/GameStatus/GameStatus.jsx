import styled from "styled-components";
import { TURNS } from "../../utils/GameLogic";

const StyledDiv = styled.div`

    width: 450px;
    margin: 20px auto;
    display: flex;
    justify-content: center;

    .brand {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 1;

        background-color: #1E1E31;
        font-size: 26pt;
    }
    .brand[select="true"] {

        background-color: #FDFDFD;
    }

    .counter {
        background-color: #333333;
        min-width: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26pt;
    }

`;

function GameStatus({className, turn = TURNS.O, gamesO = 0, gamesX = 0, winner}) {

    return (<StyledDiv className={className}>

        <div className="counter text-light rounded-start p-1">{gamesX}</div>
        
        <div className="brand border-end border-primary" select={turn === TURNS.X ? 'true' : 'false'}>

            <i className="bi bi-x-lg text-danger"></i>

        </div>

        <div className="brand border-start border-primary" select={turn === TURNS.O ? 'true' : 'false'}>

            <i className="bi bi-circle text-success"></i>

        </div>

        <div className="counter text-light rounded-end p-1">{gamesO}</div>

    </StyledDiv>);
}

export default GameStatus;