$(document).ready(function () {
    window.addEventListener("keydown", KeyPressed, false);
    //document.getElementById("leftArrow").addEventListener("touchstart", LeftMove, false);
    //document.getElementById("rightArrow").addEventListener("touchstart", RightMove, false);
    //document.getElementById("directionArrow").addEventListener("touchstart", directionMove, false);
    MakeGameBoard();

});
var x = 0;
var y = 0;
var symbol;
var tick = 0;

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

var getSymbol = randomizeSymbol();

symbol = getSymbol;
function randomizeSymbol() {
    var symbols = ["t", "o", "l", "j", "s", "z", "i"];

    return symbols[Math.floor(Math.random() * 7)]
}


function PaintSymbol(x, y, s, direction) {
    var piece = makePiece(s);

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




function UpdateGameBoard() {
    if (symbol == ""){
        symbol = randomizeSymbol();
    }
    PaintSymbol(x,y,symbol,23);
    

    tick++;
    y++;

    console.log(x+ "    " +y);
}

function Play(stop) {
    MakeGameBoard();
    var refreshintervalID = setInterval(function () {
        $("#counter").text(tick);
        UpdateGameBoard();

    }, 50);
    if (stop == 1) {
        clearInterval(refreshintervalID);

        symbol = randomizeSymbol();
        y = 0;
    }
    if(stop == 2){
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
    if (keyCode == 37) {      // Left key
        Move(37);
    }
    else if (keyCode == 38) {     // Up key
        Move(38);
    }
    else if (keyCode == 39) {     // Right key
        x++;
        UpdateGameBoard();
    }
    else if (keyCode == 90) {     // Down key
        Move(90);
    }
}


