const displayController = (function() {

    const tableSquares = document.querySelectorAll(".board div");
    let turnOf = 1;

    tableSquares.forEach(square => {
        square.addEventListener("click", function(el) {
            console.log(el.target.className);
            if (turnOf === 1) {
                player1.putMark(el.target.className);
                turnOf = 2;
            } else {
                player2.putMark(el.target.className);
                turnOf = 1;
            };

        });
    })

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
        "X", "O", "X",
        "O", "X", "X",
        "X", "O", "O"
    ];

    displayController.callDisplayUpdatedBoard(initialBoard);

    const updateBoard = function(mark, onSquare) {
        
        console.log(mark, onSquare);
        
        
    };

    return {
    callUpdateBoard: function(mark, onSquare) {
        updateBoard(mark, onSquare);
    }
    };

})();

Gameboard.callUpdateBoard();       // Outputs: 'contents'



const playerFactory = (mark) => {
    const putMark = (onSquare) => {
        Gameboard.callUpdateBoard(mark, onSquare);
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