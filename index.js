const Gameboard = (function() {
    const contents = 'contents';

    const initialBoard = [
        "top-left", "top-middle", "top-right",
        "middle-left", "middle-middle", "middle-right",
        "bottom-left", "bottom-middle", "bottom-right"
    ];

    const updatedBoard = [...initialBoard];

    const updateBoard = function(mark, onSquare) {
        console.log(updatedBoard);
        console.log(mark, onSquare);
        updatedBoard.forEach((square, index) => {
            if (square === onSquare) {
                square[index] = onSquare
            };
        });
    };

    return {
    callUpdateBoard: function(mark, onSquare) {
        updateBoard(mark, onSquare);
        console.log(contents);
    }
    };

})();



Gameboard.callUpdateBoard();       // Outputs: 'contents'
console.log(Gameboard.board);  // undefined


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

console.log(player1);



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

    const check = function() {
        console.log(tableSquares);
    }

    return {
    callCheck: function() {
        check();
    }
    };

})();

displayController.callCheck();

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