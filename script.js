localStorage.setItem("x", 0);
localStorage.setItem("y", 0);
localStorage.setItem("tick", 0);
var counter = 0;
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

function PaintSymbol(x,y){
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");
    
    // ctx.translate(x, y);
    // ctx.rotate((Math.PI / 180) * 90);
    // ctx.translate(-x , -y -35);
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
    
    var x = localStorage.getItem("x");
    var y = localStorage.getItem("y");
    var tick = localStorage.getItem("tick");
    y = tick * 35;
    PaintSymbol(x,y)
    
    tick++;
    localStorage.setItem("x", x);
    localStorage.setItem("y", y);
    localStorage.setItem("tick", tick);
}


function Play(){

    setInterval(function(){ 
        counter++;
        document.getElementById("counter").textContent = counter;
        UpdateGameBoard();
        
    }, 1000);
}
PaintGameBoard();
Play();
