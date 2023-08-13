const displayController = (function() {

    const tableSquares = document.querySelectorAll(".board div");
    let turnOf = 1;

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
    }
    };

})();

// displayController.callDisplayUpdatedBoard();



const Gameboard = (function() {
    // const initialBoard = [
    //     "top-left", "top-middle", "top-right",
    //     "middle-left", "middle-middle", "middle-right",
    //     "bottom-left", "bottom-middle", "bottom-right"
    // ];

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