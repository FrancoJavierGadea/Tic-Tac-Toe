import { useEffect, useState } from "react";
import Board from "../Board/Board";

import { checkGame, TURNS } from "../../utils/GameLogic";
import GameoverModal from "../Modals/GameoverModal/GameoverModal";
import GameStatus from "../GameStatus/GameStatus";

function TicTacToe() {

    const [board, setBoard] = useState(new Array(9).fill(null));

    const [turn, setTurn] = useState(TURNS.random());

    const [gameover, setGameover] = useState(false);

    const [winner, setWinner] = useState(null);

    const resetGame = (turn) => {

        setBoard(new Array(9).fill(null));
        setTurn(TURNS.random());
        setGameover(false);
        setWinner(null);
    }

    useEffect(() => {
      
        const gameStatus = checkGame(board);

        setGameover(gameStatus.gameover);
        
        setWinner(gameStatus.winner);
      
    }, [board]);

    useEffect(() => {
      
        if(gameover){

            console.log('Winner: ', winner);
            //resetGame();
        }
     
    }, [gameover]);
    
    

    const handleCellClick = (cell) => {

        if(!board[cell]) {

            setBoard(oldBoard => {
    
                const newBoard = [...oldBoard];
    
                newBoard[cell] = turn;

                return newBoard;
            });
            
            setTurn(oldTurn => TURNS.inverseTurn(oldTurn));
        }
    }

    return (<div>

        <GameoverModal show={gameover} winner={winner} handleClose={() => resetGame()} />

        <GameStatus turn={turn} winner={winner} />

        <Board values={board} cellClick={handleCellClick}/>

    </div>);
}

export default TicTacToe;