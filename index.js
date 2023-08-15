const displayController = (function() {

    const tableSquares = document.querySelectorAll(".board div");
    let turnOf = 1;

    function checkTheWinner(currentBoard) {
        let usedAmountOfSquares = 0;
        console.log(currentBoard);
        (currentBoard[0] !== "" && currentBoard[0] === currentBoard[1] && currentBoard[1] === currentBoard[2]) ? console.log("Winner!") : null;
        (currentBoard[3] !== "" && currentBoard[3] === currentBoard[4] && currentBoard[4] === currentBoard[5]) ? console.log("Winner!") : null;
        (currentBoard[6] !== "" && currentBoard[6] === currentBoard[7] && currentBoard[7] === currentBoard[8]) ? console.log("Winner!") : null;
        (currentBoard[0] !== "" && currentBoard[0] === currentBoard[3] && currentBoard[3] === currentBoard[6]) ? console.log("Winner!") : null;
        (currentBoard[1] !== "" && currentBoard[1] === currentBoard[4] && currentBoard[4] === currentBoard[7]) ? console.log("Winner!") : null;
        (currentBoard[2] !== "" && currentBoard[2] === currentBoard[5] && currentBoard[5] === currentBoard[8]) ? console.log("Winner!") : null;
        (currentBoard[0] !== "" && currentBoard[0] === currentBoard[4] && currentBoard[4] === currentBoard[8]) ? console.log("Winner!") : null;
        (currentBoard[2] !== "" && currentBoard[2] === currentBoard[4] && currentBoard[4] === currentBoard[6]) ? console.log("Winner!") : null;

        currentBoard.forEach(square => {
            square !== "" ? usedAmountOfSquares += 1 : null;
        });

        if (usedAmountOfSquares === 9) {
            return console.log("Draw");
        } else {
            usedAmountOfSquares = 0
        };

        // 0 1 2 , 3 4 5 , 6 7 8 , 0 3 6 , 1 4 7 , 2 5 8 , 0 4 8 , 2 4 6
    };

    function updateBoard() {
        tableSquares.forEach((square, index) => {
            square.addEventListener("click", function(el) {
                if (turnOf === 1 && el.target.innerText === "") {
                    player1.putMark(index);
                    turnOf = 2;
                } else if (turnOf === 2 && el.target.innerText === "") {
                    player2.putMark(index);
                    turnOf = 1;
                };
            });
        });
    };

    updateBoard();

    const displayUpdatedBoard = function(newBoard) {
        console.log(newBoard);
        tableSquares.forEach((square, index) => {
            console.log(newBoard[index]);
            square.innerText = newBoard[index];
        });
    };

    return {
    callDisplayUpdatedBoard: function(newBoard) {
        displayUpdatedBoard(newBoard);
    },
    callCheckTheWinner: function(currentBoard) {
        checkTheWinner(currentBoard);
    }
    };

})();

// displayController.callDisplayUpdatedBoard();



const Gameboard = (function() {

    const initialBoard = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    displayController.callDisplayUpdatedBoard(initialBoard);

    const updateBoard = function(mark, squareIndex) {
        console.log(mark, squareIndex);
        initialBoard[squareIndex] = mark;
        displayController.callDisplayUpdatedBoard(initialBoard);
        displayController.callCheckTheWinner(initialBoard);
    };

    return {
    callUpdateBoard: function(mark, squareIndex) {
        updateBoard(mark, squareIndex);
    }
    };

})();

Gameboard.callUpdateBoard();       // Outputs: 'contents'



const playerFactory = (mark) => {
    const putMark = (squareIndex) => {
        Gameboard.callUpdateBoard(mark, squareIndex);
    };
    return { mark, putMark };
};

const player1 = playerFactory('X');
const player2 = playerFactory('O');

player1.putMark();
player2.putMark();





// Modules:
// Gameboard (boardArray)
// 
// displayController (edit boardArray, edit html Page)
//
// Factories:
// players (create 2 players)
//
// 
// board, player 1, player 2
// player 1 set X, player 2 set O
// controll flow: x was set to 1 - change 1 to X. not allowed to re-set already selected squares, check if someone has crossed a full line.
//
//
//
//