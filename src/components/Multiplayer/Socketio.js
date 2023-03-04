import { Observable, throwError } from "rxjs";
import { io } from "socket.io-client";


const socket = io('https://tic-tac-toe-ntm9.onrender.com/').connect();
//const socket = io('http://localhost:3000').connect();

function listen(event){

    if(!event || event === '') return throwError(() => new Error('invalid event name'));

    return new Observable((subscriber) => {

        const listener = (response) => {

            if(response.ok){

                subscriber.next({data: response.data, message: response.message});
            }
            else {

                subscriber.error({data: response.data, message: response.message});
            }
        }

        socket.on(event, listener);

        return () => {

            socket.off(event, listener);
        }
    });
}

function emit(event, data = {}){

    if(!event || event === '') return throwError(() => new Error('invalid event name'));

    return new Observable((subscriber) => {

        socket.emit(event, data, (response) => {

            if(response.ok){

                subscriber.next({data: response.data, message: response.message});
                subscriber.complete();
            }
            else {
                subscriber.error(new Error(response.message));
            }
        });
    });
}


export {socket, listen, emit};