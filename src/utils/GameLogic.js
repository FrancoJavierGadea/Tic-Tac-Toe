export const TURNS = {
    
    X: 'x', 

    O: 'o' ,

    random: () => Math.random() > 0.5 ? 'x' : 'o',

    inverseTurn: (turn) => turn === 'x' ? 'o' : 'x'
};
  
export const WINNER_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


export function checkGame(board = []){

    const gameStatus = {
        gameover: false,
        winner: null
    };

    if( !board.includes(null) ) gameStatus.gameover = true;
    
    WINNER_COMBOS.forEach(([x, y, z]) => {

        const value = board[x];

        if(value === null) return;

        if(value === board[y] && value === board[z]){

            gameStatus.gameover = true;

            gameStatus.winner = value;
        }
    });

    return gameStatus;
}