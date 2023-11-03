let cardData = [];
let cardOrder = [];
let cardsPicked = [];

// Maximum of 104, number must be even (Obviously)
let numberOfCards = 0;
let clickCount = 0;

let noClick = false;


window.addEventListener("load", () => {
    document.getElementById("StartGame").addEventListener("click", () => {
        numberOfCards = Number(document.getElementById("cardNumber").value);
        if(numberOfCards > 104) {
            numberOfCards = 104;
            document.getElementById("cardNumber").value = 104;
            alert("Number of cards must be 104 or less");
        }
        else if(numberOfCards % 2 !== 0) {
            alert("Number of cards must be even");
        }
        else {
            document.getElementById("StartGui").hidden = true;
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
        }
    });
});

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
            if(data.revealed === false) {
                var file = "../images/Cards/card_back.svg";
            }
            else {
                var file = data.cardFileName;
            }
            let img = document.createElement("img");
            img.src = file;
            card.appendChild(img);
            document.getElementById("CardContainer").appendChild(card);
        }
        else {
            let card = document.createElement("div");
            card.className = "CardHidden";
            card.id = "c" + cardOrder[i];
            var file = "../images/Cards/card_back.svg";
            let img = document.createElement("img");
            img.src = file;
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
    if(noClick === false) {
        let div = event.currentTarget;
        let cardNum = div.id.substring(1);
        if(cardData[cardNum].revealed === false) {
            playSound("Flip")
            clickCount++
            cardData[cardNum].revealed = true
            setCards();
            checkMatch();
        }
        console.log(cardData[cardNum]);
    }
}

function createCardType() {
    while(true) {
        var suitArr = ["clubs", "diamonds", "hearts", "spades"];
        var cardSuitNumber = Math.floor(Math.random() * 4);
        var cardNumber = Math.floor(Math.random() * 13 + 1);
        var name = suitArr[cardSuitNumber] + "_" + cardNumber;
        console.log(name);
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
        playSound("Win");
        let buttonContainer = document.createElement("div");
        let button = document.createElement("button");
        let h2 = document.createElement("h2");
        h2.innerText = "You Won\nYou clicked " + clickCount + " Times.";
        button.innerText = "Click to Replay";
        button.onclick = function() {
            location.reload();
        }
        buttonContainer.className = "Replay";
        buttonContainer.appendChild(h2);
        buttonContainer.appendChild(button);

        document.getElementById("CardContainer").appendChild(buttonContainer); 
        document.getElementById("CardHidden").forEach((value) => {
            value.style.display = "none";
        });       
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
                console.log(buffer);
                if(card1.cardName === card2.cardName) {
                    card1.exists = false;
                    card2.exists = false;
                }
                card1.revealed = false;
                card2.revealed = false;
                
                console.log(buffer);
                noClick = false;
                setCards();
                // checkMatch();
            }, 800);
            console.log(buffer)
        }
    }
}