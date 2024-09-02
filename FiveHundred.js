let players = ["player","opponent2","teammate","opponent1"]
let redTeam = ["opponent2", "opponent1"]
let blueTeam = ["player","teammate"]
let tricksWon = {
    redTeam:0,
    blueTeam:0
}
let scores = {
    redTeam:0,
    blueTeam:0
}
let trumps;
let leftBower = { // once suit is set, convert to new card
    "Clubs":"J-S",
    "Spades":"J-C",
    "Diamonds":"J-H",
    "Hearts":"J-D"
}
let suitConversion = { // once suit is set, convert to new card
    "C":"S",
    "S":"C",
    "D":"H",
    "H":"D"
}

let suitWeight = {
    "C":0,
    "S":1,
    "D":2,
    "H":3
}
let orderedDecks = {
    undefined:[ '4-C', '5-C', '6-C', '7-C', '8-C', '9-C', '10-C', 'J-C', 'Q-C', 'K-C', 'A-C', '4-D', '5-D', '6-D', '7-D', '8-D', '9-D', '10-D', 'J-D', 'Q-D', 'K-D', 'A-D', '4-H', '5-H', '6-H', '7-H', '8-H', '9-H', '10-H', 'J-H', 'Q-H', 'K-H', 'A-H', '6-S', '7-S', '8-S', '9-S', '10-S', 'J-S', 'Q-S', 'K-S', 'A-S', 'JOKER-N'],
    "H":[ '4-C', '5-C', '6-C', '7-C', '8-C', '9-C', '10-C', 'J-C', 'Q-C', 'K-C', 'A-C', '4-D', '5-D', '6-D', '7-D', '8-D', '9-D', '10-D', 'Q-D', 'K-D', 'A-D', '6-S', '7-S', '8-S', '9-S', '10-S', 'J-S', 'Q-S', 'K-S', 'A-S', '4-H', '5-H', '6-H', '7-H', '8-H', '9-H', '10-H', 'Q-H', 'K-H', 'A-H', 'J-D', 'J-H', 'JOKER-N'],
    "D":[ '4-C', '5-C', '6-C', '7-C', '8-C', '9-C', '10-C', 'J-C', 'Q-C', 'K-C', 'A-C', '4-H', '5-H', '6-H', '7-H', '8-H', '9-H', '10-H', 'Q-H', 'K-H', 'A-H', '6-S', '7-S', '8-S', '9-S', '10-S', 'J-S', 'Q-S', 'K-S', 'A-S', '4-D', '5-D', '6-D', '7-D', '8-D', '9-D', '10-D', 'Q-D', 'K-D', 'A-D', 'J-H', 'J-D', 'JOKER-N'],
    "S":[ '4-C', '5-C', '6-C', '7-C', '8-C', '9-C', '10-C', 'Q-C', 'K-C', 'A-C', '4-D', '5-D', '6-D', '7-D', '8-D', '9-D', '10-D', 'J-D', 'Q-D', 'K-D', 'A-D', '4-H', '5-H', '6-H', '7-H', '8-H', '9-H', '10-H', 'J-H', 'Q-H', 'K-H', 'A-H', '6-S', '7-S', '8-S', '9-S', '10-S', 'Q-S', 'K-S', 'A-S', 'J-C', 'J-S', 'JOKER-N'],
    "C":[ '4-D', '5-D', '6-D', '7-D', '8-D', '9-D', '10-D', 'J-D', 'Q-D', 'K-D', 'A-D', '4-H', '5-H', '6-H', '7-H', '8-H', '9-H', '10-H', 'J-H', 'Q-H', 'K-H', 'A-H', '6-S', '7-S', '8-S', '9-S', '10-S', 'Q-S', 'K-S', 'A-S', '4-C', '5-C', '6-C', '7-C', '8-C', '9-C', '10-C', 'Q-C', 'K-C', 'A-C', 'J-S', 'J-C', 'JOKER-N']

}

