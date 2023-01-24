import { createContext, useCallback, useContext, useEffect, useState } from "react";
import io from "socket.io-client";


export const MultiplayerContext = createContext();

const socket = io('http://192.168.100.188:3000/').connect();

// 


// const sendMessage = (message) => {

//     
// }

// const createGame = () => {

//     
// }

// const joinGame = () => {

//     
// }


// 

// 


function MultiplayerProvider({children}) {

    const [isConnected, setIsConnected] = useState(socket.connected);

    const [userName, setuserName] = useState(null);

    const [room, setRoom] = useState(null);

    const [gameErrors, setGameErrors] = useState(null);

    const [waitingPlayer, setwaitingPlayer] = useState(false);

    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {

        socket.on('connect', (err) => {

            setIsConnected(true);
            console.log('Connect to server !');
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });


        socket.on('joined-game', (response) => {

            if(response.ok){

                setwaitingPlayer(false);
            }
        });

        socket.on('receive-message', (response) => {

            console.log(response);

            if(response.ok){

                setChatMessages(oldMessages => ([...oldMessages, response.data]))
            }
        });

        socket.on('leaved-game', (response) => {

            if(response.ok){

                setwaitingPlayer(true);
            }
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('joined-game');
            socket.off('receive-message');
            socket.off('leaved-game');
        }

    }, [socket]);


    const createGame = useCallback((name) => {

        socket.emit('create-game', (response) => {

            if(response.ok){

                console.log(response);

                setuserName(name);

                setRoom(response.data.room);

                setwaitingPlayer(true);
            }
        });

    }, []);


    const joinToGame = useCallback((name, room) => {

        socket.emit('join-game', {room}, (response) => {

            if(response.ok){

                setuserName(name);
                setRoom(room);
            }
            else {

                setGameErrors(new Error(response.message));
            }
        });
    }, []);

    const leaveGame = useCallback((room) => {

        socket.emit('leave-game', {room}, (response) => {

            if(response.ok){

                setRoom(null);
                setChatMessages([]);
                setwaitingPlayer(false);
            }
        });   
    }, [])


    const sendMessage = useCallback((room, message) => {

        socket.emit('send-message', {room, message}, (response) => {

            console.log(response);

            if(response.ok){

                setChatMessages(oldMessages => ([...oldMessages, message]));
            }
        });
    }, [])

    const data = {
        gameErrors,
        setGameErrors,
        waitingPlayer,
        sendMessage,
        createGame,
        joinToGame,
        userName,
        leaveGame,
        room,
        isConnected,
        chatMessages
    };

    return (<MultiplayerContext.Provider value={data}>{children}</MultiplayerContext.Provider>);
}

export default MultiplayerProvider;