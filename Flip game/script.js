const cards = document.querySelectorAll(".card");

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;
let score =0;
// let time = startingMinutes * 60;

const startingMinutes = 10;

function flipCard(e) {
    let clickedCard = e.target; //GETTING USER CLICKED CARD    
    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            // RETURN THE CARDONE VALUE TO CLICKEDCARD
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector("img").src,
            cardTwoImg = cardTwo.querySelector("img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 == img2) { //IF CARDS ARE MATCHED
        matchedCard++;// increment matched value by 1
        score += 1; 
        scoreBox.innerHTML = "score: " + score;
        if (matchedCard == 8) {// if martchedcards is equal to 8 then it means user have matched all the cards and pairs 
            setTimeout(() => {
                return shuffleCard();
            }, 1000); //CALLING SHUFFLECARD FUNC AFTER 1 SEC
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = ""; //VALUE TO BLANK
        return disableDeck = false;
    }
    //IF CARDS DONT MATCH
    setTimeout(() => {
        //SHAKE AFTER 400MS
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 350);

    setTimeout(() => {
        //REMOVE AFTER 1.2S
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = ""; //VALUE TO BLANK
        disableDeck = false;
    }, 1000);
}

function shuffleCard() {
     matchedCard = 0;
     cardOne = cardTwo = "";
     disableDeck = false;
     // CREATING AN ARRAY OF SAME SPACE TWICE
     let arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
     //SORTING RANDOMLY
     arr.sort(() => Math.random() > 0.5 ? 1 :-1); 

     //REMOVING FLIP CLASS FROM ALL CARD & PASSING RANDOM IMAGE TO EACH CARD
     cards.forEach((card, index) => { 
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `images/img-${arr[index]}.png`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

cards.forEach(card => { //ADD CLICK EVENT TO ALL CARDS
    // card.classList.add("flip");
    card.addEventListener("click", flipCard);
});

// SETTING THE COUNTER FOR TIMER IN GAME
setInterval(updateCountdown, 1000);

function updateCountdown() {
    const minutes = Math.floor(time/60);
    let seconds = time % 60;

    seconds = seconds <10 ? '0' + seconds : seconds;
    
    countdownEl.innerHTML = `${minutes} : ${minutes}`;
    time--;
}