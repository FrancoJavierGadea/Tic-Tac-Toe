import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { TURNS } from "../../utils/GameLogic";
import confetti from "canvas-confetti";
import { MultiplayerContext } from "../Multiplayer/MultiplayerProvider";

const StyledDiv = styled.div`

    width: 450px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 5000;

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

function GameStatus({className, turn = TURNS.O, winner}) {

    const { listenStartGame } = useContext(MultiplayerContext);

    const [gamesX, setGamesX] = useState(0);

    const [gamesO, setGamesO] = useState(0);

    useEffect(() => {

        if(winner){

            if(winner === TURNS.X) setGamesX(old => ++old);

            if(winner === TURNS.O) setGamesO(old => ++old);

            confetti({zIndex: 2000});
        }

    }, [winner]);

    useEffect(() => {
        
        const startGameSub = listenStartGame().subscribe(({data}) => {

            if(data.firstGame){
                setGamesX(0);
                setGamesO(0);
            }
        });

        return () => {
            startGameSub.unsubscribe();
        };

    }, []);

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