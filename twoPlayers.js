$(document).ready(function () {
    var gameContainer = $("#gameContainer");
    var canvas = document.createElement('canvas');
    canvas.id = "secondGame";
    canvas.width = 350;
    canvas.height = 700;
    canvas.style.border = "2px solid";
    var playButton = document.createElement('button');
    playButton.onclick = function () { PlayTwo() };
    playButton.innerText = "Play";

    var resetButton = document.createElement('button');
    resetButton.onclick = function () { PlayTwo(1) };
    resetButton.innerText = "Reset";
    var counterText = document.createElement('p');
    counterText.id = "counterTwo";
    counterText.className = "counter";
    counterText.innerText = "0";
    gameContainer.append(canvas, counterText, playButton, resetButton);

    PaintGameBoardTwo();
    window.addEventListener("keydown", KeyPressedTwo, false);
});

localStorage.setItem("x2", 0);
localStorage.setItem("y2", 0);
localStorage.setItem("tick2", 0);
function PaintGameBoardTwo() {
    var canvasTwo = document.getElementById("secondGame");
    var ctxTwo = canvasTwo.getContext("2d");

    var x2 = 0;
    var y2 = 0;

    for (var i = 0; i < 10; i++) {
        if (i % 2 == 0) y2 = 0;
        else y2 = 35;
        for (var j = 0; j < 20; j++) {
            ctxTwo.fillStyle = "#f0f0f0";
            ctxTwo.fillRect(x2, y2, 35, 35);
            y2 += 70;
        }
        x2 += 35;
    }
}

function PaintSymbolTwo(x2, y2, rotation2) {
    var canvasTwo = document.getElementById("secondGame");
    var ctxTwo = canvasTwo.getContext("2d");

    if (rotation2 == 1) {
        ctxTwo.translate(x2, y2);
        ctxTwo.rotate((Math.PI / 180) * 270);
        ctxTwo.translate(-x2, -y2 - 35);
    }

    ctxTwo.clearRect(0, 0, canvasTwo.clientWidth, canvasTwo.height);
    PaintGameBoardTwo();
    ctxTwo.beginPath();  // T-block 
    ctxTwo.moveTo(x2, y2);
    ctxTwo.lineTo(x2 + 105, y2);
    ctxTwo.lineTo(x2 + 105, y2 + 35);
    ctxTwo.lineTo(x2 + 70, y2 + 35);
    ctxTwo.lineTo(x2 + 70, y2 + 70);
    ctxTwo.lineTo(x2 + 35, y2 + 70);
    ctxTwo.lineTo(x2 + 35, y2 + 35);
    ctxTwo.lineTo(x2, y2 + 35);
    ctxTwo.closePath();
    ctxTwo.fillStyle = "red";

    ctxTwo.fill();

}


function UpdateGameBoardTwo() {

    var x2 = Number(localStorage.getItem("x2"));
    var y2 = localStorage.getItem("y2");
    var tick2 = localStorage.getItem("tick2");
    y2 = tick2 * 35;
    PaintSymbolTwo(x2, y2)

    tick2++;
    localStorage.setItem("y2", y2);
    localStorage.setItem("tick2", tick2);
}

function Reset() {
    localStorage.clear();
}
function PlayTwo(stop2) {
    var refreshintervalIDTwo = setInterval(function () {
        $("#counterTwo").text(localStorage.getItem("tick2"));
        UpdateGameBoardTwo();

    }, 750);
    if (stop2 == 1) {
        clearInterval(refreshintervalIDTwo);
        localStorage.clear();
    }
}



function KeyPressedTwo(e2) {
    var keyCode = e2.keyCode;
    console.log(keyCode);
    if (keyCode == 65) {      // A key
        MoveTwo(65);
    }
    else if (keyCode == 87) {     // W key
        MoveTwo(87);
    }
    else if (keyCode == 68) {     // D key
        MoveTwo(68);
    }
    else if (keyCode == 83) {     // S key
        MoveTwo(83);
    }
};
function MoveTwo(direction) {
    var x2 = Number(localStorage.getItem("x2"));
    var y2 = Number(localStorage.getItem("y2"));
    if (direction == 68) {       // Move Right
        x2 = x2 + 35;
        localStorage.setItem("x2", x2);
        PaintSymbolTwo(x2, y2);
    }
    else if (direction == 65) {       // Move Left
        x2 = x2 - 35;
        localStorage.setItem("x2", x2);
        PaintSymbolTwo(x2, y2);
    }
    // else if (direction == 37) {       // Move Left
    //     x2 = x2 - 35;
    //     localStorage.setItem("x2", x2);
    //     PaintSymbolTwo(x2, y2);
    // }
    else if (direction == 83) {       // Rotate counter clockwise


        PaintSymbolTwO(x2, y2, 1);
    }
}