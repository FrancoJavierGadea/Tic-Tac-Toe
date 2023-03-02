import { createContext, useCallback, useEffect, useMemo, useState } from "react";

import { TURNS } from "../../utils/GameLogic";
import { catchError } from "rxjs";
import { ConnectionError, JoinGameError, StartGameError } from "../../Errors/Errors";
import { toast } from "react-toastify";
import { emit, listen, socket } from "./Socketio";

export const MultiplayerContext = createContext();



function MultiplayerProvider({children}) {

    const [isConnected, setIsConnected] = useState(socket.connected);

    const [room, setRoom] = useState(null);

    const [playerTurn, setPlayerTurn] = useState(null);

    const [player, setPlayer] = useState(null);

    const [playerName, setPlayerName] = useState(null);

    const [errors, setErrors] = useState([]);


    
    useEffect(() => {

        socket.on('connect', () => {

            setIsConnected(true);
        });
    
        socket.on('disconnect', () => {

            setIsConnected(false);
            setRoom(null);
            setPlayer(null);
            setPlayerTurn(null);
            setErrors(oldErrors => [...oldErrors, new ConnectionError('Desconectado')]);
            toast.dismiss();
        });

        socket.on('connect_error', (err) => {

            setErrors(oldErrors => [...oldErrors, new ConnectionError('No se puede conectar con el servidor')]);    
        });

        listen('joined-game').subscribe(({data}) => {

            setPlayerTurn(TURNS.inverseTurn(data.turn)); 
        });
      
        listen('disconnect-player').subscribe(({data, message}) => {

            setErrors(oldErrors => [...oldErrors, new ConnectionError(message)]);
            setPlayerTurn(null);

            if(data.player === 'player 1'){

                //* If player 1 disconnect: player 2 --> player 1
                emit('update-player', {player: 'player 1'}).subscribe(() => {

                    setPlayer('player 1');
                });
            }
        });

        return () => {

            socket.off();
        };

    }, [socket]);
    

    const createGame = (name) => {

        emit('create-game', {name}).subscribe(({data}) => {

            setRoom(data.room);
            setPlayer('player 1');
            setPlayerName(name);
        });
    };
    
    const joinGame = (room, name) => {

        const turn = TURNS.random();

        emit('join-game', {room, turn, name}).subscribe({

            next: () => {
                
                setRoom(room);
                setPlayerTurn(turn);
                setPlayer('player 2');
                setPlayerName(name);
            },

            error: (err) => {

                setErrors(oldErrors => [...oldErrors, new JoinGameError(err.message)]);
            }
        });   
    };

    const leaveGame = () => {

        emit('leave-game').subscribe((value) => {

            setRoom(null);
            setPlayerTurn(null);
            setPlayer(null);
            toast.dismiss();
        });
    }


    const startGame = (options = {}) => {

        const turn = TURNS.random();

        const {firstGame} = options;

        emit('start-game', {turn, firstGame}).subscribe({
            next: () => {

                //console.log('start game !');
            },
            error: (err) => {

                setErrors(oldErrors => [...oldErrors, new StartGameError(err.message)]);
            }
        });
    }

    const listenStartGame = () => {

        return listen('starting-game').pipe(catchError(({message}) => {

            setErrors(oldErrors => [...oldErrors, new StartGameError(message)]);
        }));
    }

    const sendGameMove = (board) => {

        emit('send-game-move', {board}).subscribe(() => {

            //console.log('Movimiento enviado');
        });
    }

    const sendChatMessage = (message) => {

        emit('send-message', {message, name: playerName, player}).subscribe({

            next: ({message}) => {

                //console.log(message);
            } 
        });
    }

    const listenGameMoves = () => {
 
        return listen('receive-game-move');
    }

    const listenJoinedGame = () => {

        return listen('joined-game');
    }

    const listenDisconectPlayer = () => {

        return listen('disconnect-player');
    }

    const listenChatMessages = () => {

        return listen('receive-message');
    }

    //* Automatic start game
    useEffect(() => {

        if(room && playerTurn && player === 'player 1') startGame({firstGame: true});

    }, [room, playerTurn, player]);
    

    const data = {
        playerName,
        isConnected,
        room,
        playerTurn,
        player,
        createGame,
        joinGame,
        startGame,
        listenStartGame,
        sendGameMove,
        listenGameMoves,
        listenJoinedGame,
        listenDisconectPlayer,
        leaveGame,
        sendChatMessage,
        listenChatMessages,
        errors
    };

    return (<MultiplayerContext.Provider value={data}>{children}</MultiplayerContext.Provider>);
}

export default MultiplayerProvider;