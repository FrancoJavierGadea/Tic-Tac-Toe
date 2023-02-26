import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { TURNS } from "../../utils/GameLogic";
import { Observable } from "rxjs";
import { ConnectionError, JoinGameError, StartGameError } from "../../Errors/Errors";
import { toast } from "react-toastify";

export const MultiplayerContext = createContext();

const socket = io('http://localhost:3000').connect();

function MultiplayerProvider({children}) {

    const [isConnected, setIsConnected] = useState(socket.connected);

    const [room, setRoom] = useState(null);

    const [playerTurn, setPlayerTurn] = useState(null);

    const [player, setPlayer] = useState(null);

    const [errors, setErrors] = useState([]);

    const waitingPlayerNotification = () => {

        toast.promise(new Promise((resolve, reject) => {

            socket.on('joined-game', (response) => {

                if(response.ok) resolve(); else reject();
            });

        }), { 
            pending: 'Esperando juagador...',
            success: 'Juagador conectado',
            reject: 'Error al conectar'
        }, { 
            autoClose: 2000,
            hideProgressBar: true
        });
    }

    useEffect(() => {

        socket.on('connect', () => {

            console.log('Conectado');
            setIsConnected(true);
        });
    
        socket.on('disconnect', () => {

            setIsConnected(false);
            setErrors(oldErrors => [...oldErrors, new ConnectionError('Desconectado')]);
        });

        socket.on('connect_error', (err) => {

            setErrors(oldErrors => [...oldErrors, new ConnectionError('No se puede conectar con el servidor')]);    
        });

        socket.on('joined-game', (response) => {

            if(response.ok){

                setPlayerTurn(TURNS.inverseTurn(response.data.turn)); 
            }
        });

        socket.on('disconnect-player', (response) => {

            waitingPlayerNotification();

            setErrors(oldErrors => [...oldErrors, new ConnectionError(response.message)]);

            setPlayerTurn(null);
            
            if(response.data.player === 'player 1'){

                //* If player 1 disconnect: player 2 --> player 1
                socket.emit('update-player', {player: 'player 1'}, (response) => {

                    if(response.ok){

                        setPlayer('player 1');
                    }
                });
            }
        });
    
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('connect_error');
            socket.off('joined-game');
        };

    }, [socket]);
    

    const createGame = () => {

        waitingPlayerNotification();

        socket.emit('create-game', (response) => {

            if(response.ok){

                setRoom(response.data.room);
                setPlayer('player 1');
            }
            else {

                setErrors(oldErrors => [...oldErrors, new StartGameError(response.message)]);
            }
        });

    };
    
    const joinGame = (room) => {

        const turn = TURNS.random();

        socket.emit('join-game', {room, turn}, (response) => {

            if(response.ok){

                console.log(response);

                setRoom(room);
                setPlayerTurn(turn);
                setPlayer('player 2');
            }
            else {
                setErrors(oldErrors => [...oldErrors, new JoinGameError(response.message)]);
            }
        });  
    };

    const leaveGame = () => {

        socket.emit('leave-game', (response) => {

            if(response.ok){

                setRoom(null);
                setPlayerTurn(null);
                setPlayer(null);
                toast.dismiss();
            }
        });
    }


    const startGame = (options = {}) => {

        const turn = TURNS.random();

        const {firstGame} = options;

        socket.emit('start-game', {turn, firstGame}, (response) => {

            if(response.ok){

                console.log('start game !', response);
            }
            else {

                setErrors(oldErrors => [...oldErrors, new StartGameError(response.message)]);
            }
        });
    }

    const listenStartGame = () => {

        return new Observable((subscriber) => {

            const listener = (response) => {

                if(response.ok){

                    subscriber.next(response.data);
                }
                else {

                    setErrors(oldErrors => [...oldErrors, new StartGameError(response.message)]);
                }
            }

            socket.on('starting-game', listener);

            return () => {

                socket.off('starting-game', listener);
            }
        });
    }

    const sendGameMove = (board) => {

        socket.emit('send-game-move', {board}, (response) => {

            console.log(response);
        });
    }

    const listenGameMoves = () => {
 
        return new Observable((subcriber) => {
            
            const listener = (response) => {
    
                if(response.ok){
    
                    subcriber.next(response.data);
                }
                else {
    
                    subcriber.error(new Error(response.message));
                }
            }

            socket.on('receive-game-move', listener);

            return () => {

                socket.off('receive-game-move', listener);
            }
        });

    }

    //* Automatic start game
    useEffect(() => {

        if(room && playerTurn && player === 'player 1') startGame({firstGame: true});

    }, [room, playerTurn, player]);
    

    const data = {
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
        leaveGame,
        errors
    };

    return (<MultiplayerContext.Provider value={data}>{children}</MultiplayerContext.Provider>);
}

export default MultiplayerProvider;