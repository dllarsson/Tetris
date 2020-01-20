

var x = 4;
var y = 0;
var atBottom = false;
var tick = 0;
var points = 0;
var playerName = "";
var setUsernameBeforeStartingGame = false;
var highScore;
var nextSymbols = [];
var savedSymbol = [];
var colors = ["blue", "#03f8fc", "green", "orange", "#b503fc", "red", "yellow"];
var gameplayLoopID;
const gameBoardCanvas = document.getElementById("game");
const gameBoardContext = gameBoardCanvas.getContext("2d");
const pieceOneCanvas = document.getElementById("nextSymbolOne");
const pieceOneContext = pieceOneCanvas.getContext("2d");
const pieceTwoCanvas = document.getElementById("nextSymbolTwo");
const pieceTwoContext = pieceTwoCanvas.getContext("2d");
const savedSymbolCanvas = document.getElementById("savedSymbol");
const savedSymbolContext = savedSymbolCanvas.getContext("2d");
var hasCollided = false;

$(document).ready(function () {
    var rulesText = document.getElementById("rules");
    rulesText.style.display = "none";
    window.addEventListener("keydown", keyPressed, false);
    $("#rules").css("display", "none");
    $("#leftArrow").on("touchstart click", leftMove);
    $("#rightArrow").on("touchstart click", rightMove);
    $("#downArrow").on("touchstart click", downMove);
    $("#rotationArrow").on("touchstart click", rotate);
    $("#playButton").on("touchstart click", play);
    $("#resetButton").on("touchstart click", resetGame);
    $("#navbtn").on("touchstart click", loadRules);
    $("#changeUsernameBtn").on("touchstart click", showUserNameModal);
    $("#handeUsernameButton").on("touchstart click", handleUsernameFromInput);
    makeGameBoard();
    printHighScore();
});

//Menu effect
function barFunction() {
    var navForRules = document.getElementById("nav");
    if (navForRules.style.display === "block") {
        navForRules.style.display = "none";
    } else {
        navForRules.style.display = "block";
    }
}

/*Hide and show the rules on the front page through the button*/
function loadRules() {
    var rulesText = document.getElementById("rules");
    if (rulesText.style.display === "none") {
        rulesText.style.display = "block";
    } else {
        rulesText.style.display = "none";
    }
}

/*Load the rules from a textfile to the webpage*/
var txtFile = new XMLHttpRequest();
var allText = "file not found";
txtFile.onreadystatechange = function () {
    if (txtFile.readyState === XMLHttpRequest.DONE && txtFile.status == 200) {
        allText = txtFile.responseText;
        allText = allText.split("\n").join("<br>"); /*To present the text the way it's writen in the textdocument*/
    }

    document.getElementById('rules').innerHTML = allText;
}
txtFile.open("GET", 'rules.txt', true);
txtFile.send(null);



/*Load the rules from a textfile to the webpage*/
var txtFile = new XMLHttpRequest();
var allText = "file not found";
txtFile.onreadystatechange = function () {
    if (txtFile.readyState === XMLHttpRequest.DONE && txtFile.status == 200) {
        allText = txtFile.responseText;
        allText = allText.split("\n").join("<br>");
    }

    document.getElementById('rules').innerHTML = allText;
}
txtFile.open("GET", 'rules.txt', true);
txtFile.send(null);


//gets the username from the input field in the username modal
function handleUsernameFromInput() {
    playerName = $("#usernameInput").val();
    if (playerName.length >= 3 && playerName.length <= 20) {
        $("#usernameContainer").css("display", "none");
        $("#usernameText").text("Your username is: " + playerName);
        $("#usernameInput").val("");
        $("#changeUsernameBtn").html("Change username");
        if (setUsernameBeforeStartingGame) {
            play();
        }
    }

    else {
        $("#invalidUsername").css("display", "block");
        $("#invalidUsername").fadeOut(3000, function () {
            $("#invalidUsername").css('display', "none");
        });
    }
}

//displays the modal where you enter your username
function showUserNameModal() {
    $("#usernameContainer").css("display", "block");
}



