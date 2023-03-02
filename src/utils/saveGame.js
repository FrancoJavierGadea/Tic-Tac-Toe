

function saveGame(game = []){

    localStorage.setItem('lastGame', JSON.stringify(game));
}

function getGame(){

    const game = localStorage.getItem('lastGame');

    if(game){

        return JSON.parse(game);
    }
    else {

        return null;
    }
}


export {saveGame, getGame}



