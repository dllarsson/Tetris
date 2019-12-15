$(document).ready(function(){
    window.addEventListener("keydown", KeyPressed, false);
    document.getElementById("leftArrow").addEventListener("touchstart", leftMove, false);
    document.getElementById("rightArrow").addEventListener("touchstart", rightMove, false);
    document.getElementById("rotationArrow").addEventListener("touchstart", rotationMove, false);

    
});



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

function PaintSymbol(x, y, rotation){
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");
    
    if (rotation == 1){
       ctx.translate(x, y);
       ctx.rotate((Math.PI / 180) * 270);
       ctx.translate(-x , -y -35);
    }

    ctx.clearRect(0,0, canvas.clientWidth, canvas.height);
    PaintGameBoard();
    ctx.beginPath();  // T-block 
    ctx.moveTo(x, y);
    ctx.lineTo(x + 105, y);
    ctx.lineTo(x + 105, y + 35);
    ctx.lineTo(x + 70, y + 35);
    ctx.lineTo(x + 70, y + 70);
    ctx.lineTo(x + 35, y + 70);
    ctx.lineTo(x + 35, y + 35);
    ctx.lineTo(x, y + 35);
    ctx.closePath();
    ctx.fillStyle = "red";

    ctx.fill();
    
}


function UpdateGameBoard(){
    
    var x = Number(localStorage.getItem("x"));
    var y = localStorage.getItem("y");
    var tick = localStorage.getItem("tick");
    y = tick * 35;
    PaintSymbol(x,y)
    
    tick++;
    localStorage.setItem("y", y);
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
        localStorage.clear();
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
function leftMove(){
    var x = Number(localStorage.getItem("x"));
    var y = Number(localStorage.getItem("y"));
    x = x - 35;
        localStorage.setItem("x", x);
        PaintSymbol(x, y);
};
function rightMove(){
    var x = Number(localStorage.getItem("x"));
    var y = Number(localStorage.getItem("y"));
    x = x + 35;
        localStorage.setItem("x", x);
        PaintSymbol(x, y);
};
function rotationMove(){
    var x = Number(localStorage.getItem("x"));
    var y = Number(localStorage.getItem("y"));
    PaintSymbol(x, y, 1);
}

