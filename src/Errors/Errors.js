
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

