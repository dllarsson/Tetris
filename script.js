$(document).ready(function () {
    window.addEventListener("keydown", KeyPressed, false);
    document.getElementById("leftArrow").addEventListener("touchstart", leftMove, false);
    document.getElementById("rightArrow").addEventListener("touchstart", rightMove, false);
    //document.getElementById("directionArrow").addEventListener("touchstart", directionMove, false);
    MakeGameBoard();

});
var x = 4;
var y = 0;
var AtBottom = false;
var tick = 0;
var SymbolXY = [];
var nextSymbols = [];
var savedSymbol = [];
var playerName;
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function handleUsernameFromInput() {
    playerName = $("#usernameInput").val()
    $("#usernameText").css("display", "block");
    $("#usernameText").text("Your username is: " + playerName);
    $("#usernameInput").val("");
    $("#usernameContainer").css("display", "none");
    console.log(playerName);
}
function SetX(coord) {
    x = coord;
}

var colors = ["blue", "#03f8fc", "green", "orange", "#b503fc", "red", "yellow"];
let makePiece = function (type) {
    if (type === "t") {
        return [
            [0, 0, 0],
            [5, 5, 5],
            [0, 5, 0]
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
            [0, 4, 0],
            [0, 4, 0],
            [0, 4, 4]
        ];
    }
    else if (type === "j") {
        return [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
        ];
    }
    else if (type === "i") {
        return [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0]
        ];
    }
    else if (type === "s") {
        return [
            [0, 3, 3],
            [3, 3, 0],
            [0, 0, 0]
        ];
    }
    else if (type === "z") {
        return [
            [6, 6, 0],
            [0, 6, 6],
            [0, 0, 0]
        ];
    }
};

var Board = [];
var BoardWithPieces = [];
function MakeGameBoard() {
    var gameBoard = [];
    for (let i = 0; i < 10; i++) {
        var tempArr = [];
        for (let j = 0; j < 20; j++) {

            tempArr[j] = 0;
            if (Board.length != 0) {
                if (Board[i][j] == 99) {
                    tempArr[j] = 99;
                }

            }

        }
        gameBoard.push(tempArr);
    }
    Board = gameBoard;
}
function PaintGameBoard() {

    var x = 0;
    var y = 0;

    for (var i = 0; i < 10; i++) {
        if (i % 2 == 0) y = 0;
        else y = 35;
        for (var j = 0; j < 20; j++) {
            ctx.fillStyle = "#f0f0f0";
            ctx.fillRect(x, y, 35, 35);
            y += 70;
        }
        x += 35;
    }
}

function randomizeSymbol() {
    var symbols = ["t", "o", "l", "j", "s", "z", "i"];
    return symbols[Math.floor(Math.random() * 7)]
}

function generateNextThreeSymbols() {
    while (nextSymbols.length < 3) {
        nextSymbols.push(randomizeSymbol());
    }
}

function GetSymbolXY(symbol) {
    var isValue = false;
    var xx = 0;
    var yy = 0;
    var xl = 0;
    var yl = 0;
    for (let j = 0; j < symbol.length; j++) {
        for (let i = 0; i < symbol.length; i++) {
            var tempSymbol = symbol[i];
            if (tempSymbol[j] != 0) {
                xx = j;
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
                yy = i;
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
                xl = j;
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
                yl = i;
                isValue = true;
                break;
            }
        }
        if (isValue) break;
    }
    var indexes = [xx, yy, xl, yl];
    return indexes;
}
function PaintSymbol(x, y, direction) {
    var piece = makePiece(nextSymbols[0]);
    var falseMove = false;
    var indexes = GetSymbolXY(piece);
    var isAtBottom = false;
    if (y + indexes[3] == 19) { //Block reaches bottom
        isAtBottom = true;
        console.log("Stop");
    }
    if (Board[x + indexes[0]][y + indexes[3]] == 99 || Board[x + indexes[2]][y + indexes[3]] == 99){ // Block connects with other
        isAtBottom = true;
        console.log("Stop");
    }
    if (x + indexes[2] > 9) {
        SetX(x - 1);
        return console.log("Too far right");
    }

    if (x - indexes[0] < 0) {
        SetX(x + 1);
        return console.log("Too far right");
    }


    for (let i = 0; i < piece.length; i++) {

        for (let j = 0; j < piece.length; j++) {
            if (x + indexes[0] < 0 || x + indexes[2] > 9) {
                falseMove = true;
            }
            for (let i = 0; i < piece.length; i++) {

                for (let j = 0; j < piece.length; j++) {

                    if (falseMove == false) {
                        if (piece[i][j] != 0) {
                            Board[x + j][y + i] = piece[i][j];
                        }
                    }
                }

            }
            if (isAtBottom) {
                BoardWithPieces = Board;
                AtBottom = true;
                isAtBottom = false;
                nextSymbols.splice(0, 1);
            }
            if (falseMove != true) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                for (let i = 0; i < 10; i++) {
                    for (let j = 0; j < 20; j++) {
                        if (Board[i][j] != 0) {
                            if (AtBottom) {
                                Board[i][j] = 99;
                            }
                            ctx.fillStyle = colors[Board[i][j] - 1];
                            ctx.fillRect(i * 35, j * 35, 35, 35);
                        }
                    }
                }
            }
            
            MakeGameBoard();
           
        }
    }
}

