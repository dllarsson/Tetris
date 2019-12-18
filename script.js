$(document).ready(function () {
    window.addEventListener("keydown", KeyPressed, false);
    //document.getElementById("leftArrow").addEventListener("touchstart", LeftMove, false);
    //document.getElementById("rightArrow").addEventListener("touchstart", RightMove, false);
    //document.getElementById("directionArrow").addEventListener("touchstart", directionMove, false);
    MakeGameBoard();

});
var x = 0;
var y = 0;
//var symbol;
var tick = 0;
var nextSymbols = [];
var savedSymbol = [];

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
function MakeGameBoard() {
    var gameBoard = [];
    for (let i = 0; i < 10; i++) {
        var tempArr = [];
        for (let j = 0; j < 20; j++) {
            tempArr[j] = 0;
        }
        gameBoard.push(tempArr);
    }
    Board = gameBoard;
}
function PaintGameBoard() {
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");

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

function PaintSymbol(x, y, rotation){
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");


}


function PaintSymbol(x, y, direction) {
    var piece = makePiece(nextSymbols[0]);
    var falseMove = false;
    var indexOfLast = 0;
    for (let l = piece.length; l >= 0; l--) {

        var tempArr = piece[l - 1];
        for (let c = 0; c < l; c++) {

            if (tempArr[c] != 0 && indexOfLast == 0) {
                indexOfLast = l;
                break;
            }


        }
        if (indexOfLast != 0) break;
    }
    for (let i = 0; i < piece.length; i++) {

        for (let j = 0; j < piece.length; j++) {
            if (x < 0 || x > 9 || y > 19 || x || y + indexOfLast > 20) {
                falseMove = true;
            }
            for (let i = 0; i < piece.length; i++) {

                for (let j = 0; j < piece.length; j++) {

                    Board[x + j][y + i] = piece[i][j];
                    if (x < 0 && x > 9 && y > 19) falseMove = true;
                    if (falseMove == false) {
                        Board[x + j][y + i] = piece[i][j];
                    }
                }

            }
            if (falseMove != true) {
                var canvas = document.getElementById("game");
                var ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (let i = 0; i < 10; i++) {
                    for (let j = 0; j < 20; j++) {
                        if (Board[i][j] != 0) {
                            console.log(Board[i][j] - 1)
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
                pieceOneContext.fillRect(i * 20, j * 20, 20, 20);
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
                pieceTwoContext.fillRect(i * 20, j * 20, 20, 20);
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
                savedSymbolContext.fillRect(i * 20, j * 20, 20, 20);
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
    PaintSymbol(x, y, nextSymbols[0], 23);


    tick++;
    y++;

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

    }, 50);
    if (stop == 1) {
        clearInterval(refreshintervalID);
        nextSymbols=[];
        generateNextThreeSymbols();
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
        Move(37);
    }
    else if (keyCode == 38) {   // Up key
        Move(38);
    }
    else if (keyCode == 39) {   // Right key
        x++;
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
    var x = document.getElementById("nav");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}


