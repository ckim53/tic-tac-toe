function createGameBoard() {
    let tie = 0;
    let entries = 0;
    const rows = 3;
    const cols = 3;

    const addEntry = () => entries++;
    const getEntries = () => entries;
    const tieStatus = () => tie;
    const gameOver = () => tie++;

    let array = Array.from({ length: rows }, () => Array(cols).fill(null));

    const reset = function () {
        array = Array.from({ length: rows }, () => Array(cols).fill(null));
    }
    return {array, tieStatus, gameOver, reset, addEntry, getEntries};
};

const createPlayer = function (playerNum, gameBoard) {
    let marker = '';
    let winner = 0;
    playerNum == 1 ? marker = 'x' : marker = 'o';

    const getWinner = () => winner;

    const playTurn = () => {
        //assume in range for now
        let userInput = prompt(`Player ${playerNum}: Pick a spot (0-8).`);
        while (true) {
             
            if (userInput == null) {
                gameBoard.endGame = 1;
                break;
            }
            let row = 0;
            switch (true) {
                case (userInput >= 0 && userInput <= 2):
                    row = 0;
                    break;
                case (userInput >= 3 && userInput <= 5):
                    row = 1;
                    break;
                case (userInput >= 6 && userInput <= 8):
                    row = 2;
                    break;
            }
            if (gameBoard.array[row][userInput % 3] == null) {
                gameBoard.array[row][userInput % 3] = marker;
                gameBoard.addEntry();
                break;
            }
            else {
                userInput = prompt("Invalid. Pick a spot (0-8).");
                continue;
            }
        }
        if (gameBoard.getEntries() == 9) {
            gameBoard.gameOver();
            console.log("It's a tie!");
        }
        checkRows();
        checkColumns();
        checkDiagonals();
        if (winner == 1) {console.log(`Player ${playerNum} wins!`);}
    }

    const checkRows = () => 
    { 
        for (let i=0; i < gameBoard.array.length; i++) {
            let j = 0;
            let marker = gameBoard.array[i][j];
            if (marker == null) {
                continue;
            }
            while (gameBoard.array[i][j] == marker) {
                j++;
            }
            if (j==3) {
                winner = 1;
            }
        }
    }

    const checkColumns = () => 
    { 
        for (let j=0; j < gameBoard.array.length; j++) {
            let i = 0;
            let marker = gameBoard.array[i][j];
            if (marker == null) {
                continue;
            }
            while (gameBoard.array[i][j] == marker) {
                i++;
                if (i==3) {
                    winner = 1;
                    return;
                }
            }
        }
    }

    const checkDiagonals = () => 
    { 
        if ((gameBoard.array[1][1] != null) && ((gameBoard.array[0][0] == gameBoard.array[1][1] && 
            gameBoard.array[1][1] == gameBoard.array[2][2]) ||
            (gameBoard.array[0][2] == gameBoard.array[1][1] && 
            gameBoard.array[1][1] == gameBoard.array[2][0]))) { 
            winner = 1;
        }
    };

    return {playTurn, getWinner};
}

const playGame = function (gameBoard, player1, player2) {
    let firstPlayer = true;
    
    while (gameBoard.tieStatus() == 0 && player1.getWinner() == 0 && player2.getWinner() == 0) {
        firstPlayer ? player1.playTurn() : player2.playTurn();
        firstPlayer = !firstPlayer;
    }
};

const myGameBoard = createGameBoard();
const player1 = createPlayer(1, myGameBoard);
const player2 = createPlayer(2, myGameBoard);
playGame(myGameBoard, player1, player2);