function paintNextSymbolOne() {
    var piece = makePiece(nextSymbols[1]);
    var pieceOneCanvas = document.getElementById("nextSymbolOne");
    var pieceOneContext = pieceOneCanvas.getContext("2d");
    pieceOneContext.clearRect(0, 0, pieceOneCanvas.width, pieceOneCanvas.height);
    for (let i = 0; i < piece.length; i++) {
        for (let j = 0; j < piece.length; j++) {
            if (piece[i][j] != 0) {
                pieceOneContext.fillStyle = colors[piece[i][j] - 1];
                pieceOneContext.fillRect(j * 20, i * 20, 20, 20);
            }
        }
    }
}

function paintNextSymbolTwo() {
    var piece = makePiece(nextSymbols[2]);
    var pieceTwoCanvas = document.getElementById("nextSymbolTwo");
    var pieceTwoContext = pieceTwoCanvas.getContext("2d");
    pieceTwoContext.clearRect(0, 0, pieceTwoCanvas.width, pieceTwoCanvas.height);
    for (let i = 0; i < piece.length; i++) {
        for (let j = 0; j < piece.length; j++) {
            if (piece[i][j] != 0) {
                pieceTwoContext.fillStyle = colors[piece[i][j] - 1];
                pieceTwoContext.fillRect(j * 20, i * 20, 20, 20);
            }
        }
    }
}

function paintSavedSymbol() {
    var piece = makePiece(savedSymbol[0]);
    var savedSymbolCanvas = document.getElementById("savedSymbol");
    var savedSymbolContext = savedSymbolCanvas.getContext("2d");
    savedSymbolContext.clearRect(0, 0, savedSymbolCanvas.width, savedSymbolCanvas.height);
    for (let i = 0; i < piece.length; i++) {
        for (let j = 0; j < piece.length; j++) {
            if (piece[i][j] != 0) {
                savedSymbolContext.fillStyle = colors[piece[i][j] - 1];
                savedSymbolContext.fillRect(j * 20, i * 20, 20, 20);
            }
        }
    }
}

function saveSymbol() {
    if (savedSymbol.length < 1) {
        savedSymbol[0] = nextSymbols[0];
        nextSymbols.splice(0, 1);
        y = 0;
        paintSavedSymbol();
    }
    else {
        var symbolToSwap = savedSymbol[0];
        savedSymbol[0] = nextSymbols[0];
        nextSymbols[0] = symbolToSwap;
        y = 0;
        paintSavedSymbol();
    }
}



function UpdateGameBoard() {
    if (nextSymbols.length < 1) {
        generateNextThreeSymbols();
    }

    if (AtBottom) {
        PaintSymbol(x, y, 23);
    }
    else {
        PaintSymbol(x, y, 23);
    }

    tick++;


    console.log(x + "    " + y);
}

function Play(stop) {
    MakeGameBoard();
    var refreshintervalID = setInterval(function () {
        $("#counter").text(tick);
        generateNextThreeSymbols();
        paintNextSymbolOne();
        paintNextSymbolTwo();
        UpdateGameBoard();
        if (AtBottom) {
            x = 4;
            y = 0;
            giveScore();
            AtBottom = false;
        }
        y++;

    }, 800);
    if (stop == 1) {
        tick = 0;
        clearInterval(refreshintervalID);
        nextSymbols = [];
        generateNextThreeSymbols();
        points = 0;
        y = 0;
    }
    if (stop == 2) {
        Rotate(symbol, 1);
    }
}

// function Rotate(sym, direction){
//     let rotate=function(sym,direction){
// 		for(let y=0;y<sym.length;++y){
// 			for(let x=0;x<y;++x){
// 				[
// 					sym[x][y],
// 					sym[y][x]
// 				]=[
// 					sym[y][x],
// 					sym[x][y],
// 				]
// 			}
// 		}
// 		if(dir>0){
// 			sym.forEach(row=>row.reverse());
// 		}
// 		else{
// 			sym.reverse();
// 		}
//     };
//     return rotate;
// }


function KeyPressed(e) {
    var keyCode = e.keyCode;
    if (keyCode == 37) {        // Left key
        x--;
        UpdateGameBoard();
    }
    else if (keyCode == 38) {   // Up key
        Move(38);
    }
    else if (keyCode == 39) {   // Right key
        x++;
        // PaintSymbol(x,y)
        UpdateGameBoard();
    }
    else if (keyCode == 88) {   //X Key
        saveSymbol();
    }
    else if (keyCode == 90) {   // Down key
        Move(90);
    }
}

//Menu effect
function barFunction() {
    var x = document.getElementById("nav"); // kan ev. uppstå konflikt med koordinat x
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function leftMove(){
    x--;            // moves piece one step left
    UpdateGameBoard();
}
function rightMove(){
    x++;            // moves piece one step right
    UpdateGameBoard();
}

var points = 0;
var prevLine = 0;
function giveScore(){ // needs lots of rework.
    let newCount = 0;
    var tempBoardLine = 0;
    for (let i = 0; i < Board.length; i++){
        for (let j = newCount; j < Board[i].length; j++){
            if(Board[i][j] == 99){
                newCount = j;               
            }
            tempBoardLine += Board[i][j];
            if (j != newCount){
                tempBoardLine = 0;
            }
            if (tempBoardLine == 990){ // if there are blocks on all positions in a row
                points += 100;
                prevLine += tempBoardLine; // variable to decide if bonus points are eligible
                tempBoardLine = 0;      // resets the row
            }
        }
        if (prevLine % 990 == 0 && prevLine != 0 && prevLine != 990){
            points += 100;
        }
    }
    prevLine = 0;
    document.getElementById("score").innerText = "Score: " + points;
}

