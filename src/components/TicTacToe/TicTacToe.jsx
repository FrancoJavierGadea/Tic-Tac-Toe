import { useContext, useEffect, useState } from "react";
import Board from "../Board/Board";

import { checkGame, TURNS } from "../../utils/GameLogic";
import GameoverModal from "../Modals/GameoverModal/GameoverModal";
import GameStatus from "../GameStatus/GameStatus";
import { MultiplayerContext } from "../Multiplayer/MultiplayerProvider";
import { saveGame } from "../../utils/saveGame";

function TicTacToe() {

    const {playerTurn, startGame, listenStartGame, sendGameMove, listenGameMoves,} = useContext(MultiplayerContext);

    const [board, setBoard] = useState(new Array(9).fill(null));

    const [turn, setTurn] = useState(null);

    const [gameover, setGameover] = useState(false);

    const [winner, setWinner] = useState(null);

    const [game, setGame] = useState([]);


    useEffect(() => {
        
        const startGameSub = listenStartGame().subscribe(({data}) => {

            resetGame(data.turn);
        });

        const gameMovesSub = listenGameMoves().subscribe(({data}) => {

            setBoard(data.board);
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
        setGame([]);
    }

    useEffect(() => {
      
        
        if(board.every(value => value === null)) return;
        
        const gameStatus = checkGame(board);
        
        setGameover(gameStatus.gameover);
        
        setWinner(gameStatus.winner);
        
        setTurn(oldTurn => TURNS.inverseTurn(oldTurn));

        setGame(oldGame => [...oldGame, board]);
      
    }, [board]);

    useEffect(() => {
      
        if(gameover){

            saveGame(game);
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