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

const minSeconds = 5;
const maxSeconds = 60;
var initialTime = 0;

var tpm = 0;
var score = 0;
var seconds = 0;
var totalClicks = 0;
var accuracy = 0;

var timerStarted = false;
var leaderboardT = true;

var containerWidth;
var containerHeight;
var shapeWidth;
var shapeHeight;

var obj = {};

window.addEventListener("load", () => {
    obj = JSON.parse(localStorage.getItem("Settings"));

    let bgImg = document.getElementById("Container");
    switch(obj.bg) {
        case "1":
            bgImg.style.background = 'top/100% url("../images/DesertBackground1.jpg")';
        break;
        case "2":
            bgImg.style.background = 'top/100% url("../images/DesertBackground2.png")';
        break;
        case "3":
            bgImg.style.background = 'top/100% url("../images/DesertBackground3.png")';
        break;
        default:
            bgImg.style.background = 'top/100% url("../images/DesertBackground1.jpg")';
        break;
    }
    
    document.getElementById("RestartGui").style.display = "none";
    document.getElementById("Container").addEventListener("mousedown", () => {
        if(timerStarted === true) {
            totalClicks++;
            updateGraphics();
        }
    });
    document.getElementById("RestartGame").addEventListener("click", () => {
        location.reload();
    });
    document.getElementById("Target").addEventListener("mousedown", setPosition);
    document.getElementById("Target").addEventListener("mousedown", clickTarget);
    document.getElementById("StartGame").addEventListener("click", startGame);
    document.getElementById("Target").addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });
    document.getElementById("Container").addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });
    document.getElementById("AddToBoard").addEventListener("click", addToLeaderboard);
    document.getElementById("Leaderboard").addEventListener("click", leaderboardToggle);
    document.getElementById("EnterName").addEventListener("click", () => {
        document.getElementById("RestartGui").style.display = "none";
        document.getElementById("NameEntry").style.display = "block";
    });
    document.getElementById("ReturnButton").addEventListener("click", () => {
        document.getElementById("RestartGui").style.display = "block";
        document.getElementById("NameEntry").style.display = "none";
    });
    document.getElementById("NumContainer").hidden = false;
    loadLeaderboard();
});

function startGame() {
    seconds = document.getElementById("seconds").value;
    if(seconds < minSeconds) {
        alert("There Must be at Least " + minSeconds + " Seconds.");
        document.getElementById("timer").innerText = 5;
    }
    else if(seconds > maxSeconds) {
        alert("There Cannot be More Than " + maxSeconds + " Seconds.");
        document.getElementById("timer").innerText = 60;
    }
    else {
        initialTime = seconds;
        document.getElementById("timer").innerText = seconds;
        document.getElementById("Container").style.display = "block";
        document.getElementById("NumContainer").style.display = "block";
        document.getElementById("StartGui").style.display = "none";
        document.getElementById("Leaderboard").style.display = "none";
        setPosition();
    }
}


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
}

function clickTarget() {
    if(timerStarted === false) {
        startTimer();
        timerStarted = true;
    }
    if(seconds > 0) {
        score++;
    }
}

function startTimer() {
    timer = setInterval(()=> {
        seconds = Math.round((seconds - 0.1) * 10) / 10;
        if((Math.round(seconds * 10) / 10) % 1 == 0){
            document.getElementById("timer").innerText = seconds;
        }
        updateGraphics();
        if(seconds <= 0) {
            clearInterval(timer);
            tpm = Math.round(score / (initialTime / 60));
            endGame();
        }
    }, 100);
}

function endGame() {
    document.getElementById("WinGame").load();
    document.getElementById("WinGame").play();
    document.getElementById("Container").style.display = "none";
    document.getElementById("NumContainer").style.display = "none";
    document.getElementById("RestartGui").style.display = "block";
    document.getElementById("Leaderboard").style.display = "block";
    document.getElementById("Seconds").innerText = "Total Seconds: " + initialTime;
    document.getElementById("TargetsHit").innerText = "Targets Hit: " + score;
    document.getElementById("TargetsMissed").innerText = "Targets Missed: " + String(totalClicks - score);
    document.getElementById("Accuracy").innerText = "Accuracy: " + Math.round(accuracy * 100) + "%";
}

function updateGraphics() {
    if(score < 1 || totalClicks < 1) {
        accuracy = 1;
    }
    else {
        accuracy = score / totalClicks;
    }

    document.getElementById("score").innerText = score;
    document.getElementById("accuracy").innerText = Math.round(accuracy * 100) + "%";
}

function leaderboardToggle() {
    var leaderboard = document.getElementById("Leaderboard");
    var scores = document.getElementById("Scores");
    var LeaderboardH2 = document.getElementById("LeaderboardTitle");
    if(leaderboardT === true) {
        leaderboard.style.width="750px";
        leaderboard.style.borderBottomRightRadius = "12px";
        leaderboard.style.borderBottomLeftRadius = "12px";
        scores.style.display="block";
        LeaderboardH2.style.borderBottom="2px solid white";
        leaderboardT = false;
    }
    else {
        leaderboard.style = ""
        leaderboard.style.width="200px";
        scores.style.display="none";
        LeaderboardH2.style.borderBottom="0px solid white";
        leaderboardT = true;
    }
}

function addToLeaderboard() {
    var input = document.getElementById("nameInput").value;
    if(input.trim().length > 0) {
        var arr = [];
        var stats = {
            username : input,
            tpm : tpm,
            acc : Math.round(accuracy * 100) / 100,
        }
        if(localStorage.getItem("BigIron") !== null) {
            arr = JSON.parse(localStorage.getItem("BigIron"));
        }
        arr.push(stats);
            localStorage.setItem("BigIron", JSON.stringify(arr));

        location.reload();
    }
    else {
        alert("Please Enter a Valid Name.");
    }
}

function loadLeaderboard() {
    let userArr = []
    if(localStorage.getItem("BigIron") !== null) { 
        userArr = JSON.parse(localStorage.getItem("BigIron"));
    }

    userArr.sort((a, b) => {
        var sort = b.tpm - a.tpm;
        if(sort === 0) {
            sort = b.acc - a.acc;
        }
        return sort;
    });

    if(userArr.length < 1) {
        var h3 = document.createElement("h3");
        h3.id = "Empty";
        h3.innerText = "The Leaderboard is Currently Empty.";
        document.getElementById("Scores").appendChild(h3);
    }
     
    else {
        userArr.forEach((elem, index) => {
            var h3 = document.createElement("h3");
            h3.className = "user";
            h3.id = "u" + index;
            h3.innerHTML = "<b>" + (index + 1) + ". "  + elem.username + ": </b>" + elem.tpm + " TPM, " + elem.acc * 100 + "% Accuracy";
            document.getElementById("Scores").appendChild(h3);
        });
    }
}