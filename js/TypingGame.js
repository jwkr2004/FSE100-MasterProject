var timer;

var seconds = 0;
var numberOfWords = 0;
var array = [];
var paragraph = "";
var started = false;

var wpm = 0;

var Icounter = 0;
var Ccounter = 0;

var incorrect = false;
var correct = false;

var gameOver = false;

import wordList from '../json/words.json' assert { type: 'json' };

window.addEventListener("load", () => {
    document.getElementById("StartGame").addEventListener("click", () => {
        numberOfWords = Number(document.getElementById("wordNumber").value);
        if(numberOfWords > 0) {
            generateParagraph();
            document.getElementById("UserInput").addEventListener("keyup", checkInput);
            document.getElementById("StartGui").hidden = true;
            document.getElementById("Leaderboard").hidden = true;
            document.getElementById("UserInput").hidden = false;
            document.getElementById("timer").hidden = false;
            document.getElementById("timer").hidden = false;
            document.getElementById("score").hidden = false;
            document.querySelectorAll(".text").forEach((element) => {
                element.hidden = false;
            });
            document.getElementById("UserInput").focus();
            // startTimer();   
            document.getElementById("RestartGame").addEventListener("click", () => {
                location.reload();
            });
        }
        else {
            alert("Please enter a valid number of words.")
        }
        
    });
    document.getElementById("AddToBoard").addEventListener("click", addToLeaderboard);
    checkInput();
    loadLeaderboard();
});

function addToLeaderboard() {
    var input = document.getElementById("nameInput").value;
    var stats = {
        username : input,
        wpm : wpm,
    }

    localStorage.setItem("User" + localStorage.length, JSON.stringify(stats));
    location.reload();
}

function loadLeaderboard() {
    let userArr = [];

    for(var i = 0; i < localStorage.length; i++) {
        userArr[i] = JSON.parse(localStorage.getItem("User" + i));
    }

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
            h3.innerText = (index + 1) + ". "  + elem.username + " - " + elem.wpm + " WPM";
            document.getElementById("Scores").appendChild(h3);
        });
    }
}

function playSound(cond) {
    if(cond === "Correct") {
        document.getElementById("audio1").load();
        document.getElementById("audio1").play();
    }
    else if(cond === "Incorrect") {
        document.getElementById("audio2").load();
        document.getElementById("audio2").play();
    }
    else if(cond === "Win" && gameOver === false) {
        document.getElementById("audio3").load();
        document.getElementById("audio3").play();
        gameOver = true;
    }
    // var audio1 = document.getElementById("audio1");
    // var audio2 = document.getElementById("audio2");
    // var audio3 = document.getElementById("audio3");
    // var num = Math.floor(Math.random() * 3);
    // switch(num) {
    //     case 1:
    //         audio1.load();
    //         audio1.play();
    //     break;
    //     case 2:
    //         audio2.load();
    //         audio2.play();
    //     break;
    //     case 3:
    //         audio3.load();
    //         audio3.play();
    //     break;
    // }
    
}


function generateParagraph() {
    document.getElementById("TextContainer").style.display = "flex";
    // var container = document.createElement("div");
    // container.id= "TextContainer";
    // document.body.appendChild(container);
    for(var i = 0; i < numberOfWords; i++) {
        var randomNum = Math.floor(Math.random() * wordList.length);
        if(i < numberOfWords - 1) {
            paragraph += wordList[randomNum] + " ";
        }
        else {
            paragraph += wordList[randomNum]
        }
    }
    array = paragraph.split(" ");
    // array.forEach((elem, index) => {
    //     array[index] += " ";
    // });

    array.forEach((elem, index) => {
        var p = document.createElement("p");
        p.className = "word";
        p.id = "p" + index;
        p.innerText = elem;
        document.getElementById("TextContainer").appendChild(p);
    });
}

function startTimer() {
    timer = setInterval(()=> {
        seconds = Math.round((seconds + 0.1) * 10) / 10;
        if((Math.round(seconds * 10) / 10) % 1 == 0){
            document.getElementById("timer").innerText = seconds;
            wpm = Math.round(array.length / (seconds / 60));
            document.getElementById("score").innerText = wpm;
        }
    }, 100);
}