let trumpBower = leftBower[trumps]
// for each hand update hashtable with new scores, if of suit 1,15, if trump +value, if bower add value, if not of suit 0 
let hidden;
let deck;
let selectedCard;
let selectedBid;
let betSize = {
    '6-Clubs':60,
    '6-Spades':70,
    '6-Diamonds':80,
    '6-Hearts':90,
    '6-No Trumps':100,
    '7-Clubs':160,
    '7-Spades':170,
    '7-Diamonds':180,
    '7-Hearts':190,
    '7-No Trumps':200,
    '8-Clubs':260,
    '8-Spades':270,
    '8-Diamonds':280,
    '8-Hearts':290,
    '8-No Trumps':300,
    '9-Clubs':360,
    '9-Spades':370,
    '9-Diamonds':380,
    '9-Hearts':390,
    '9-No Trumps':400,
    '10-Clubs':460,
    '10-Spades':470,
    '10-Diamonds':480,
    '10-Hearts':490,
    '10-No Trumps':500,
    //"mozea":250,
    //"open-mozea":400
}
bid = {};
players.forEach(key => {
    bid[key] = null; // set a hashtable for each player with variable set to null, to store players bid each game
});
let winningBid;

trick = {};
players.forEach(key => {
    trick[key] = null; // set a hashtable for each player with variable set to null, to store players play each trick
});
playersHands = {};
players.forEach(key => {
    playersHands[key] = []; // set a hashtable for each player with variable set to null, to store players play each trick
});

window.onload = function() {
    main()
    openRules()
}


function buildDeck() {
    let values = ["A", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];
    ////console.log(deck +" Start")
    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
        }
    }
    // add JOKER-N
    deck.push("JOKER-N")

    let index = deck.indexOf('4-S');
    let index2 = deck.indexOf('4-C');
    // Remove 'banana' if it exists in the array
    if (index > -1) {
        deck.splice(index, 1);
    }
    if (index2 > -1) {
        deck.splice(index, 1);
    }
    ////console.log(deck +" after no 4 blacks")

    console.log(deck);
}


function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    // ////console.log(deck);
}


function cardValue(card) {
    let data = card.split("-"); // "4-C" -> ["4", "C"]
    let value = data[0];
    let suit = data[1]

    if (isNaN(value)) { //A J Q K
        if (value == "JOKER-N") {
            value = 1000;
        }
        if (value == "A") {
            value = 14;
        }
        if (value == "K") {
            value = 13;
        }
        if (value == "Q") {
            value = 12;
        }
        if (value == "J") {
            value = 11;
        }
    }
    value = parseInt(value*10);
    value += suitWeight[suit]
    return value;


}

var rotate = function(nums, k) {
    k = k % nums.length;
    if (k !== 0) {
        let temp = nums.slice(-k).concat(nums.slice(0, -k));
        for (let i = 0; i < nums.length; i++) {
            nums[i] = temp[i];
        }
    }    
};

function whoStarts() {
    buildDeck()
    shuffleDeck()
    let temp = 0
    let winner = ""
    let cards = []
    for (let i in players) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cards.push(card)
        cardImg.src = "./cards/" + card + ".png";
        document.getElementById(players[i]+"-cards").append(cardImg);
        if (cardValue(card) > temp) {
            temp = cardValue(card);
            winner = players[i];

        }       
        // convert card to value, store as temporary value alongside index, whoever has highest value is dealer, set person to dealer
    }
    for (let i in cards){
        let randomIndex = Math.floor(Math.random() * deck.length);

        deck.splice(randomIndex, 0, cards[i]);
    }
    rotate(players, -players.indexOf(winner))
    return new Promise((resolve, reject) => {
        showPopupAndWait(players[0], () => {
            resolve();
        });
    });
}
function removeCard() {
    for (let i in players) {
        var container = document.getElementById(players[i]+"-cards"); 
        if (container.lastChild) { 
            container.removeChild(container.lastChild);
        } 
    }       
}

function bestCardToPlay(){
    //takes in the players hand
    //takes in current suit
    //takes in the current cards played in trick
    //does player have suit? 
        //if yes then does the player have a card that will win the trick from opposite team?
            //if yes play card
            //if no play lowest card
        //if no then does the player have a trump card? 
            //if yes then play lowest trump card that wins from the opposition team
            //if no play lowest card
}


function showPopup(winner) {
    document.getElementById("popup-text").textContent = winner + " Wins, and starts the bidding";
    document.getElementById("popup").style.display = "block";
}

function hidePopup() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("popup").style.display = "none";
}

async function showPopupAndWait(winner) {
    showPopup(winner);
    await waitForButtonClick(); 
        removeCard();
        dealHand();
        addButtons()
        selectBids()
}

