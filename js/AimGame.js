// var c = document.getElementById("myCanvas");
// var ctx = c.getContext("2d");
// c.width = 800;
// c.height = 400;
// ctx.beginPath();

// var x = Math.floor(Math.random() * (c.width - 100));
// var y = Math.floor(Math.random() * (c.height - 100));


// ctx.rect(x, y, 100, 100);
// ctx.stroke();


// function canvasClick(e) {
//     console.log(e);
//     console.log("Click: " + e.x, e.y);
//     console.log("Square: " + x, y);
// }

var score = 0;
var seconds = 20;
var Counter = 0;
var timerStarted = false;
var containerWidth;
var containerHeight;
var shapeWidth;
var shapeHeight;

window.addEventListener("load", () => {
    document.getElementById("Target").addEventListener("mousedown", setPosition);
    document.getElementById("Target").addEventListener("mousedown", clickTarget);
    document.getElementById("Target").addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });
    document.getElementById("Container").addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });
    document.getElementById("timer").innerText = seconds;
    document.getElementById("timer").hidden = false;
    document.getElementById("score").hidden = false;
    setPosition();
});


function setPosition() {
    containerWidth = document.getElementById("Container").clientWidth;
    containerHeight = document.getElementById("Container").clientHeight;
    shapeWidth = containerWidth / 10;
    shapeHeight = containerWidth / 10;
    document.getElementById("Target").style.width = shapeWidth + "px";
    document.getElementById("Target").style.height = shapeHeight + "px";
    var x = Math.floor(Math.random() * (containerWidth - shapeWidth));
    var y = Math.floor(Math.random() * (containerHeight - shapeHeight));
    document.getElementById("Target").style.left= x + "px";
    document.getElementById("Target").style.top= y + "px";
    Counter++;
    console.log(Counter);
}

function clickTarget() {
    if(timerStarted === false) {
        startTimer();
        timerStarted = true;
    }
    if(seconds > 0) {
        score++;
        document.getElementById("score").innerText = score;
    }
}

function startTimer() {
    timer = setInterval(()=> {
        seconds = Math.round((seconds - 0.1) * 10) / 10;
        if((Math.round(seconds * 10) / 10) % 1 == 0){
            document.getElementById("timer").innerText = seconds;
        }
        if(seconds <= 0) {
            clearInterval(timer);
        }
    }, 100);
}