function checkInput(event) {
    if(started == false && numberOfWords > 0) {
        startTimer(); 
        started = true;
    }
    // var docWord = document.getElementById("p" + counter);
    var inp = document.getElementById("UserInput");
    var inpLength = inp.length;
    var inaccuracy = 0;
    
    
    // var word = array[counter];
    // var wordArray = word.split("");

    var inpArray = inp.value.split(" ");
    
    // console.log(inpArray);
    // console.log(array);

    for(let i = 0; i < array.length; i++) {
        let word = array[i];
        if(inpArray[i] !== undefined) {
            if(inpArray[i].length >= word.length) {
                if(inpArray[i] === word) {
                    document.getElementById("p" + i).className = "word greenC";
                }
                else {
                    document.getElementById("p" + i).className = "word redC";
                    inaccuracy++;
                }
            }
            // else if(inpArray[i].length < word.length) {
            //     document.getElementById("p" + i).className = "word";
            // }
            else{
                let partial = word.substring(0, inpArray[i].length);
                if(partial != inpArray[i]) {
                    document.getElementById("p" + i).className = "word redC";
                    inaccuracy++;
                }
                else {
                    document.getElementById("p" + i).className = "word";
                }
                if(inpArray.length - 1 > i) {
                    document.getElementById("p" + i).className = "word redC";
                    inaccuracy++;
                }
            }
        }
        else {
            document.getElementById("p" + i).className = "word";
        }
        if(inaccuracy === 0 && inpArray.length === array.length) {
            if(inpArray[inpArray.length - 1].trim() == array[array.length - 1]) {
                playSound("Win");
                clearInterval(timer);
                inp.hidden = true;
                document.getElementById("RestartGui").hidden = false;
                document.getElementById("NameEntry").hidden = false;
                document.getElementById("Leaderboard").hidden = false;
                document.getElementById("words").innerText = `There were: ${array.length} words.`;
                document.getElementById("seconds").innerText = `It took you: ${Math.round(seconds * 100) / 100} seconds.`;
                document.getElementById("wpm").innerText = `You typed at: ${wpm} wpm.`;
            }
        }
        if(document.getElementById("p" + i).className == "word") {
            if(inpArray.length - 1 === i) {
                document.getElementById("p" + i).className = "word highlight";
            }
        }
        else if(document.getElementById("p" + i).className == "word redC") {
            if(inpArray.length - 1 === i) {
                document.getElementById("p" + i).className = "word redC highlight";
                if(Icounter < inpArray.length) {
                    Icounter = inpArray.length;
                    // if(inpArray.length != array.length) {
                    //     incorrect = true;
                    // }
                    incorrect = true;
                }
            }
        }
        else if(document.getElementById("p" + i).className == "word greenC") {
            if(inpArray.length - 1 === i) {
                document.getElementById("p" + i).className = "word greenC highlight";
                if(Ccounter < inpArray.length) {
                    Ccounter = inpArray.length;
                    if(inpArray.length != array.length) {
                        correct = true;
                    }
                }
            }
        }
    }
    if(correct === true) {
        console.log("correct" + Ccounter);
        playSound("Correct");
        correct = false;
    }
    if(incorrect === true) {
        console.log("incorrect" + Icounter);
        playSound("Incorrect");
        incorrect = false;
    }
     

    // for(let i = 0; i < inp.value.length; i++) {
    //     if(inpArray[i] !== wordArray[i]) {
    //         console.log(inpArray, wordArray);
    //         inaccuracy++;
    //     }
    // }
    // if(inaccuracy > 0) {
    //     inp.className = "UserInput redB";
    //     docWord.className = "word redB";
    // }
    // else {
    //     if(inp.value === word) {
    //         inp.className = "UserInput";
    //         docWord.className = "word greenB";
    //         counter++;
    //     }
    //     else if(inp.value === word.trim()) {
    //         inp.className = "UserInput greenB";
    //         docWord.className = "word greenB";
    //         if(counter + 2 > array.length) {
    //             inp.value = ""; 
    //             inp.className = "UserInput";
    //             inp.hidden = true;
    //             docWord.className = "word greenB";

    //             document.getElementById("RestartGui").hidden = false;
    //             document.getElementById("words").innerText = `There were: ${array.length} words.`;
    //             document.getElementById("seconds").innerText = `It took you: ${seconds} seconds.`;
    //             document.getElementById("wpm").innerText = `You typed at around: ${Math.round(array.length / (seconds / 60))} wpm.`;

    //             clearInterval(timer);
    //         }
    //     }
    //     else if(inaccuracy === 0 && inp.value.length < word.length && inp.value.length > 0) {
    //         inp.className = "UserInput";
    //         docWord.className = "word";
    //     }
    //     else {
    //         inp.className = "UserInput";
    //         docWord.className = "word"; 
    //     }
    // }
}