console.log("Roll 'em!");

// grab the HTML elements
const rollButton = document.querySelector("#roll-btn");
const die1 = document.querySelector("#die1");
const die2 = document.querySelector("#die2");
let doublesCount = 0;
let rollsSinceDoubles = 0;

// roll button event listener
rollButton.addEventListener("click", function(){
    // grab the dice-container
    const diceContainer = document.querySelector(".dice-container");

    const die1Status = die1.parentElement.dataset.status;
    const die2Status = die2.parentElement.dataset.status;

    //get a random number between 1 and 6
    // only roll the dice if the stats is roll
    //const face1 = Math.floor(Math.random() * 6) + 1
    //const face2 = Math.floor(Math.random() * 6) + 1
    const face1 = die1Status === "roll" ?
    Math.floor(Math.random() * 6) + 1:
    Number(die1.parentElement.dataset.face);
    const face2 = die1Status === "roll" ?
    Math.floor(Math.random() * 6) + 1:
    Number(die2.parentElement.dataset.face);
   
    const isDoubles = face1 === face2
    // use the faces to set the dice icons
    die1.className = `bi bi-dice-${face1}`;
    die1.parentElement.dataset.face = face1;
    die2.className = `bi bi-dice-${face2}`;
    die2.parentElement.dataset.face = face2;

    // simulate the rolling
    if(die1.parentElement.dataset.status === "roll"){
        die1.parentElement.classList.add('rolling');
    }
    if(die2.parentElement.dataset.status === "roll"){
        die2.parentElement.classList.add('rolling');
    }
   
    //check for doubles
    face1 === face2 ?
    diceContainer.classList.add('doubles') :
    diceContainer.classList.remove('doubles');

    if(isDoubles){
        doublesCount += 1; //add 1 to the doublesCount
        rollsSinceDoubles = 0; //reset the rolls since doubles
    } else{
        rollsSinceDoubles += 1;
    }

    // add the data to the stats div
    document.querySelector("#doubles-count").innerText = doublesCount;
    document.querySelector("#roll-count").innerText = rollsSinceDoubles;

    // check to see which die is larger (compare the faces)
    //add the max class to the die with the larger face and
    // remove the max class from the die with the smaller face
    // if the die are the same add the max class to both.
    if(face1 > face2){
        die1.parentElement.classList.add('max');
        die2.parentElement.classList.remove('max');
        // die1.parentElement.dataset.status = "hold";
        // die2.parentElement.dataset.status = "roll";
    } else if(face2 > face1){
        die1.parentElement.classList.remove('max');
        die2.parentElement.classList.add('max');
        // die2.parentElement.dataset.status = "hold";
        // die1.parentElement.dataset.status = "roll";
    } else{
        die1.parentElement.classList.add('max');
        die2.parentElement.classList.add('max');
        // die2.parentElement.dataset.status = "hold";
        // die1.parentElement.dataset.status = "hold";
    }

    // undo the rolling
    setTimeout(function(){
        die1.parentElement.classList.remove('rolling')
        die2.parentElement.classList.remove('rolling')
    }, 300);
}); //end of roll button listener



window.prompt("WHAT?!");



if(die1.parentElement.dataset.sttaus === "hold" && die2.parentElement.dataset.sttaus === "hold"){
    resetDice();
    // create an HTML element and add it to our page
    const resetBtn = document.createElement("button");
    resetBtn.innerText = "Reset";
    resetBtn.id = "reset.btn";
    console.log(resetBtn);

    document.body.append(resetBtn); // adds the button to the HTML page at the end

    resetBtn.addEventListener("click", resetDice)

    rollButton.style.display = "none"
    //resetDice();
}


function resetDice(){
    die1.parentElement.dataset.status = "roll"
    die2.parentElement.dataset.status = "roll"
    die1.classList.remove("max");
    die2.classList.remove("max");
    document.querySelector (".dice-container").classList.remove("doubles");
    


}// end of resetDice
