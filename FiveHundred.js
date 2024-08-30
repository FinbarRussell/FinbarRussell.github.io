/* 
FiveHundred 

Rules
Number cards are number cards, J<Q<K<A<trumps<Jack of opposite suit same colour<Jack same suit<Joker>
4 players, two teams of two. However they act independantly so no conversing, only scores added. 
Each team has score, once score exceeds 500 or less than -500 team wins/loses
scores = C<S<D<H  for 6 60,70,80,90 for 7 160,170,180,190 for 8 260,270,280,290 9 360,370,380,390, 10 460, 470, 480, 490

    

Dealing
Remove 2,3 of all suits, and 4 black cards
Deck shuffle
Each of the 4 players draws one card, the highest is the dealer. The turn to deal turns counter-clockwise.
Deck shuffle
Deal 10 to each

Bidding
Player anticlockwise to the dealer says how many tricks they'll take and of what suit C<S<D<H
minimum bid is 6
If all pass reshuffle


gamplay
Winner of bid goes first, then clockwise follows, and they must follow suit if possible, if not they may trump, highest score wins the trick, trick added to team tally.
10 hands
if wins, then score added
if lose score subtracted
team not won bid has their total tricks won *10 added to their score


*/


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

    // ////console.log(deck);
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
    const button = document.getElementById("next-hand-button");
    button.style.display = "none"; // Hide the button after click
    buildDeck()
    shuffleDeck()
    ////console.log(deck +" before draw")
    let temp = 0
    let winner = ""
    let cards = []
    for (let i in players) {
        //<img src="./cards/4-C.png">
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cards.push(card)
        ////console.log(cards)
        cardImg.src = "./cards/" + card + ".png";
        document.getElementById(players[i]+"-cards").append(cardImg);
        //////console.log(players[i])
        //////console.log(cardValue(card))
        if (cardValue(card) > temp) {
            temp = cardValue(card);
            winner = players[i];

        }       
        // convert card to value, store as temporary value alongside index, whoever has highest value is dealer, set person to dealer
    }
    // ////console.log(temp)
    //////console.log(winner)
    //////console.log(players)
    ////console.log(deck +" after draw")
    for (let i in cards){
        ////console.log(cards[i])
        // Generate a random index between 0 and the length of the array
        let randomIndex = Math.floor(Math.random() * deck.length);

        // Insert 'grape' and 'kiwi' at the random index without replacing any elements
        deck.splice(randomIndex, 0, cards[i]);
    }
    ////console.log(deck +" after reinsertion")
    rotate(players, -players.indexOf(winner))
    // Return a Promise that resolves after the popup interaction is done
    return new Promise((resolve, reject) => {
        // Assuming showPopupAndWait is async and calls a callback when done
        showPopupAndWait(players[0], () => {
            // Resolve the Promise after the popup interaction
            resolve();
        });
    });
}
function removeCard() {
    for (let i in players) {
        var container = document.getElementById(players[i]+"-cards"); // Get the container div
        if (container.lastChild) { // Check if there is a last child
            container.removeChild(container.lastChild); // Remove the last child element
            //////console.log(container.lastChild)
        } else {
           // ////console.log("No elements to remove!");
        }
        }       
        // convert card to value, store as temporary value alongside index, whoever has highest value is dealer, set person to dealer
    }


function showPopup(winner) {
    document.getElementById("popup-text").textContent = winner + " Wins, and starts the bidding";
    document.getElementById("popup").style.display = "block";
}

// Function to hide the pop-up
function hidePopup() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("popup").style.display = "none";
}

async function showPopupAndWait(winner) {
    showPopup(winner); // Show the pop-up
    await waitForButtonClick(); 
        removeCard();
        dealHand();
        addButtons()
        selectBids()
// 5000 milliseconds = 5 seconds
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
        // add value to object, compare
            }
        if (players[i] != "player"){
        let card = deck.pop();
        temp.push(card)
        playersHands[players[i]] = temp;            
        };

        

            }
            ////console.log(playersHands[players[i]])
        }
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
    document.getElementById("bids").textContent += input + " |"
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
    highestBid()
    playRound()
}

function highestBid(){
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
        document.getElementById("tricks-needed").append("Red Team need: " + tricksNeeded + " Tricks")
        ////console.log("red win")
    } else if (blueTeam.includes(winner)) {
        winningBid = {blueTeam:finalBid}
        document.getElementById("tricks-needed").append("Blue Team need: " + tricksNeeded + " Tricks")
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
} 

