import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { checkGame, TURNS } from "../../utils/GameLogic";
import Cell from "../Cell/Cell";
import GameoverModal from "../GameoverModal/GameoverModal";
import GameStatus from "../GameStatus/GameStatus";


const StyledBoard = styled.div`

    padding: 10px;

    display: grid;
    grid-template-rows: repeat(3, 100px);
    grid-template-columns: repeat(3, 100px);

    justify-content: center;
    align-content: center;
`;

function TicTacToe({}) {

    const [winnerCount, setwinnerCount] = useState({X: 0, O: 0});

    const [board, setBoard] = useState(new Array(9).fill(null));

    const [turn, setTurn] = useState(TURNS.X);

    const [gameover, setGameover] = useState(false);

    const [winner, setWinner] = useState(null);

    const resetGame = () => {

        setWinner(null);
        setBoard(new Array(9).fill(null));
        setGameover(false);
        setTurn(oldTurn => oldTurn === TURNS.X ? TURNS.O : TURNS.X);
    }

    useEffect(() => {
    
        const gameStatus = checkGame(board);

        setGameover(gameStatus.gameover);

        setWinner(gameStatus.winner);
         
    }, [board]);


    useEffect(() => {
        
        if(gameover){

            setTimeout(resetGame, 2000);
        }

    }, [gameover]);


    useEffect(() => {

        if(winner){

            setwinnerCount(oldcount => {

                const newcount = {...oldcount};

                if(winner === TURNS.X){

                    newcount.X += 1;
                }
                else {
                    newcount.O += 1;
                }

                return newcount;
            });
        }
        
    }, [winner]);


    const cellClick = (cell) => {

        if(!board[cell] && !gameover) {

            setBoard(oldBoard => {
    
                const newBoard = [...oldBoard];
    
                newBoard[cell] = turn;
                
                return newBoard;
            });

            setTurn(oldTurn => oldTurn === TURNS.X ? TURNS.O : TURNS.X);
        }

    }

    return (<div>

        <GameStatus turn={turn} gamesO={winnerCount.O} gamesX={winnerCount.X}></GameStatus>

        <StyledBoard>

            {
                board?.map((value, index) => {

                    return <Cell value={value} index={index} key={'cell-'+index} onClick={cellClick}/>
                })
            }

        </StyledBoard>

        <GameoverModal show={gameover} winner={winner} />
    </div>);
}

export default TicTacToe;