function makePiece(type) {
    if (type === "t") {
        return [
            [0, 0, 0],
            [5, 5, 5],
            [0, 5, 0]
        ];
    }
    else if (type === "t1") {
        return [
            [0, 5, 0],
            [5, 5, 0],
            [0, 5, 0]
        ];
    }
    else if (type === "t2") {
        return [
            [0, 5, 0],
            [5, 5, 5],
            [0, 0, 0]
        ];
    }
    else if (type === "t3") {
        return [
            [5, 0, 0],
            [5, 5, 0],
            [5, 0, 0]
        ];
    }
    else if (type === "o") {
        return [
            [7, 7],
            [7, 7]
        ];
    }
    else if (type === "l") {
        return [
            [4, 0, 0],
            [4, 0, 0],
            [4, 4, 0]
        ];
    }
    else if (type === "l1") {
        return [
            [0, 0, 0],
            [4, 4, 4],
            [4, 0, 0]
        ];
    }
    else if (type === "l2") {
        return [
            [4, 4, 0],
            [0, 4, 0],
            [0, 4, 0]
        ];
    }
    else if (type === "l3") {
        return [
            [0, 0, 4],
            [4, 4, 4],
            [0, 0, 0]
        ];
    }
    else if (type === "j") {
        return [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
        ];
    }
    else if (type === "j1") {
        return [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ];
    }
    else if (type === "j2") {
        return [
            [1, 1, 0],
            [1, 0, 0],
            [1, 0, 0]
        ];
    }
    else if (type === "j3") {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 0, 1]
        ];
    }
    else if (type === "i") {
        return [
            [2, 0, 0, 0],
            [2, 0, 0, 0],
            [2, 0, 0, 0],
            [2, 0, 0, 0]
        ];
    }
    else if (type === "i1") {
        return [
            [0, 0, 0, 0],
            [2, 2, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
    }
    else if (type === "s") {
        return [
            [0, 3, 3],
            [3, 3, 0],
            [0, 0, 0]
        ];
    }
    else if (type === "s1") {
        return [
            [3, 0, 0],
            [3, 3, 0],
            [0, 3, 0]
        ];
    }
    else if (type === "z") {
        return [
            [6, 6, 0],
            [0, 6, 6],
            [0, 0, 0]
        ];
    }
    else if (type === "z1") {
        return [
            [0, 6, 0],
            [6, 6, 0],
            [6, 0, 0]
        ];
    }
};

var board = [];
var firstBlock = true;
/* Sets the game board state when a piece has stopped moving (?) */
function makeGameBoard() {
    var gameBoard = [];

    for (let i = 0; i < 10; i++) {
        var tempArr = [];
        for (let j = 0; j < 20; j++) {

            tempArr[j] = 0;
            if (board.length != 0) {
                if (board[i][j] > 10) {
                    tempArr[j] = board[i][j];
                }

            }

        }
        gameBoard.push(tempArr);
    }
    if (firstBlock == true) {
        //vad är collisionBoard?
        collisionBoard = gameBoard;
        firstBlock = false;
    }
    board = gameBoard;
}


//randomizes a symbol (used in generateNextThreeSymbols())
function randomizeSymbol() {
    var symbols = ["t", "o", "l", "j", "s", "z", "i"];
    return symbols[Math.floor(Math.random() * 7)]
}

//generates an array of three unique symbols, the current one being played and the next two that will be played
function generateNextThreeSymbols() {
    while (nextSymbols.length < 3) {
        var nextSymbolToCheck = randomizeSymbol();
        if (!nextSymbols.includes(nextSymbolToCheck)) {
            nextSymbols.push(nextSymbolToCheck);
        }
    }
}

function getSymbolXY(symbol) {     //returns an array of the first and last position x-wise and y-wise in the tetramino building block square.
    var isValue = false;
    var xx = 0;
    var yy = 0;
    var xl = 0;
    var yl = 0;
    for (let j = 0; j < symbol.length; j++) {
        for (let i = 0; i < symbol.length; i++) {
            var tempSymbol = symbol[i];
            if (tempSymbol[j] != 0) {
                xx = j;                 //saves where in the tetramino square the first block appears x-wise.
                isValue = true;
                break;
            }

        }
        if (isValue) break;
    }
    isValue = false;

    for (var i = 0; i < symbol.length; i++) {
        var tempSymbol = symbol[i];
        for (var j = 0; j < symbol.length; j++) {
            if (tempSymbol[j] != 0) {
                yy = i;                 //saves where in the tetramino square the first block appears y-wise.
                isValue = true;
                break;
            }
        }
        if (isValue) break;
    }
    isValue = false;

    for (let j = symbol.length - 1; j >= 0; j--) {
        for (let i = 0; i < symbol.length; i++) {
            var tempSymbol = symbol[i];
            if (tempSymbol[j] != 0) {
                xl = j;                 //saves where in the tetramino square the last block appears x-wise.
                isValue = true;
                break;
            }

        }
        if (isValue) break;
    }
    isValue = false;

    for (var i = symbol.length - 1; i >= 0; i--) {
        var tempSymbol = symbol[i];
        for (var j = 0; j < symbol.length; j++) {
            if (tempSymbol[j] != 0) {
                yl = i;                 //saves where in the tetramino square the last block appears y-wise.
                isValue = true;
                break;
            }
        }
        if (isValue) break;
    }
    var indexes = [xx, yy, xl, yl];     //array of the first and last position x-wise and y-wise in the tetramino building block square.
    return indexes;
}
var currentBlock = { currentPiece: makePiece(nextSymbols[0]), blockX: [], blockY: [] }
function setCurrentBlockCoords(xCoord, yCoord) {
    currentBlock.blockX.unshift(xCoord);
    currentBlock.blockY.unshift(yCoord);
}
function resetCurrentBlockCoords() {
    currentBlock.blockX = [];
    currentBlock.blockY = [];
}

function checkSides() {
    if (currentBlock.blockX != 0) {
        for (let i = 0; i < currentBlock.blockX.length; i++) {
            if (currentBlock.blockX[i] == 0) {
                return 0;
            }
            else if (currentBlock.blockX[i] == 9) {
                return 1;
            }

        }
    }
}
/*extracts color for a block and returns color stop code */
function extractingColorNumber(pieceToCheck) {
    var currentPieceNumber;
    pieceToCheck.forEach(function (element) {
        element.forEach(function (elementInElement) {
            if (elementInElement != 0) {
                currentPieceNumber = elementInElement;
            }
        });
    });
    var stoppedColor = currentPieceNumber + "" + currentPieceNumber;
    return stoppedColor;
}
var cantMoveLeft = false;
var cantMoveRight = false;
/* Sets the correct color for each piece. A number <10 defines a color for a moving block.
                 A number >10 defines a color for an existing block. */
function drawSymbol(pieceToDraw) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 20; j++) {
            if (board[i][j] != 0) {
                if (board[i][j] < 10 && board[i][j + 1] > 10) { // checks if the moving block collides with a fix block.
                    console.log("collision");
                    atBottom = true;
                    isAtBottom = true;
                    hasCollided = true;


                }
                if (i > 0) {
                    if ((board[i][j] < 10 && board[i - 1][j] > 10) || (board[i][j] < 10 && board[i - 1][j + 1] > 10)) {// checks if the moving block has a fixed block to the left
                        cantMoveLeft = true; // bool for movement
                    }
                }
                if (i < 9) {

                    if ((board[i][j] < 10 && board[i + 1][j] > 10) || (board[i][j] < 10 && board[i + 1][j + 1] > 10)) { // checks if the moving block has a fixed block to the right
                        cantMoveRight = true; // bool for movement
                    }
                }
                if (atBottom && board[i][j] < 10) {
                    board[i][j] = parseInt(pieceToDraw);
                }
                if (board[i][j] == 11) {
                    gameBoardContext.fillStyle = colors[0];
                    gameBoardContext.fillRect(i * 25, j * 25, 25, 25);
                    gameBoardContext.strokeRect(i * 25, j * 25, 25, 25);
                }
                else if (board[i][j] == 22) {
                    gameBoardContext.fillStyle = colors[1];
                    gameBoardContext.fillRect(i * 25, j * 25, 25, 25);
                    gameBoardContext.strokeRect(i * 25, j * 25, 25, 25);
                }
                else if (board[i][j] == 33) {
                    gameBoardContext.fillStyle = colors[2];
                    gameBoardContext.fillRect(i * 25, j * 25, 25, 25);
                    gameBoardContext.strokeRect(i * 25, j * 25, 25, 25);
                }
                else if (board[i][j] == 44) {
                    gameBoardContext.fillStyle = colors[3];
                    gameBoardContext.fillRect(i * 25, j * 25, 25, 25);
                    gameBoardContext.strokeRect(i * 25, j * 25, 25, 25);
                }
                else if (board[i][j] == 55) {
                    gameBoardContext.fillStyle = colors[4];
                    gameBoardContext.fillRect(i * 25, j * 25, 25, 25);
                    gameBoardContext.strokeRect(i * 25, j * 25, 25, 25);

                }
                else if (board[i][j] == 66) {
                    gameBoardContext.fillStyle = colors[5];
                    gameBoardContext.fillRect(i * 25, j * 25, 25, 25);
                    gameBoardContext.strokeRect(i * 25, j * 25, 25, 25);
                }
                else if (board[i][j] == 77) {
                    gameBoardContext.fillStyle = colors[6];
                    gameBoardContext.fillRect(i * 25, j * 25, 25, 25);
                    gameBoardContext.strokeRect(i * 25, j * 25, 25, 25);
                }
                else if (board[i][j] < 10) {
                    gameBoardContext.fillStyle = colors[board[i][j] - 1];
                    gameBoardContext.fillRect(i * 25, j * 25, 25, 25);
                    gameBoardContext.strokeRect(i * 25, j * 25, 25, 25);
                    setCurrentBlockCoords(i, j);
                }

            }
        }
    }

    gameBoardContext.fillStyle = colors[6];

}
function paintSymbol(/*x, y*/) {
    checkIfGameOver();
    cantMoveLeft = false; // resets bool for movement.
    cantMoveRight = false; // resets bool for movement.
    var piece = makePiece(nextSymbols[0]);
    var pieceToWrite = extractingColorNumber(piece);
    var falseMove = false;
    var indexes = getSymbolXY(piece);
    var isAtBottom = false;
    if (y + indexes[3] >= 19) { //Block reaches bottom
        isAtBottom = true;
        console.log("Stop");
    }


    for (let i = 0; i < piece.length; i++) {

        for (let j = 0; j < piece.length; j++) {
            // if (x + indexes[0] < 0 || x + indexes[2] > 9) {
            //     falseMove = true;
            // }
            for (let i = 0; i < piece.length; i++) {

                for (let j = 0; j < piece.length; j++) {

                    if (falseMove == false) {
                        if (piece[i][j] != 0) {
                            board[x + j][y + i] = piece[i][j];
                        }
                    }
                }

            }
            if (isAtBottom || hasCollided) {

                atBottom = true;
                isAtBottom = false;
                //nextSymbols.splice(0, 1);
                hasCollided = false;

            }
            if (falseMove != true) {
                gameBoardContext.clearRect(0, 0, gameBoardCanvas.width, gameBoardCanvas.height);
                resetCurrentBlockCoords();
                drawSymbol(pieceToWrite);
            }
            makeGameBoard();
        }
    }

}