function dealHand() {
    for (let i in players) {
        temp = []
        for (let j = 0; j<10; j++) {
            if (players[i] == "player") {
                let cardImg = document.createElement("img");
                let card = deck.pop();
                cardImg.src = "./cards/" + card + ".png";
                document.getElementById(players[i]+"-cards").append(cardImg);
                cardImg.alt = "Clickable Image";
                cardImg.style.cursor = "pointer";
                playersHands["player"].push(card)
                playCard(cardImg, card)
            }
            if (players[i] != "player"){
                let card = deck.pop();
                temp.push(card)
                playersHands[players[i]] = temp;            
            };
        }
    }
    rearrangeHand()
}
       

function addButtons() {
    for (let j in betSize) {
        let bidButton = document.createElement("button");
        bidButton.type = "button";
        bidButton.textContent = j + ": " + betSize[j];
        if (bidButton in document.getElementById("results")){
            continue
        }
        else;
        document.getElementById("results").append(bidButton);
        bidButton.addEventListener("click", function() {
            selectedBid = bidButton.textContent
            selectedBid = selectedBid.split(":")
            selectedBid = selectedBid[0]
        });
}
}


// Function to wait until the variable is not empty
function waitForSelection() {
    return new Promise((resolve) => {
        const checkSelection = () => {
            //////console.log(selectedBid + "1")
            if (selectedBid !== undefined) {
                resolve();
            } else {
                //////console.log(selectedBid + "2")
                setTimeout(checkSelection, 200); // Check again after 100ms
            }
        };
        checkSelection();
    });
}

async function waitOnBid() {
    ////console.log("Waiting for button click...");
    await waitForSelection(); // Wait until selectedBid is set
    ////console.log("Button was clicked, selected option:", selectedBid);
    // Continue with the rest of your script here
}

async function addText(input){
    setTimeout(function(){
    document.getElementById("popup-text").textContent += " "+ input + " |"
    }, 500);
}

async function selectBids() {
    for (i in players){
        if (players[i] == "player"){
            if (selectedBid == undefined){
            await waitOnBid();
            bid["player"] = selectedBid
            addText("player bid: " + bid["player"])
            selectedBid = undefined
        }
        else;
            ////console.log("you've selected" + selectedBid)
        }
        else if (players[i] !== "player") {
        // Get the keys of the Object
        const keys = Object.keys(betSize);

        // Select a random key
        const randomKey = keys[Math.floor(Math.random() * (keys.length-18))];

        // Get the corresponding value
        const randomValue = betSize[randomKey];
        bid[players[i]] = randomKey
        addText(players[i] + " bid: " + bid[players[i]])
        };

    }
    await waitForButtonClick()
    highestBid()
    rearrangeHand()
    playRound()
}

function rearrangeHand(){
    // Get the container element
    const container = document.getElementById('player-cards');
    console.log(container + "container")
    let trumpsOrderedDeck;
    // Convert HTMLCollection to an array
    const imagesArray = Array.from(container.getElementsByTagName('img'));
    if (trumps != undefined){
        trumpsOrderedDeck = orderedDecks[trumps[0]]
    }
    else if (trumps == undefined){
        trumpsOrderedDeck = orderedDecks[trumps]
    }

    // Filter out images that match the desired order list
    const filteredImages = imagesArray.filter(img => {
        const cardIdentifier = img.src.split('/').pop().replace('.png', ''); // Extract '4-C', 'J-C', etc.
        return trumpsOrderedDeck.includes(cardIdentifier);
    });

    // Sort the filtered images array according to the desired order
    filteredImages.sort((a, b) => {
        const aCardIdentifier = a.src.split('/').pop().replace('.png', '');
        const bCardIdentifier = b.src.split('/').pop().replace('.png', '');
        return trumpsOrderedDeck.indexOf(aCardIdentifier) - trumpsOrderedDeck.indexOf(bCardIdentifier);
    });

    // Clear the container
    container.innerHTML = "";

    // Append the filtered and sorted images back in the correct order
    filteredImages.forEach(img => container.appendChild(img));
};



