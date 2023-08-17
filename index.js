const playerFactory = (userName, mark, isAi) => {
    const putMark = (squareIndex) => {
        Gameboard.callUpdateBoard(mark, squareIndex);
    };
    return { userName, mark, isAi, putMark };
};

const player1 = playerFactory("Rocky", "X", false);
const player2 = playerFactory("Milky Way", "O", false);

const displayController = (function() {

    const tableSquares = document.querySelectorAll(".board div");
    const announceResultElement = document.getElementById("announceResult");
    let turnOf = 1;
    let isEndGame = false;

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
        const userOAiCheckmark = document.getElementById("isOAi");
        const aiIcon = document.querySelector(".ai-icon");
        const oIcon = document.querySelector(".o-icon");

        userOAiCheckmark.addEventListener("change", function(e) {
            player2.isAi = e.target.checked;
            e.target.checked === true ? aiIcon.style.display = "unset" : aiIcon.style.display = "none";
            e.target.checked === true ? oIcon.style.display = "none" : oIcon.style.display = "unset";
        });
    };

    setAi();

    function aiTurn(player) {
        if (isEndGame) {
            return null;
        };

        let randomIndex = Math.floor(Math.random() * 9);
        let usedSquares = 0;

        tableSquares.forEach(square => {
            square.innerText !== "" ? usedSquares += 1 : null;
        });

        if (usedSquares == 9) {
            return null;
        };

        while (tableSquares[randomIndex].innerText !== "") {
            randomIndex = Math.floor(Math.random() * 9);
        };

        player.putMark(randomIndex);

        turnOf = 1;
    };

    function restartGame() {
        const restartBtn = document.getElementById("restartBtn");
        const announceContainer = document.querySelector(".announce-container");

        restartBtn.addEventListener("click", function() {
            tableSquares.forEach((square, index) => {
                Gameboard.callUpdateBoard("", index);
            });

            turnOf = 1;
            isEndGame = false;
            announceResultElement.innerText = "";
            announceContainer.style.display = "none";
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
        const announceContainer = document.querySelector(".announce-container");
        announceContainer.style.display = "unset";
        isEndGame = true;

        result === "draw" ? announceResultElement.innerText = `It's a draw!` :
        result === "X" ? announceResultElement.innerText = `${player1.userName } has won!` :
        result === "O" ? announceResultElement.innerText = `${player2.userName } has won!` : null;
    };

    function updateBoard() {
        tableSquares.forEach((square, index) => {
            square.addEventListener("click", function(el) {
                if (isEndGame) {
                    return null;
                };

                if (turnOf === 1 && el.target.innerText === "") {
                    player1.putMark(index);
                    turnOf = 2;
                    if (player2.isAi) {
                        return aiTurn(player2);
                    };
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