//gets the second symbol in the nextSymbols array and paints it in the top canvas to the right of the game board
function paintNextSymbolOne() {
    var piece = makePiece(nextSymbols[1]);
    pieceOneContext.clearRect(0, 0, pieceOneCanvas.width, pieceOneCanvas.height);
    for (let i = 0; i < piece.length; i++) {
        for (let j = 0; j < piece.length; j++) {
            if (piece[i][j] != 0) {
                pieceOneContext.fillStyle = colors[piece[i][j] - 1];
                pieceOneContext.fillRect(j * 20, i * 20, 20, 20);
                pieceOneContext.strokeRect(j * 20, i * 20, 20, 20);
            }
        }
    }
}

//gets the third symbol in the nextSymbols array and paints it in the bottom canvas to the right of the game board
function paintNextSymbolTwo() {
    var piece = makePiece(nextSymbols[2]);
    pieceTwoContext.clearRect(0, 0, pieceTwoCanvas.width, pieceTwoCanvas.height);
    for (let i = 0; i < piece.length; i++) {
        for (let j = 0; j < piece.length; j++) {
            if (piece[i][j] != 0) {
                pieceTwoContext.fillStyle = colors[piece[i][j] - 1];
                pieceTwoContext.fillRect(j * 20, i * 20, 20, 20);
                pieceTwoContext.strokeRect(j * 20, i * 20, 20, 20);

            }
        }
    }
}