async function highestBid(){
    let temp = 0;
    let winner;
    let suit;
    let totalBid;
    let tricksNeeded;
    let finalBid;
    
    for (i in bid) {
        suit = bid[i].split("-")
        suit = suit[1]
        totalBid = bid[i]
        betScore = betSize[totalBid]
        if (betScore > temp){
            temp = betScore
            winner = i
            trumps = suit
            finalBid = totalBid
            tricksNeeded = totalBid.split("-")
            tricksNeeded = tricksNeeded[0]

            
        }
    }
    if (redTeam.includes(winner)) {
        winningBid = {redTeam:finalBid}
        document.getElementById("tricks-needed").append(tricksNeeded)
        document.getElementById("winning-bet-team").append("Red Team")
        ////console.log("red win")
    } else if (blueTeam.includes(winner)) {
        winningBid = {blueTeam:finalBid}
        document.getElementById("tricks-needed").append(tricksNeeded)
        document.getElementById("winning-bet-team").append("Blue Team")
        ////console.log("blue win")
    } else {
        ////console.log('The variable is not in either array.');
    }

    // convert left bower to same suit    
    
    rotate(players, -players.indexOf(winner))
    // Assuming 'results' is an ID of an element containing the bid buttons
    const bidButtons = document.querySelectorAll("#results button"); // Use a more specific selector

    const resultsElement = document.getElementById("results"); // Get the parent element

    // Use a for...of loop to correctly iterate over the NodeList
    for (const button of bidButtons) {
        resultsElement.removeChild(button);
    }
    document.getElementById("popup-text").textContent = "winner is " + winner + " trumps are: " + trumps;
    document.getElementById("trumps-are").append(trumps)
    document.getElementById("overlay").style.display = "block";
    document.getElementById("popup").style.display = "block";

    
    if (winner == "player"){
        document.getElementById("popup-text").append(" You've won the kitty, select three cards to remove.");
        document.getElementById("continue-button").style.display = "none"
        rearrangeHand()
        
        for (let j = 0; j<3; j++) {
                let cardImg = document.createElement("img");
                let card = deck.pop();
                cardImg.src = "./cards/" + card + ".png";
                document.getElementById("player-cards").append(cardImg);
                cardImg.alt = "Clickable Image";
                cardImg.style.cursor = "pointer";
                playersHands["player"].push(card)
                playCard(cardImg, card)
    }
        for (let i=0; i<3;){
            await waitOnCardToRemove()
            i++
        }
        selectedCard = undefined
        document.getElementById("popup-text").textContent = "Now play you card"
        await waitForButtonClick()
    }
} 

function playCard(cardImg, card) {
    //////console.log(trick)
    cardImg.addEventListener("click", function() {
        selectedCard = cardImg;

       // ////console.log(document.getElementById("trick-cards"))
    });
}
function waitForCardToRemove() {
    return new Promise((resolve) => {
        const checkSelection3 = () => {
        if (selectedCard != undefined){ // card is of the current suit, or current suit undefined
            let selectedCardCard2 = selectedCard.src.split("/")
            selectedCardCard2 = selectedCardCard2[selectedCardCard2.length - 1]
            selectedCardCard2 = selectedCardCard2.split(".")
            selectedCardCard2 = selectedCardCard2[0]
            const arrayToModify = playersHands["player"];
            let indexToRemove = arrayToModify.indexOf(selectedCardCard2);
                if (indexToRemove !== -1) {
                    // Remove the element at the found index
                    playersHands["player"].splice(indexToRemove,1);
                }
            // ////console.log("Card Selected:", card);
            const playersHand = document.querySelectorAll("#player-cards img"); // Use a more specific selector
            const resultsElement = document.getElementById("player-cards"); // Get the parent element        
            // Use a for...of loop to correctly iterate over the NodeList
            for (const img of playersHand) {
                if (img === selectedCard){
                    resultsElement.removeChild(img);                    
                }
            }
            selectedCard = undefined
            resolve();               
        }
        else {
        //////console.log(selectedBid + "2")
        setTimeout(checkSelection3, 200); // Check again after 100ms
        }
    };
    setTimeout(checkSelection3, 200);
    });
}


