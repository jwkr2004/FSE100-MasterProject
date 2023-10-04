var timer;
var counter = 0;
var seconds = 0;
// var correctWord = false;
var sampleParagraph = "Twenty-five hours had passed since \"the incident\". It seemed to be a lot longer than that."
var sampleParagraph1 = "Twenty-five hours had passed since \"the incident\". It seemed to be a lot longer than that. That twenty-five hours seemed more like a week in her mind. The fact that she still was having trouble comprehending exactly what took place wasn't helping the matter. She thought if she could just get a little rest the entire incident might make a little more sense.";
var sampleParagraph2 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin purus tellus, auctor vitae augue a, pulvinar fermentum eros. Suspendisse quis laoreet eros, non facilisis enim. Nullam in posuere eros. Ut hendrerit, lectus nec congue mollis, lectus augue maximus mi, sit amet convallis nunc dolor dapibus enim. Fusce dictum suscipit ullamcorper. Nam vel velit ut tellus vulputate tristique sit amet ut eros. Suspendisse eget sodales dui, quis pretium magna. Curabitur sagittis libero sit amet ex euismod, ac venenatis nisl convallis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse nisl eros, tempor id urna vel, gravida maximus elit. Duis bibendum, nisl sit amet posuere congue, lacus risus lobortis ante, vitae sollicitudin nulla quam ac dolor. Proin eget fringilla ligula, sit amet pretium felis. Quisque maximus non neque ut auctor. Nulla vel rutrum leo. Mauris at consectetur massa. Vivamus id dui urna.";


var array = sampleParagraph.split(" ");
array.forEach((elem, index) => {
    array[index] += " ";
});

// console.log(array);

window.addEventListener("load", () => {
    document.getElementById("StartGame").addEventListener("click", () => {
        generateParagraph();
        document.getElementById("UserInput").addEventListener("keyup", checkInput);
        document.getElementById("StartGui").hidden = true;
        document.getElementById("UserInput").hidden = false;
        document.getElementById("UserInput").focus();
        startTimer();
    });
    document.getElementById("RestartGame").addEventListener("click", () => {
        location.reload();
    });
});


function generateParagraph() {
    document.getElementById("TextContainer").style.display = "flex";
    // var container = document.createElement("div");
    // container.id= "TextContainer";
    // document.body.appendChild(container);
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
        seconds += 1;
        console.log(seconds);
    }, 1000);
}

function checkInput(event) {
    // console.log(event);
    var inp = document.getElementById("UserInput");
    var docWord = document.getElementById("p" + counter);
    var word = array[counter];
    var inpArray = inp.value.split("");
    var wordArray = word.split("");
    // console.log(inp.value);
    // console.log(word);
    // console.log(wordArray);


    // if(correctWord === true) {
    //     docWord.className = "word greenB";
    //     counter++;
    //     inp.value = "";
    //     nextWord = true;
    //     correctWord = false;
    // }


    // if(inp.value.length >= word.length) {
    //     if(inp.value === word) {
    //         inp.value = ""; 
    //         docWord.className = "word greenB";
    //         counter++;
            
    //     }
    //     else {
    //         inp.className = "UserInput redB";
    //         docWord.className = "word redB";
    //     }
    // }
    // else {
    //     inp.className = "UserInput";
    //     docWord.className = "word"; 
    // }


    
    let inaccuracy = 0;
    for(let i = 0; i < inp.value.length; i++) {
        if(inpArray[i] !== wordArray[i]) {
            inaccuracy++;
        }
    }
    if(inaccuracy > 0) {
        inp.className = "UserInput redB";
        docWord.className = "word redB";
    }
    else {
        if(inp.value === word) {
            inp.value = ""; 
            inp.className = "UserInput";
            docWord.className = "word greenB";
            counter++;
        }
        else if(inp.value === word.trim()) {
            inp.className = "UserInput greenB";
            docWord.className = "word greenB";
            if(counter + 2 > array.length) {
                inp.value = ""; 
                inp.className = "UserInput";
                inp.hidden = true;
                docWord.className = "word greenB";

                document.getElementById("RestartGui").hidden = false;
                document.getElementById("words").innerText = `There were: ${array.length} words.`;
                document.getElementById("seconds").innerText = `It took you: ${seconds} seconds.`;
                document.getElementById("wpm").innerText = `You typed at around: ${Math.round(array.length / (seconds / 60))} wpm.`;

                clearInterval(timer);
            }
        }
        else if(inaccuracy === 0 && inp.value.length < word.length && inp.value.length > 0) {
            inp.className = "UserInput";
            docWord.className = "word";
            // docWord.className = "word greenB";
        }
        else {
            inp.className = "UserInput";
            docWord.className = "word"; 
        }
    }
}