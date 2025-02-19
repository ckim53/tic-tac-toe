function createGameBoard(player1, player2) {
    let tie = 0;
    let entries = 0;
    const rows = 3;
    const cols = 3;

    const addEntry = () => entries++;
    const getEntries = () => entries;
    const tieStatus = () => tie;
    const gameOver = () => tie++;

    const array = Array.from({ length: rows }, () => Array(cols).fill(null));

    const reset = function () {
        array = Array.from({ length: rows }, () => Array(cols).fill(null));
    }

    player1.setTurn();
    
    const grid = document.getElementById('grid');
    const children = grid.querySelectorAll('div');
    let player = player1;

    children.forEach((child, index) => {
        child.addEventListener('click', function() {
            player = (player1.getTurn() == 1) ? player1 : player2;
            const marker = player.getMarker();
            console.log(`player ${player.num} turn`);
            let row = 0;
            switch (true) {
                case (index >= 0 && index <= 2):
                    row = 0;
                    break;
                case (index >= 3 && index <= 5):
                    row = 1;
                    break;
                case (index >= 6 && index <= 8):
                    row = 2;
                    break;
            }
            if (array[row][index % 3] == null) {
                console.log(array);
                array[row][index % 3] = marker;
                addEntry();
                console.log("valid spot.");
                child.textContent = marker;
                checkBoard();
                player1.setTurn();
                player2.setTurn();
            }
            else {
                console.log("invalid spot. try again.");
            }
        });
    });

    const checkRows = () => 
    { 
        for (let i=0; i < array.length; i++) {
            let j = 0;
            let current = array[i][j];
            if (current == null) {
                continue;
            }
            while (array[i][j] == current) {
                j++;
            }
            if (j==3) {
                player.setWinner();
                console.log(`Player ${player.num} wins!`);
            }
        }
    }

    const checkColumns = () => 
    { 
        for (let j=0; j < array.length; j++) {
            let i = 0;
            let current = array[i][j];
            if (current == null) {
                continue;
            }
            while (array[i][j] == current) {
                i++;
                if (i==3) {
                    player.setWinner();
                    console.log(`Player ${player.num} wins!`);
                    return;
                }
            }
        }
    }

    const checkDiagonals = () => 
    { 
        if ((array[1][1] != null) && ((array[0][0] == array[1][1] && 
            array[1][1] == array[2][2]) ||
            (array[0][2] == array[1][1] && 
            array[1][1] == array[2][0]))) { 
            player.setWinner();
            console.log(`Player ${player.num} wins!`);
        }
    };
    
    const checkBoard = () => {
        checkRows();
        checkColumns();
        checkDiagonals();
    }

    return {array, tieStatus, gameOver, reset, addEntry, getEntries, checkBoard};
}

const createPlayer = function (num) {
    let winner = 0;
    let turn = 0;
    let marker = (num == 1) ? 'X' : 'O';
    
    const getMarker = () => marker;
    const getWinner = () => winner;
    const setWinner = () => winner = 1;
    const getTurn = () => turn;
    const setTurn = () => turn = 1 - turn;

    return {getMarker, num, getWinner, setWinner, setTurn, getTurn};
}

const playGame = function (gameBoard, player1, player2) {
    while ((gameBoard.tieStatus() == 0) && (player1.getWinner == 0) && (player2.getWinner == 0));
    console.log("game ended.");
}

const player1 = createPlayer(1);
const player2 = createPlayer(2);
const myGameBoard = createGameBoard(player1, player2);
playGame(myGameBoard, player1, player2);