// Function to wait until the variable is not empty
function waitForCard(currentSuit2) {
    return new Promise((resolve) => {
        const checkSelection2 = () => {
            let hasCurrentSuit;
            const button = document.getElementById("continue-button");
            button.style.display = "none"
            if (selectedCard !== undefined) {
                let suit2;
                let selectedCardCard = selectedCard.src.split("/")
                selectedCardCard = selectedCardCard[selectedCardCard.length - 1]
                selectedCardCard = selectedCardCard.split(".")
                selectedCardCard = selectedCardCard[0]
                suit2 = selectedCardCard.split("-")[1]
                //console.log(currentSuit2 + "this is the current suit in user click")
                //console.log(suit2 + "this is the selected cards suit")
                // filter out left bower if suit played is not trumps
                if (currentSuit2 == trumps[0]){
                    hasCurrentSuit = playersHands["player"].some(str => str.includes(currentSuit2) || str.includes(leftBower[trumps])|| str.includes("JOKER-N"));              
                    }
                    else if (currentSuit2 == suitConversion[trumps[0]]){
                        hasCurrentSuit = playersHands["player"].some(str => str.includes(currentSuit2) && !(str.includes(leftBower[trumps])));                  
                    }
                    else{
                        hasCurrentSuit = playersHands["player"].some(str => str.includes(currentSuit2));                   
                    }
                     // returns boolean, if true must play card of suit, otherwise can play anything
                if (selectedCardCard == leftBower[trumps]){
                suit2 = suitConversion[suit2]
            }
                if (currentSuit2 == suit2 || currentSuit2 == undefined || hasCurrentSuit == false){ // card is of the current suit, or current suit undefined
                    // NEXT TO ADD or current hand doesnt contain a card of the currentSuit
                    button.style.display = "block"
                    resolve();                    
                }
                else if (currentSuit2 != suit2){ 
                    document.getElementById("popup-text").textContent = `you must play a card of the same suit`;
                    setTimeout(checkSelection2, 100);
                }
            

            } else {
                //////console.log(selectedBid + "2")
                setTimeout(checkSelection2, 200); // Check again after 100ms
            }
        };
        checkSelection2();
    });
}

async function waitOnCard(currentSuit = undefined) {
    ////console.log("Waiting for button click...");
    await waitForCard(currentSuit); // Wait until selectedBid is set
    ////console.log("Button was clicked, selected option:", selectedCard);
    // Continue with the rest of your script here
}

async function waitOnCardToRemove() {
    ////console.log("Waiting for button click...");
    await waitForCardToRemove(); // Wait until selectedBid is set
    ////console.log("Button was clicked, selected option:", selectedCard);
    // Continue with the rest of your script here
}


