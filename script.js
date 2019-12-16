$(document).ready(function(){
    window.addEventListener("keydown", KeyPressed, false);
    document.getElementById("leftArrow").addEventListener("touchstart", LeftMove, false);
    document.getElementById("rightArrow").addEventListener("touchstart", RightMove, false);
    document.getElementById("rotationArrow").addEventListener("touchstart", RotationMove, false);

    MakeGameBoard();
});
<<<<<<< HEAD
var x = 0;
var y = 0;
=======

var colors=["blue","#03f8fc","green","orange","#b503fc","red","yellow"];
>>>>>>> f57869b161fbe168b21b5c137870d5931fe7706e
let makePiece=function(type){
    if(type==="t"){
        return [
            [0,0,0],
            [5,5,5],
            [0,5,0]
        ];
    }
    else if(type==="o"){
        return [
            [7,7],
            [7,7]
        ];
    }
    else if(type==="l"){
        return [
            [0,4,0],
            [0,4,0],
            [0,4,4]
        ];
    }
    else if(type==="j"){
        return [
            [0,1,0],
            [0,1,0],
            [1,1,0]
        ];
    }
    else if(type==="i"){
        return [
            [0,2,0,0],
            [0,2,0,0],
            [0,2,0,0],
            [0,2,0,0]
        ];
    }
    else if(type==="s"){
        return [
            [0,3,3],
            [3,3,0],
            [0,0,0]
        ];
    }
    else if(type==="z"){
        return [
            [6,6,0],
            [0,6,6],
            [0,0,0]
        ];
    }
};

var Board = [];
function MakeGameBoard(){
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
localStorage.setItem("x", 0);
localStorage.setItem("y", 0);
localStorage.setItem("tick", 0);
function PaintGameBoard(){
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");

    var x = 0;
    var y = 0;

    for (var i = 0; i < 10; i++){
        if (i % 2 == 0) y = 0;
        else y = 35;
        for(var j = 0; j < 20; j++){
            ctx.fillStyle = "#f0f0f0";
            ctx.fillRect(x, y, 35, 35);
            y += 70;
        }
        x += 35;
    }
}

var getSymbol = randomizeSymbol();
localStorage.setItem("currentSymbol", getSymbol);
function randomizeSymbol(){
    var symbols = ["t","o,","l","j","s","z","i"];
    return symbols[Math.floor(Math.random() * 8)]
}


function PaintSymbol(x,y,s){
    var piece = makePiece(s);
    for (let i = 0; i < piece.length; i++) {
        for (let j = 0; j < piece.length; j++) {
            Board[x + j][y + i] = piece[i][j];
        }
        
    }
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 20; j++) {
            if (Board[i][j] != 0){
                console.log(Board[i][j]-1)
                ctx.fillStyle = colors[Board[i][j]-1];
                ctx.fillRect(i * 35, j*35, 35,35);
            }
        }
    }
    MakeGameBoard();
}




function UpdateGameBoard(){
    
    var tick = localStorage.getItem("tick");
    PaintSymbol(x,y,localStorage.getItem("currentSymbol"));
    
    tick++;
    y++;
    localStorage.setItem("tick", tick);
}

function Reset(){
    localStorage.clear();
}
function Play(stop){
        var refreshintervalID = setInterval(function(){ 
        $("#counter").text(localStorage.getItem("tick"));
        UpdateGameBoard();
        
    }, 750);
    if (stop == 1){
        clearInterval(refreshintervalID);
       y = 0;
    }
}




function KeyPressed(e){
    var keyCode = e.keyCode;
    if(keyCode == 37){      // Left key
        Move(37);
    }
    else if(keyCode == 38){     // Up key
        Move(38);
    }
    else if(keyCode == 39){     // Right key
        Move(39);
    }
    else if(keyCode == 90){     // Down key
        Move(90);
    }
};
function Move(direction){
    var x = Number(localStorage.getItem("x"));
    var y = Number(localStorage.getItem("y"));
    if (direction == 39){       // Move Right
        x = x + 35;
        localStorage.setItem("x", x);
        PaintSymbol(x, y);
    }
    else if(direction == 37){       // Move Left
        x = x - 35;
        localStorage.setItem("x", x);
        PaintSymbol(x, y);
    }
    else if(direction == 37){       // Move Left
        x = x - 35;
        localStorage.setItem("x", x);
        PaintSymbol(x, y);
    }
    else if(direction == 90){       // Rotate counter clockwise
        
        
        PaintSymbol(x, y, 1);
    }
}
function LeftMove(){
    var x = Number(localStorage.getItem("x"));
    var y = Number(localStorage.getItem("y"));
    x = x - 35;
        localStorage.setItem("x", x);
        PaintSymbol(x, y);
};
function RightMove(){
    var x = Number(localStorage.getItem("x"));
    var y = Number(localStorage.getItem("y"));
    x = x + 35;
        localStorage.setItem("x", x);
        PaintSymbol(x, y);
};
function RotationMove(){
    var x = Number(localStorage.getItem("x"));
    var y = Number(localStorage.getItem("y"));
    PaintSymbol(x, y, 1);
}



