const displayController = (function() {

    const tableSquares = document.querySelectorAll(".board div");
    const announceResultElement = document.getElementById("announceResult");
    let turnOf = 1;

    function setUserName() {
        const userName1 = document.getElementById("userName1");
        const userName2 = document.getElementById("userName2");

        userName1.addEventListener("input", function() {
            player1.userName = userName1.value;
        });

        userName2.addEventListener("input", function() {
            player2.userName = userName2.value;
        });
    };

    setUserName();

    function setAi() {
        const userXAi = document.getElementById("isXAi");
        const userOAi = document.getElementById("isOAi");

        userXAi.addEventListener("change", function(e) {
            player1.isAi = e.target.checked;
        });

        userOAi.addEventListener("change", function(e) {
            player2.isAi = e.target.checked;
        });
    };

    setAi();

    function restartGame() {
        const restartBtn = document.getElementById("restartBtn");

        restartBtn.addEventListener("click", function() {
            tableSquares.forEach((square, index) => {
                Gameboard.callUpdateBoard("", index);
            });

            turnOf = 1;
            announceResultElement.innerText = "";
        });
    };

    restartGame();

    function checkTheWinner(currentBoard) {
        let usedAmountOfSquares = 0;
        (currentBoard[0] !== "" && currentBoard[0] === currentBoard[1] && currentBoard[1] === currentBoard[2]) ? announceTheResult(currentBoard[0]) : 
        (currentBoard[3] !== "" && currentBoard[3] === currentBoard[4] && currentBoard[4] === currentBoard[5]) ? announceTheResult(currentBoard[3]) : 
        (currentBoard[6] !== "" && currentBoard[6] === currentBoard[7] && currentBoard[7] === currentBoard[8]) ? announceTheResult(currentBoard[6]) : 
        (currentBoard[0] !== "" && currentBoard[0] === currentBoard[3] && currentBoard[3] === currentBoard[6]) ? announceTheResult(currentBoard[0]) : 
        (currentBoard[1] !== "" && currentBoard[1] === currentBoard[4] && currentBoard[4] === currentBoard[7]) ? announceTheResult(currentBoard[1]) : 
        (currentBoard[2] !== "" && currentBoard[2] === currentBoard[5] && currentBoard[5] === currentBoard[8]) ? announceTheResult(currentBoard[2]) : 
        (currentBoard[0] !== "" && currentBoard[0] === currentBoard[4] && currentBoard[4] === currentBoard[8]) ? announceTheResult(currentBoard[0]) : 
        (currentBoard[2] !== "" && currentBoard[2] === currentBoard[4] && currentBoard[4] === currentBoard[6]) ? announceTheResult(currentBoard[2]) : null;

        currentBoard.forEach(square => {
            square !== "" ? usedAmountOfSquares += 1 : null;
        });

        if (usedAmountOfSquares === 9) {
            return announceTheResult("draw");
        } else {
            usedAmountOfSquares = 0
        };

        // 0 1 2 , 3 4 5 , 6 7 8 , 0 3 6 , 1 4 7 , 2 5 8 , 0 4 8 , 2 4 6
    };

    function announceTheResult(result) {
        result === "draw" ? announceResultElement.innerText = `It's a draw!` :
        result === "X" ? announceResultElement.innerText = `${player1.userName } has won!` :
        result === "O" ? announceResultElement.innerText = `${player2.userName } has won!` : null;
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
        tableSquares.forEach((square, index) => {
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



const playerFactory = (userName, mark, isAi) => {
    console.log(userName, mark, isAi);
    const putMark = (squareIndex) => {
        Gameboard.callUpdateBoard(mark, squareIndex);
    };
    return { userName, mark, isAi, putMark };
};

const player1 = playerFactory("Rocky", "X", false);
const player2 = playerFactory("Milky Way", "O", false);






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