//gets the symbol in the savedSymbol array and paints it in the canvas to the left of the game board
function paintSavedSymbol() {
    var piece = makePiece(savedSymbol[0]);
    savedSymbolContext.clearRect(0, 0, savedSymbolCanvas.width, savedSymbolCanvas.height);
    for (let i = 0; i < piece.length; i++) {
        for (let j = 0; j < piece.length; j++) {
            if (piece[i][j] != 0) {
                savedSymbolContext.fillStyle = colors[piece[i][j] - 1];
                savedSymbolContext.fillRect(j * 20, i * 20, 20, 20);
                savedSymbolContext.strokeRect(j * 20, i * 20, 20, 20);

            }
        }
    }
}

//saves the symbol currently being played and removes it from the nextSymbols array. If called again with a piece already saved
//it will swap the saved one for the one being played
function saveSymbol() {
    if (savedSymbol.length < 1) {
        savedSymbol[0] = nextSymbols[0];
        nextSymbols.splice(0, 1);
        y = 0;
        x = 4;
        paintSavedSymbol();
    }
    else {
        var symbolToSwap = savedSymbol[0];
        savedSymbol[0] = nextSymbols[0];
        nextSymbols[0] = symbolToSwap;
        y = 0;
        x = 4;
        paintSavedSymbol();
    }
}