async function playTrick() {
    let j = 0;
    let suit;
    let condition;
    let winner;
    let row;
    let col;
    for (i in players){
        //console.log(suit + " "+ players[i] + "this is suit just before players go")
        if (players[i] == "player") {
            row = 3; // Determine the row (1-3)
            col = 2;           // Determine the column (1-3)
        }
        if (players[i] == "opponent2") {
            row = 2; // Determine the row (1-3)
            col = 1;           // Determine the column (1-3) 
        }
        if (players[i] == "teammate") {
            row = 1; // Determine the row (1-3)
            col = 2;           // Determine the column (1-3)
            
        }
        if (players[i] == "opponent1") {
            row = 2; // Determine the row (1-3)
            col = 3;           // Determine the column (1-3)
                    }
            // Create a div for the card and place it in the correct grid position
            let cardCell = document.createElement('div');
            cardCell.className = 'trick-card-cell';
            cardCell.style.gridRow = row;
            cardCell.style.gridColumn = col;

        if (players[i] == "player"){
            if (suit == undefined){
                await waitOnCard(suit);
                let playedCard;
                playedCard = selectedCard.src
                playedCard = playedCard.split("/")
                playedCard = playedCard[playedCard.length - 1]
                playedCard = playedCard.split(".")
                playedCard = playedCard[0]
                trick["player"] = playedCard
                ////console.log(playersHands["player"])
                const arrayToModify = playersHands["player"];
                let indexToRemove = arrayToModify.indexOf(playedCard);
                    if (indexToRemove !== -1) {
                        // Remove the element at the found index
                        playersHands["player"].splice(indexToRemove,1);
                    }
                // ////console.log("Card Selected:", card);
                const playersHand = document.querySelectorAll("#player-cards img"); // Use a more specific selector
                const resultsElement = document.getElementById("player-cards"); // Get the parent element        
                // Use a for...of loop to correctly iterate over the NodeList
                for (const img of playersHand) {
                    if (img === selectedCard){
                        resultsElement.removeChild(img);                    
                    }
                }
                // Append the card image to the cell
                    cardCell.appendChild(selectedCard);

                    // Append the cell to the trick-cards grid
                    document.getElementById("trick-cards").appendChild(cardCell);
                if ((playedCard != leftBower[trumps]) && (playedCard != "JOKER-N")){
                    console.log(selectedCard)
                    suit = selectedCard.src.split("-")
                    suit = suit[suit.length - 1]  
                    suit = suit.split(".")
                    suit = suit[0]
                    console.log(suit)
                    ////console.log(suit)
                }
                else if (playedCard == "JOKER-N"){
                    if (trumps[0] == "N"){
                        suit = undefined
                        console.log(suit)
                    }
                    else if (trumps[0] != "N"){
                        suit = trumps[0]
                        console.log(suit)
                    }
                }
                else if (playedCard == leftBower[trumps]){
                    suit = selectedCard.src.split("-")
                    suit = suit[suit.length - 1]      
                    suit = suit.split(".")
                    suit = suit[0]
                    suit = suitConversion[suit]
                    console.log(suit)
                }
                selectedCard = undefined 
            }
            else if (suit != undefined){
                await waitOnCard(suit);
                let playedCard;
                playedCard = selectedCard.src
                playedCard = playedCard.split("/")
                playedCard = playedCard[playedCard.length - 1]
                playedCard = playedCard.split(".")
                playedCard = playedCard[0]
                //console.log(playedCard+ "this is the played card")
                trick["player"] = playedCard
                const arrayToModify = playersHands["player"];
                let indexToRemove = arrayToModify.indexOf(playedCard);
                    if (indexToRemove !== -1) {
                        // Remove the element at the found index
                        playersHands["player"].splice(indexToRemove,1);
                    }
                // ////console.log("Card Selected:", card);
                const playersHand = document.querySelectorAll("#player-cards img"); // Use a more specific selector
                const resultsElement = document.getElementById("player-cards"); // Get the parent element        
                // Use a for...of loop to correctly iterate over the NodeList
                for (const img of playersHand) {
                    if (img === selectedCard){
                        resultsElement.removeChild(img);                    
                    }
                }
                // Append the card image to the cell
                cardCell.appendChild(selectedCard);

                // Append the cell to the trick-cards grid
                document.getElementById("trick-cards").appendChild(cardCell);
                selectedCard = undefined              
            }
            }
        else if (players[i] != "player"){
            if (suit == undefined){
                let cardImg = document.createElement("img");
                let card = playersHands[players[i]].pop();
                console.log(leftBower[trumps])
                if ((card != leftBower[trumps]) && (card != "JOKER-N")){
                    suit = card.split("-")
                    suit = suit[1]
                    console.log(suit)
                    ////console.log(suit)
                }
                else if (card == "JOKER-N"){
                    if (trumps[0] == "N"){
                        suit = undefined

                    }
                    else if (trumps[0] != "N"){
                        suit = trumps[0]

                    }
                    //console.log(suit +" this is the suit after opponent played their card"+ players[i])
                }

                else if (card == leftBower[trumps]){
                suit = card.split("-")
                suit = suit[1]
                suit = suitConversion[suit]
                }
                ////console.log(suit)
                // add card to trick, and insert image of card
                cardImg.src = "./cards/" + card + ".png";
                //console.log(cardImg.src + "this is the opponents cards SRC")
                if (players[i] == "opponent2") {
                    cardImg.style.transform = `rotate(${90}deg)`;
                    
                }
                if (players[i] == "opponent1") {
                    cardImg.style.transform = `rotate(${90}deg)`;
                            }
                // Append the card image to the cell
                cardCell.appendChild(cardImg);

                // Append the cell to the trick-cards grid
                document.getElementById("trick-cards").appendChild(cardCell);
                trick[players[i]] = card
                const arrayToModify = playersHands[players[i]];
                let indexToRemove = arrayToModify.indexOf(card);
                    if (indexToRemove !== -1) {
                        // Remove the element at the found index
                        playersHands[players[i]].splice(indexToRemove,1);
                    }                             
            }

            else if (suit != undefined){
                let cardImg = document.createElement("img");
                hand = playersHands[players[i]]
                // select only cards of suit + left bower
                //NOW NEED TO CHECK IF OPPOSITE SUIT TO TRUMPS IS PLAYED THEN FILTER OUT LEFT BOWER UNLESS NONE OF THAT SUIT
                if (suit == trumps[0]){
                condition = (cardToPlay) => cardToPlay.includes(suit) || cardToPlay.includes(leftBower[trumps]) ||  cardToPlay.includes("JOKER-N") ;                    
                }
                else if (suit == suitConversion[trumps[0]]){
                    condition = (cardToPlay) => cardToPlay.includes(suit) && !(cardToPlay.includes(leftBower[trumps])) && !(cardToPlay.includes("JOKER-N"));                    
                }
                else{
                    condition = (cardToPlay) => cardToPlay.includes(suit);                    
                }

                // Step 2: Filter the array based on the condition
                let filteredArray = hand.filter(condition);

                ////console.log(hand)
                ////console.log(filteredArray + "this is their filtered array")
                if (filteredArray != ""){ // if they have a card of the same suit 
                    let card = filteredArray.pop();
                    // need to remove card after popping
                    // add card to trick, and insert image of card
                    cardImg.src = "./cards/" + card + ".png";
                    if (players[i] == "opponent2") {
                        cardImg.style.transform = `rotate(${90}deg)`;
                        
                    }
                    if (players[i] == "opponent1") {
                        cardImg.style.transform = `rotate(${90}deg)`;
                                }
                    // Append the card image to the cell
                    cardCell.appendChild(cardImg);

                    // Append the cell to the trick-cards grid
                    document.getElementById("trick-cards").appendChild(cardCell);
                    trick[players[i]] = card
                    const arrayToModify = playersHands[players[i]];
                    let indexToRemove = arrayToModify.indexOf(card);
                        if (indexToRemove !== -1) {
                            // Remove the element at the found index
                            playersHands[players[i]].splice(indexToRemove,1);
                        }                           
                    }
                    else if (filteredArray == ""){
                    let card = playersHands[players[i]].pop();
                    // need to remove card after popping
                    // add card to trick, and insert image of card
                    cardImg.src = "./cards/" + card + ".png";
                    if (players[i] == "opponent2") {
                        cardImg.style.transform = `rotate(${90}deg)`;
                        
                    }
                    if (players[i] == "opponent1") {
                        cardImg.style.transform = `rotate(${90}deg)`;
                                }
                    // Append the card image to the cell
                    cardCell.appendChild(cardImg);

                    // Append the cell to the trick-cards grid
                    document.getElementById("trick-cards").appendChild(cardCell);
                    trick[players[i]] = card
                    const arrayToModify = playersHands[players[i]];
                    let indexToRemove = arrayToModify.indexOf(card);
                        if (indexToRemove !== -1) {
                            // Remove the element at the found index
                            playersHands[players[i]].splice(indexToRemove,1);
                        }                          
                    }

           
            }
          
        }
        // Get the keys of the Object
        };
        winner = updateTricksWon(suit)
        rotate(players, -players.indexOf(winner))
    }
    // card played sets suit
    // card has value
    // highest value sets player to winner
    // end of the trick winner gets +1 to their tricks won

