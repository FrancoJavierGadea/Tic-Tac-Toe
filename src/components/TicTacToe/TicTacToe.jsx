import { useContext, useEffect, useState } from "react";
import Board from "../Board/Board";

import { checkGame, TURNS } from "../../utils/GameLogic";
import GameoverModal from "../Modals/GameoverModal/GameoverModal";
import GameStatus from "../GameStatus/GameStatus";
import { MultiplayerContext } from "../Multiplayer/MultiplayerProvider";

function TicTacToe() {

    const {playerTurn, startGame, listenStartGame, sendGameMove, listenGameMoves,} = useContext(MultiplayerContext);

    const [board, setBoard] = useState(new Array(9).fill(null));

    const [turn, setTurn] = useState(null);

    const [gameover, setGameover] = useState(false);

    const [winner, setWinner] = useState(null);


    useEffect(() => {
        
        const startGameSub = listenStartGame().subscribe((value) => {

            console.log(value.turn)

            resetGame(value.turn);
        });

        const gameMovesSub = listenGameMoves().subscribe((value) => {

            console.log('Movimiento recivido: ', value);
            setBoard(value.board);
        });

        return () => {
            startGameSub.unsubscribe();
            gameMovesSub.unsubscribe();
        };

    }, []);

    const resetGame = (turn) => {

        setBoard(new Array(9).fill(null));
        setTurn(turn);
        setGameover(false);
        setWinner(null);
    }

    useEffect(() => {
      
        
        if(board.every(value => value === null)) return;
        
        const gameStatus = checkGame(board);
        
        setGameover(gameStatus.gameover);
        
        setWinner(gameStatus.winner);
        
        setTurn(oldTurn => TURNS.inverseTurn(oldTurn));
      
    }, [board]);

    useEffect(() => {
      
        if(gameover){

            console.log('Winner: ', winner);
        }
     
    }, [gameover]);
    
    

    const handleCellClick = (cell) => {

        if(!board[cell]) {

            setBoard(oldBoard => {
    
                const newBoard = [...oldBoard];
    
                newBoard[cell] = turn;

                sendGameMove(newBoard);

                return newBoard;
            });
        }
    }

    return (<div>

        <GameoverModal show={gameover} winner={winner} handleClose={() => startGame()} />

        <GameStatus turn={turn} winner={winner} />

        <Board values={board} cellClick={handleCellClick} disabled={!turn || !playerTurn || turn !== playerTurn}/>

    </div>);
}

export default TicTacToe;