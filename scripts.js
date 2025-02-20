function createGameBoard(player1, player2) {
    let gameOver = 0;
    let entries = 0;
    const rows = 3;
    const cols = 3;

    const addEntry = () => entries++;
    const getEntries = () => entries;

    let array = Array.from({ length: rows }, () => Array(cols).fill(null));
    
    const grid = document.getElementById('grid');
    const children = grid.querySelectorAll('div');
    const display = document.getElementById('display');
    let player = player1;

    const reset = function () {
        array = Array.from({ length: rows }, () => Array(cols).fill(null));
        gameOver = 0;
        entries = 0;
        player = player1;
        children.forEach((child) => {child.textContent = ''});
        display.textContent = "Player 1 Turn";
    }

    const restart = document.getElementById('restart');
    restart.addEventListener('click', reset);

    children.forEach((child, index) => {
        child.addEventListener('click', function() {
            if (gameOver) {return};
            const marker = player.getMarker();
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
                child.style.color = (player == player1) ? "steelblue" : "white";
                child.textContent = marker;
                checkBoard();
                if(getEntries() == 9 && gameOver == 0) {
                    display.textContent = "It's a TIE!";
                    gameOver = 1;
                    return;
                }
                if (gameOver == 0) {
                    player = (player == player1) ? player2 : player1;
                    display.textContent = `Player ${player.num} turn`;
                }
            }
            else {
                display.textContent = "Invalid spot. Try again.";
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
                gameOver = 1;
                display.textContent = `Player ${player.num} WINS!`;
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
                    gameOver = 1;
                    display.textContent = `Player ${player.num} WINS!`;
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
            gameOver = 1;
            display.textContent = `Player ${player.num} WINS!`;
        }
    };
    
    const checkBoard = () => {
        checkRows();
        checkColumns();
        checkDiagonals();
    }

    return {array, reset, addEntry, getEntries, checkBoard};
}

const createPlayer = function (num) {
    let turn = 0;
    let marker = (num == 1) ? 'X' : 'O';
    
    const getMarker = () => marker;

    return {getMarker, num};
}

const playGame = function (gameBoard, player1, player2) {
    
}

const player1 = createPlayer(1);
const player2 = createPlayer(2);
const myGameBoard = createGameBoard(player1, player2);