// function that identifies if a card is legal or not
// takes in suit, card, and players hand if suit is undefinied, define suit

function whoWonTrick(suit){
    let data;
    let value;
    let cardSuit;
    let temp = 0
    let winner;
    document.getElementById("popup-text").textContent = ("")
    for (i in trick){
        data = trick[i].split("-"); // "4-C" -> ["4", "C"]
        value = data[0];
        cardSuit = data[1]
        if (trick[i] == "JOKER-N"){
            value = 1000
        }  
        if (trick[i] == leftBower[trumps]){
            value = 140;
            
        }        
        if (cardSuit == trumps[0]){
            if (!(isNaN(value))) { // if its a trump card the value is increased by 10x to ensure it can only lose vs another higher trump
                value = value*10
                ////console.log(value + "standard number *10")
            }

            if (isNaN(value) && ((trick[i] != leftBower[trumps]) || (trick[i] != "JOKER-N"))) { //A J Q K
                if (value == "A") {
                    value = 130;
                }
                if (value == "K") {
                    value = 120;
                }
                if (value == "Q") {
                    value = 110;
                }
                if (value == "J") {
                    value = 150;
                }   
            }
        }

        if (isNaN(value) && ((trick[i] != leftBower[trumps]) || (trick[i] != "JOKER-N"))) { //A J Q K
            if (value == "A") {
                value = 14;
            }
            if (value == "K") {
                value = 13;
            }
            if (value == "Q") {
                value = 12;
            }
            if (value == "J") {
                value = 11;
            }
        }
        if ((cardSuit != suit) && (cardSuit != trumps[0]) && (trick[i] != leftBower[trumps]) && (trick[i] != "JOKER-N")){
            ////console.log(i + "not of suit so loses")
            value = 0 // unwinnable if card is off suit and non trump
        }
        if (value > temp){
            temp = value
            winner = i
            ////console.log(winner +" "+ temp)
        }
        ////console.log(value +" "+ cardSuit + " this was " + i)
    }
    if (temp == 140){
        document.getElementById("popup-text").textContent = "Left bower means "
    }
    if (temp == 150){
        document.getElementById("popup-text").textContent = "Right bower means "
    }
    return winner
}

