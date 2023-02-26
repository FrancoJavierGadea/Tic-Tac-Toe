import { useContext, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { MultiplayerContext } from "../Multiplayer/MultiplayerProvider";
import 'react-toastify/dist/ReactToastify.min.css';

function Notifications() {

    const {errors} = useContext(MultiplayerContext);

    useEffect(() => {

        const err = errors.at(-1);

        if(err){

            toast.error(err.message, {
                autoClose: 2000,
                hideProgressBar: true
            });
        }

    }, [errors])
    

    return (<ToastContainer />);
}

export default Notifications;