function playCard(cardImg, card) {
    //////console.log(trick)
    cardImg.addEventListener("click", function() {
        selectedCard = cardImg;

       // ////console.log(document.getElementById("trick-cards"))
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
                suit2 = selectedCard.src.split("-")
                suit2 = suit2[1]
                suit2 = suit2.split(".")
                suit2 = suit2[0]
                // filter out left bower if suit played is not trumps
                if (currentSuit2 == trumps[0]){
                    hasCurrentSuit = playersHands["player"].some(str => str.includes(currentSuit2) || str.includes(leftBower[trumps]));              
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


async function playTrick() {
    const button = document.getElementById("next-hand-button");
    button.style.display = "none"; // Hide the button after click
    let j = 0;
    let suit;
    let condition;
    let winner;
    let row;
    let col;
    for (i in players){
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
                if (playedCard != leftBower[trumps]){
                    suit = selectedCard.src.split("-")
                    suit = suit[1]
                    suit = suit.split(".")
                    suit = suit[0]
                    ////console.log(suit)
                }
                else if (playedCard == leftBower[trumps]){
                    suit = selectedCard.src.split("-")
                    suit = suit[1]
                    suit = suit.split(".")
                    suit = suit[0]
                    suit = suitConversion[suit]
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
                if (card != leftBower[trumps]){
                    suit = card.split("-")
                    suit = suit[1]
                    ////console.log(suit)
                }
                else if (card == leftBower[trumps]){
                suit = card.split("-")
                suit = suit[1]
                suit = suitConversion[suit]
                }
                ////console.log(suit)
                // add card to trick, and insert image of card
                cardImg.src = "./cards/" + card + ".png";
                // Append the card image to the cell
                cardCell.appendChild(cardImg);

                // Append the cell to the trick-cards grid
                document.getElementById("trick-cards").appendChild(cardCell);
                document.getElementById("played").append(players[i] +" played " + card +". ");
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
                condition = (cardToPlay) => cardToPlay.includes(suit) || cardToPlay.includes(leftBower[trumps]);                    
                }
                else if (suit == suitConversion[trumps[0]]){
                    condition = (cardToPlay) => cardToPlay.includes(suit) && !(cardToPlay.includes(leftBower[trumps]));                    
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
                    // Append the card image to the cell
                    cardCell.appendChild(cardImg);

                    // Append the cell to the trick-cards grid
                    document.getElementById("trick-cards").appendChild(cardCell);
                    document.getElementById("played").append(players[i] +" played " + card +". ");
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
                    // Append the card image to the cell
                    cardCell.appendChild(cardImg);

                    // Append the cell to the trick-cards grid
                    document.getElementById("trick-cards").appendChild(cardCell);
                    document.getElementById("played").append(players[i] +"had none of suit so played " + card +". ");
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
    for (i in trick){
        data = trick[i].split("-"); // "4-C" -> ["4", "C"]
        value = data[0];
        cardSuit = data[1]
        if (trick[i] == leftBower[trumps]){
            value = 140
        }        
        if (cardSuit == trumps[0]){
            if (!(isNaN(value))) { // if its a trump card the value is increased by 10x to ensure it can only lose vs another higher trump
                value = value*10
                ////console.log(value + "standard number *10")
            }

            if (isNaN(value) && (trick[i] != leftBower[trumps])) { //A J Q K
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

        if (isNaN(value) && (trick[i] != leftBower[trumps])) { //A J Q K
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
        if (cardSuit != suit && cardSuit != trumps[0] && (trick[i] != leftBower[trumps])){
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
    document.getElementById("popup-text").textContent = `${winner} wins the Trick`;
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
            button.style.display = "none"; // Show the button
            document.getElementById("bids").textContent = "";
            document.getElementById("played").textContent = "";
        });
    });
}


function secondwaitForButtonClick() {
    return new Promise((resolve) => {
        const button = document.getElementById("next-hand-button");
        button.style.display = "block"; // Show the button
        button.addEventListener("click", function handler() {
            button.style.display = "none"; // Hide the button after click
            button.removeEventListener("click", handler); // Clean up the event listener
            resolve();
            button.style.display = "none"; // Show the button
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
    document.getElementById(`blueTeam-scores`).textContent =  `Blue Team Score: ${scores.blueTeam}`;
    document.getElementById(`redTeam-scores`).textContent =  `Red Team Score: ${scores.redTeam}`;
    trumps = undefined
    tricksWon.redTeam = 0
    tricksWon.blueTeam = 0
    deck = undefined
    document.getElementById("blue-team-tricks").textContent = `Blue Team Tricks: ${tricksWon.blueTeam}`;
    document.getElementById("red-team-tricks").textContent = `Red Team Tricks: ${tricksWon.redTeam}`;
    document.getElementById("tricks-needed").textContent = ("Tricks needed: ")
    document.getElementById("trumps-are").textContent = ("Trumps: ")
    const button = document.getElementById("next-hand-button");
    button.style.display = "block"; // Hide the button after click
}

async function main(){
    while (((scores.redTeam ||  scores.blueTeam) < 500) && ((scores.redTeam ||  scores.blueTeam) > -500)){
        whoStarts();
        await secondwaitForButtonClick()
    }
    if ((scores.redTeam >= 500 || scores.blueTeam <= -500 )){
        document.getElementById(`popup-text`).textContent =  `Red Team Wins!`;
    }
    if ((scores.blueTeam >= 500 || scores.redTeam <= -500 )){
        document.getElementById(`popup-text`).textContent =  `Blue Team Wins!`;
    }
    const button = document.getElementById("next-hand-button");
    button.style.display = "none"; // Hide the button after click
} 