function updateTricksWon(suit) {
    let winner = whoWonTrick(suit);

    if (redTeam.includes(winner)) {
        tricksWon.redTeam += 1;
    } else if (blueTeam.includes(winner)) {
        tricksWon.blueTeam += 1;
    }
    document.getElementById("blue-team-tricks").textContent = `Blue Team Tricks: ${tricksWon.blueTeam}`;
    document.getElementById("red-team-tricks").textContent = `Red Team Tricks: ${tricksWon.redTeam}`;
    document.getElementById("popup-text").append(`${winner} wins the Trick`);
    return winner
}

function waitForButtonClick() {
    return new Promise((resolve) => {
        const button = document.getElementById("continue-button");
        button.style.display = "block"; // Show the button
        button.addEventListener("click", function handler() {
            button.style.display = "none"; // Hide the button after click
            button.removeEventListener("click", handler); // Clean up the event listener
            resolve();
        });
    });
}


function secondwaitForButtonClick() {
    return new Promise((resolve) => {
        const button = document.getElementById("next-hand-button");
        button.style.display = "none"; // Show the button
        button.addEventListener("click", function handler() {
            button.style.display = "none"; // Hide the button after click
            button.removeEventListener("click", handler); // Clean up the event listener
            resolve();
        });
    });
}

async function playRound(){
    for (let i = 0; i < 10; i++){
        playTrick()
        await waitForButtonClick(); 
        document.querySelectorAll('#trick-cards img').forEach(img => img.remove());

    }
    ////console.log("end of game")
        // Extract the value from the object
    let bidWon = Object.values(winningBid)[0]; // This gets the first value in the object
    let winningTeam = Object.keys(winningBid)[0];
    
    let tricksNeeded = bidWon.split("-");
    tricksNeeded = tricksNeeded[0];

    if (tricksWon[winningTeam] >= tricksNeeded){
        scores[winningTeam] += betSize[bidWon]

        document.getElementById(`popup-text`).textContent =  `${winningTeam} Wins!`;
        console.log(winningTeam + " wins");
    }
    else if (tricksWon[winningTeam] < tricksNeeded){
        scores[winningTeam] -= betSize[bidWon]
        document.getElementById(`popup-text`).textContent =  `${winningTeam} Loses!`;
        console.log(winningTeam + " loses");
    }
    if ("redTeam" != winningTeam){
        scores.redTeam += tricksWon.redTeam*10
    }
    else if ("blueTeam" != winningTeam){
        scores.blueTeam += tricksWon.blueTeam*10
    }

    document.getElementById(`blueTeam-scores`).textContent =  `Blue Team Score: ${scores.blueTeam}`;
    document.getElementById(`redTeam-scores`).textContent =  `Red Team Score: ${scores.redTeam}`;
    trumps = undefined
    tricksWon.redTeam = 0
    tricksWon.blueTeam = 0
    deck = undefined
    document.getElementById("blue-team-tricks").textContent = `Blue Team Tricks: ${tricksWon.blueTeam}`;
    document.getElementById("red-team-tricks").textContent = `Red Team Tricks: ${tricksWon.redTeam}`;
    document.getElementById("tricks-needed").textContent = ("Tricks needed: ")
    document.getElementById("winning-bet-team").textContent = ("Team to Win: ")
    document.getElementById("trumps-are").textContent = ("Trumps: ")
    const button = document.getElementById("next-hand-button");
    button.style.display = "block"; // Hide the button after click
}

async function main(){
    while (((scores.redTeam &&  scores.blueTeam) < 500) && ((scores.redTeam &&  scores.blueTeam) > -500)){
        whoStarts();
        let button = document.getElementById("next-hand-button");
        button.style.display = "block"; // Hide the button after click
        await secondwaitForButtonClick()
    }
    if ((scores.redTeam >= 500 || scores.blueTeam <= -500 )){
        document.getElementById(`popup-text`).textContent =  `Red Team Wins!`;
    }
    if ((scores.blueTeam >= 500 || scores.redTeam <= -500 )){
        document.getElementById(`popup-text`).textContent =  `Blue Team Wins!`;
    }

} 

function openRules(){
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the text that opens the modal
    var popupText = document.getElementById("popupText");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the text, open the modal
    popupText.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
