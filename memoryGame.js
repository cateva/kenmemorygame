const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard,secondCard;


function flipCard(){
    if(lockBoard)return;
    if(this === firstCard)return;
    // console.log('clicked!');
    // console.log(this);// shows it's html code, "this"key word means the element that fire the event
    this.classList.toggle('flip');//classList to edit class, toggle means no then add, yes then remove
    
    if(!hasFlippedCard){
        //first click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    // second click
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
}
    



//check match
function checkForMatch(){
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    // if isMatch is true, go disableCars, if no, go unflipCards
    isMatch ? disableCards() : unflipCards();
}

function disableCards(){
    //if match, move the function
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);
}

function unflipCards(){
    lockBoard = true;
    //not a match
    //set timeout to let second flip delay close
    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
    },800);
    
}

//shuffle immedentaly 
// add 括号 to make this function runs right away
(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random()*12);
        card.style.order = randomPos;
    })
})();
//this is for loop, for all card in cards, run addEventListener and do click and flipCard function 
cards.forEach(card => card.addEventListener('click',flipCard));