function updateGameBoard() {
    paintSymbol();
    if (hasCollided || atBottom) {
        nextSymbols.splice(0, 1);
        checkLines();
        hasCollided = false;
    }

}

function checkIfGameOver() {
    var gameOver = false;
    if (x - 1 > 0 && board[x - 1][1] != 0) {
        console.log("gameoverman");
        gameOver = true;
        clearInterval(gameplayLoopID);
    }
    else if (board[x][1] != 0) {
        console.log("gameoverman");
        gameOver = true;
        clearInterval(gameplayLoopID); // uncaught reference error när x > 10. dvs om man trycker höger för många gånger. (funkar åt vänster.)
    }
    //console.log(x + "    " + y);


    else if (x + 1 < 10 && board[x + 1][1] != 0) {
        console.log("gameoverman");
        gameOver = true;
        clearInterval(gameplayLoopID);
    }

    if (gameOver) {
        $("#gameOverText").css("display", "block");
        addHighScore();
    }
}


function play() {
    if (playerName == "") {
        showUserNameModal();
        setUsernameBeforeStartingGame = true;
    }
    else {
        resetGame();
        gameplayLoopID = setInterval(startGameplayLoop, 800);
    }
}


function startGameplayLoop() {
    makeGameBoard();
    tick++;
    $("#counter").text(tick);
    generateNextThreeSymbols();
    paintNextSymbolOne();
    paintNextSymbolTwo();
    updateGameBoard();
    if (atBottom) {
        x = 4;
        y = 0;
        //giveScore();
        atBottom = false;
    }
    y++;
}

