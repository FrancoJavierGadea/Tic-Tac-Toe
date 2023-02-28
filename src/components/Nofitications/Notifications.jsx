import { useContext, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { MultiplayerContext } from "../Multiplayer/MultiplayerProvider";
import 'react-toastify/dist/ReactToastify.min.css';
import { firstValueFrom } from "rxjs";

function Notifications() {

    const {errors, listenJoinedGame, listenDisconectPlayer, room, player} = useContext(MultiplayerContext);

    useEffect(() => {

        const err = errors.at(-1);

        if(err){

            toast.error(err.message, {
                autoClose: 2000,
                hideProgressBar: true
            });
        }

    }, [errors])
    
    
    const waitingPlayerNotification = () => {
        
        const obs$ = listenJoinedGame();
        
        //? Hide when player 2 join to game succefully
        toast.promise(firstValueFrom(obs$), { 

            pending: 'Esperando juagador...',

            success: 'Juagador conectado',

            reject: 'Error al conectar'

        }, { 
            autoClose: 2000,

            hideProgressBar: true
        });
    }

    //? shoot when createGame() completes succefully
    useEffect(() => {

        if(room && player === 'player 1') waitingPlayerNotification();

    }, [room, player]);

    //? shoot when player 2 disconnect
    useEffect(() => {
      
        const sub = listenDisconectPlayer().subscribe({

            error: () => waitingPlayerNotification()
        });

        return () => sub.unsubscribe();
        
    }, []);
    
    

    return (<ToastContainer />);
}

export default Notifications;