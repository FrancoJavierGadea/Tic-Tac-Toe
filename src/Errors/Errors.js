
export class ConnectionError extends Error {

    constructor(message){
        super(message);
        this.name = "ConnectionError";
    }
}


export class StartGameError extends Error {

    constructor(message){
        super(message);
        this.name = "StartGameError";
    }
}


export class JoinGameError extends Error {

    constructor(message){
        super(message);
        this.name = "JoinGameError";
    }
}