function resetGame() {
    resetBoard();
    tick = 0;
    $("#counter").text(tick);
    clearInterval(gameplayLoopID);
    nextSymbols = [];
    savedSymbol = [];
    points = 0;
    $("#score").text("Score: " + points);
    $("#gameOverText").css("display", "none");
    x = 4;
    y = 0;
    gameBoardContext.clearRect(0, 0, gameBoardCanvas.width, gameBoardCanvas.height);
    pieceOneContext.clearRect(0, 0, pieceOneCanvas.width, pieceOneCanvas.height);
    pieceTwoContext.clearRect(0, 0, pieceTwoCanvas.width, pieceTwoCanvas.height);
    savedSymbolContext.clearRect(0, 0, savedSymbolCanvas.width, savedSymbolCanvas.height);
}

function resetBoard() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = 0;
        }
    }
}

function rotate() {
    switch (nextSymbols[0]) {
        case "t":
            nextSymbols[0] = "t1";
            break;
        case "t1":
            nextSymbols[0] = "t2";
            break;
        case "t2":
            nextSymbols[0] = "t3";
            break;
        case "t3":
            nextSymbols[0] = "t";
            break;
        case "l":
            nextSymbols[0] = "l1";
            break;
        case "l1":
            nextSymbols[0] = "l2";
            break;
        case "l2":
            nextSymbols[0] = "l3";
            break;
        case "l3":
            nextSymbols[0] = "l";
            break;
        case "j":
            nextSymbols[0] = "j1";
            break;
        case "j1":
            nextSymbols[0] = "j2";
            break;
        case "j2":
            nextSymbols[0] = "j3";
            break;
        case "j3":
            nextSymbols[0] = "j";
            break;
        case "i":
            nextSymbols[0] = "i1";
            break;
        case "i1":
            nextSymbols[0] = "i";
            break;
        case "s":
            nextSymbols[0] = "s1";
            break;
        case "s1":
            nextSymbols[0] = "s";
            break;
        case "z":
            nextSymbols[0] = "z1";
            break;
        case "z1":
            nextSymbols[0] = "z";
            break;

    }
    var lastXInSymbol;
    var symbolToCheck = makePiece(nextSymbols[0]);
    var valueIsCorrect = false;
    for (let j = symbolToCheck.length - 1; j >= 0; j--) {
        for (let i = 0; i < symbolToCheck.length; i++) {
            var tempSymbolToCheck = symbolToCheck[i];
            if (tempSymbolToCheck[j] != 0) {
                lastXInSymbol = j;                 //saves where in the tetramino square the last block appears x-wise.
                valueIsCorrect = true;
                break;
            }

        }
        if (valueIsCorrect) break;
    }
    valueIsCorrect = false;
    if (x + lastXInSymbol > 9) {
        x = x - lastXInSymbol;
        updateGameBoard();
    }
    updateGameBoard();
}

function keyPressed(e) {
    var keyCode = e.keyCode;
    if (keyCode == 37) {        // Left key
        leftMove();
    }
    else if (keyCode == 39) {   // Right key
        rightMove();
    }
    else if (keyCode == 40) {   // Down key
        downMove();
    }
    else if (keyCode == 88) {   // X Key
        saveSymbol();
    }
    else if (keyCode == 90) {   // Z key
        rotate();
    }
}

function leftMove() { // moves piece one step left
    if (checkSides() != 0 && !cantMoveLeft) {
        x--;
        updateGameBoard();
    }
}
function rightMove() { // moves piece one step right
    if (checkSides() != 1 && !cantMoveRight) {
        x++;
        updateGameBoard();
    }
}

function downMove() { // moves piece one step down
    if (y + 1 < 19 && board[x][y + 1] == 0) {
        y++;
        updateGameBoard();
    }
}



function checkLines() {   //Check lines after a block lands.
    let counter = 0;
    let linesCleared = 0;
    for (let i = 19; i >= 0; i--) {
        for (let j = 9; j >= 0; j--) {
            if (board[j][i] > 10) {
                counter++;
                if (counter == 10) {
                    linesCleared++;
                    giveScore(linesCleared);
                    for (let rowCount = 0; rowCount < board.length; rowCount++) {

                        board[rowCount].splice(i, 1);
                        board[rowCount].unshift(0); // adds a new line to the board.

                        // Give score here!

                    }
                    counter = 0;
                    i++;
                }
            }
        }
        counter = 0;
    }
    linesCleared = 0;
}
function giveScore(bonus) {
    points += 100;
    if (bonus == 2) {
        points += 100;
    }
    else if (bonus == 3) {
        points += 200;
    }
    else if (bonus == 4) {
        points += 300;
    }
    $("#score").text("Score: " + points);
}
/* Clears a line*/

