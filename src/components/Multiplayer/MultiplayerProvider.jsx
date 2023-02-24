import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { TURNS } from "../../utils/GameLogic";
import { Observable } from "rxjs";
import { ConnectionError, StartGameError } from "../../Errors/Errors";

export const MultiplayerContext = createContext();

const socket = io('http://localhost:3000').connect();

function MultiplayerProvider({children}) {

    const [isConnected, setIsConnected] = useState(socket.connected);

    const [room, setRoom] = useState(null);

    const [userTurn, setUserTurn] = useState(null);

    const [player, setPlayer] = useState(null);

    const [errors, setErrors] = useState([]);

    useEffect(() => {

        socket.on('connect', () => {

            console.log('Conectado');
            setIsConnected(true);
        });
    
        socket.on('disconnect', () => {

            setIsConnected(false);
        });

        socket.on('connect_error', (err) => {

            setErrors(oldErrors => [...oldErrors, new ConnectionError(err.message)]);
        });

        socket.on('joined-game', (response) => {

            if(response.ok){

                setUserTurn(TURNS.inverseTurn(response.data.turn));
                setPlayer('player 2');
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

        setPlayer('player 1');

        socket.emit('create-game', (response) => {

            if(response.ok){

                setRoom(response.data.room);
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
                setUserTurn(turn);
            }
        });  
    };


    const startGame = () => {

        const turn = TURNS.random();

        socket.emit('start-game', {room, turn}, (response) => {

            if(response.ok){

                console.log('start game !', response);
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

        socket.emit('send-game-move', {room, board}, (response) => {

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

        if(room && userTurn && player === 'player 2') startGame();

    }, [room, userTurn, player]);
    

    const data = {
        isConnected,
        room,
        userTurn,
        createGame,
        joinGame,
        startGame,
        listenStartGame,
        sendGameMove,
        listenGameMoves,
        errors
    };

    return (<MultiplayerContext.Provider value={data}>{children}</MultiplayerContext.Provider>);
}

export default MultiplayerProvider;