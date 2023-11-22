// This is an array that will store an object for each card created. Each card will have an object that corresponds to the card's id.
let cardData = [];
// This variable contains the order that the cards will be placed on screen. The position that cards get put into the array is randomized.
let cardOrder = [];
// This variable holds all of the matches that will be assigned to the cards.
let cardsPicked = [];

// Maximum of 104, number must be even (Obviously).
let numberOfCards = 0;
// This value acts as a score for when the game ends. The lower the number of clicks, the better.
let clickCount = 0;
// This will become true when two cards are clicked, a timer will start that prevents other cards from being clicked while the two clicked cards are briefly revealed and then hidden.
let noClick = false;
// This declares the timer that will count up when the game starts.
var timer;
// Stores the number of seconds for the timer interval.
var seconds = 0;
// Stores a boolean for checking whether or not the game has started.
var timerStarted = false;
// Acts as a toggle switch for opening the leaderboard.
var leaderboardT = true;
// Holds the user selected card image.
var cardImage;
// Stores the user settings from local storage.
var obj = {};


// This event listener function will run some code when all of the HTML elements have loaded.
window.addEventListener("load", () => {
    obj = JSON.parse(localStorage.getItem("Settings"));
    document.getElementById("RestartGui").style.display = "none";
    document.getElementById("StartGame").addEventListener("click", () => {
        numberOfCards = Number(document.getElementById("cardNumber").value);
        // Checks to make sure that the number of cards is less than 104. There are only 52 cards in a deck so therefore, there can only be 52 matches or 104 cards.
        if(numberOfCards > 104) {
            numberOfCards = 104;
            document.getElementById("cardNumber").value = 104;
            alert("Number of cards must be 104 or less");
        }
        // Checks to make sure that the number of cards are even.
        else if(numberOfCards % 2 !== 0) {
            alert("Number of cards must be even");
        }
        else {
            document.getElementById("StartGui").hidden = true;
            document.getElementById("Leaderboard").hidden = true;
            for(let i = 0; i < numberOfCards; i++) {
                var number = Math.floor(Math.random() * numberOfCards);
                if(cardOrder.filter(element => element === number).length !== 0) {
                    i--;
                    continue;
                }
                else {
                    cardOrder.push(number);
            
                }   
            }
            
            createCards(numberOfCards);
            setCards();
            document.querySelectorAll(".Card").forEach((div) => {
                div.addEventListener("click", clickCard);
            });
            document.getElementById("NumContainer").hidden = false;
        }
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
    document.getElementById("RestartGame").addEventListener("click", () => {
        location.reload();
    });
    loadLeaderboard();
});

function startTimer() {
    timer = setInterval(()=> {
        seconds = Math.round((seconds + 0.1) * 10) / 10;
        if((Math.round(seconds * 10) / 10) % 1 == 0){
            document.getElementById("timer").innerText = seconds;
        }
    }, 100);
}

function playSound(cond) {
    if(cond === "Flip") {
        document.getElementById("CardFlip").load();
        document.getElementById("CardFlip").play();
    }
    if(cond === "Win") {
        document.getElementById("WinGame").load();
        document.getElementById("WinGame").play();
    }
}

function createCards(numCards) {
    for(var i = 0; i < numCards; i++) {
        if(cardData[i] === undefined) {
            if(i < numberOfCards / 2) {
                var cardName = createCardType();
            }
            else {
                var cardName = cardsPicked[i - numberOfCards / 2];
            }
            
            cardData[i] = {
                cardFileName : `../images/Cards/${cardName}.svg`,
                cardName : cardName ,
                revealed : false,
                cardNumber : i,
                exists : true,
            }
        }
    }
}

function setCards() {
    document.querySelectorAll(".Card").forEach((div) => {
        div.remove();
    });
    document.querySelectorAll(".CardHidden").forEach((div) => {
        div.remove();
    });
    for(var i = 0; i < numberOfCards; i++) {
        let data = cardData[cardOrder[i]];
        if(data.exists === true) {
            let card = document.createElement("div");
            card.className = "Card";
            card.id = "c" + cardOrder[i];
            let img = document.createElement("img");
            if(data.revealed === false) {
                var file;
                switch(obj.card) {
                    case "1":
                        file = "../images/Cards/card_back1.svg";
                    break;
                    case "2":
                        file = "../images/Cards/card_back2.svg";
                    break;
                    case "3":
                        file = "../images/Cards/card_back3.svg";
                    break;
                    case "4":
                        file = "../images/Cards/card_back4.svg";
                    break;
                    default:
                        file = "../images/Cards/card_back1.svg";
                    break;
                }
                img.className = "CardImg";
            }
            else {
                var file = data.cardFileName;
                img.className = "";
            }
            img.src = file;
            card.appendChild(img);
            document.getElementById("CardContainer").appendChild(card);
        }
        else {
            let card = document.createElement("div");
            card.className = "CardHidden";
            card.id = "c" + cardOrder[i];
            // var file = "../images/Cards/card_back1.svg";
            var file = data.cardFileName;
            let img = document.createElement("img");
            img.src = file;
            img.className = "";
            card.appendChild(img);
            document.getElementById("CardContainer").appendChild(card);
        }
    }
    document.querySelectorAll(".Card").forEach((div) => {
        div.addEventListener("click", clickCard);
    });
    checkWin();
}

function clickCard(event) {
    if(timerStarted === false) {
        startTimer();
        timerStarted = true;
    }
    if(noClick === false) {
        let div = event.currentTarget;
        let cardNum = div.id.substring(1);
        if(cardData[cardNum].revealed === false) {
            playSound("Flip");
            clickCount++;
            document.getElementById("score").innerText = clickCount;
            cardData[cardNum].revealed = true;
            setCards();
            checkMatch();
        }
    }
}

function createCardType() {
    while(true) {
        var suitArr = ["clubs", "diamonds", "hearts", "spades"];
        var cardSuitNumber = Math.floor(Math.random() * 4);
        var cardNumber = Math.floor(Math.random() * 13 + 1);
        var name = suitArr[cardSuitNumber] + "_" + cardNumber;
        if(cardsPicked.filter(element => element === name).length === 0) {
            cardsPicked.push(name);
            return name;
        }
        else {
            continue;
        }
    }
}

function checkWin() {
    if(cardData.filter(element => element.exists === false).length === numberOfCards) { 
        clearInterval(timer);
        playSound("Win");
        document.getElementById("NumContainer").hidden = true;
        document.getElementById("RestartGui").style.display = "block";
        document.getElementById("Leaderboard").hidden = false;
        document.getElementById("seconds").innerText = `Total time: ${Math.round(seconds * 100) / 100} seconds.`;
        document.getElementById("clicks").innerText = `Total clicks: ${clickCount} clicks.`;
        document.getElementById("cardCount").innerText = `Total cards: ${numberOfCards} cards.`;
        document.getElementById("RestartGui").scrollIntoView();
        // let buttonContainer = document.createElement("div");
        // let button = document.createElement("button");
        // let h2 = document.createElement("h2");
        // h2.innerText = "You Won\nYou clicked " + clickCount + " Times.";
        // button.innerText = "Click to Replay";
        // button.onclick = function() {
        //     location.reload();
        // }
        // buttonContainer.className = "Replay";
        // buttonContainer.appendChild(h2);
        // buttonContainer.appendChild(button);

        // document.getElementById("CardContainer").appendChild(buttonContainer); 
    }
}

function checkMatch() {
    if(cardData.length > 0) {
        var buffer = [];
        cardData.forEach((value, index) => {
            if(value.revealed === true) {
                buffer.push(index);
            }
        });
        
        if(buffer.length === 2) {
            noClick = true;
            setTimeout(() => {
                var card1 = cardData[buffer[0]];
                var card2 = cardData[buffer[1]];
                if(card1.cardName === card2.cardName) {
                    card1.exists = false;
                    card2.exists = false;
                }
                card1.revealed = false;
                card2.revealed = false;
                
                noClick = false;
                setCards();
                // checkMatch();
            }, 800);
        }
    }
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
            cards : numberOfCards,
            clicks : clickCount,
        }
        if(localStorage.getItem("MemoryMatcher") !== null) {
            arr = JSON.parse(localStorage.getItem("MemoryMatcher"));
        }
        arr.push(stats);
            localStorage.setItem("MemoryMatcher", JSON.stringify(arr));

        location.reload();
    }
    else {
        alert("Please Enter a Valid Name.");
    }
}

function loadLeaderboard() {
    let userArr = []
    if(localStorage.getItem("MemoryMatcher") !== null) { 
        userArr = JSON.parse(localStorage.getItem("MemoryMatcher"));
    }

    userArr.sort((a, b) => {
        var sort = b.cards - a.cards;
        if(sort === 0) {
            sort = a.clicks - b.clicks;
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
            h3.innerHTML = (index + 1) + ". "  + elem.username + ": " + elem.cards + " Cards, " + elem.clicks + " clicks";
            document.getElementById("Scores").appendChild(h3);
        });
    }
}