// function giveScore() { // needs lots of rework.
//     let newCount = 0;
//     var tempBoardLine = 0;
//     for (let i = 0; i < board.length; i++) {
//         for (let j = newCount; j < board[i].length; j++) {
//             if (board[i][j] > 10) {
//                 newCount = j;
//                 tempBoardLine += 99;
//             }
//             if (j != newCount) {
//                 tempBoardLine = 0;
//             }
//             if (tempBoardLine == 990) { // if there are blocks on all positions in a row
//                 points += 100;
//                 prevLine += tempBoardLine; // variable to decide if bonus points are eligible
//                 clearLine(newCount);
//                 tempBoardLine = 0;      // resets the row
//             }
//         }
//         if (prevLine % 990 == 0 && prevLine != 0 && prevLine != 990) {
//             points += 100;
//         }
//     }
//     prevLine = 0;""
//     $("#score").text("Score: " + points);
// }

/*Higscore list*/
function printHighScore() {
    var scoreToPrint;
    var leaderBoardDiv = $("#leaderBoardContainer");
    if (localStorage.getItem("score") === null) {
        scoreToPrint = [];
    }
    else {
        scoreToPrint = JSON.parse(localStorage.getItem("score"));
    }

    if (scoreToPrint.length > 0) {
        if ($("#leaderBoardList") !== null) {
            $("#leaderBoardList").remove();
        }
        var listOfScores = document.createElement("ol");
        listOfScores.setAttribute("id", "leaderBoardList");
        $("#leaderBoardContainer").append(listOfScores);
        for (var i = 0; i < scoreToPrint.length; i++) {
            if ($("#emptyHighScoreList") !== null) {
                $("#emptyHighScoreList").remove();
            }
            var nextScoreToPrint = document.createElement("li");
            nextScoreToPrint.innerText = scoreToPrint[i].player + " - " + scoreToPrint[i].numberOfPoints + "p";
            $("#leaderBoardList").append(nextScoreToPrint);
        }
    }

    else {
        var textElement = document.createElement("p");
        textElement.setAttribute("id", "emptyHighScoreList");
        textElement.innerText = "No available highscores";
        leaderBoardDiv.append(textElement);
    }
}

function addHighScore() {
    var listOfScores;
    if (localStorage.getItem("score") == null) {
        listOfScores = [];
    }

    else {
        listOfScores = JSON.parse(localStorage.getItem("score"));
    }
    var objectToStore = {
        player: playerName,
        numberOfPoints: points
    }
    if (listOfScores.length < 5) {
        listOfScores.push(objectToStore);
        listOfScores.sort(function (a, b) {
            return b.numberOfPoints - a.numberOfPoints;
        });
        localStorage.setItem("score", JSON.stringify(listOfScores));
    }

    else {
        listOfScores.push(objectToStore);
        listOfScores.sort(function (a, b) {
            return b.numberOfPoints - a.numberOfPoints;
        });
        listOfScores.splice(listOfScores.length - 1, 1);
        localStorage.setItem("score", JSON.stringify(listOfScores));
    }

    printHighScore();
}
    // var currentUserAndScore = { user: playerName, score: points };
    // highScore.sort(function (a, b) {
    //     return a.points - b.points;
    // })
    // for (var i = 0; i < 5; i++) {
    //     var något = document.createElement('li');
    //     var score = { user: name, score: points };
    //     //highScore.push(score);
    //     topScore.appendChild(score);

    //     if (i >= highScore.length - 1) {
    //         break;
    //     }
    // }

//     /*let highscore = JSON.parse(window.localStorage.getItem('score'))
// if (highscore == null) {
// highscore = []
// }
// let score = { user: playerName, score: points};

// highscore.push(score);
// highscore.*/

