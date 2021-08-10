// access all virabalues
const deckCards = ["1.jpg","1.jpg","2.jpg","2.jpg","3.jpg","3.jpg","4.jpg","4.jpg","5.jpg","5.jpg","6.jpg","6.jpg","7.jpg","7.jpg","8.jpg","8.jpg"];
let bolck = document.querySelector('.bolck')
const deck = document.querySelector('.deck');
let opend = [];
let matched = [];
const model = document.getElementById('model');
const reset = document.querySelector('.reset-btn');
const palyAgain = document.querySelector('.play-again-btn');
const movesCount = document.querySelector('.moves-counter');
let moves = 0;
const star = document.getElementById('star-rating').querySelectorAll('.star');
let starCount = 3;
const timeCounter = document.querySelector('.timer');
let time;
let minutes = 0;
let seconds = 0;
let timeStart = false;
let inputName = document.getElementById('inputId');
let title = document.querySelector('h5');
let btnSend = document.querySelector('button');
let headEr = document.querySelector('.head');


// show model name
window.onload = function(){
    headEr.style.display = 'block'; 
    bolck.classList.add('pointer')
}


//send name && hidin modal 
btnSend.onclick = function (){

    if(inputName.value == null || inputName.value == ''){
      
        title.innerText  = `Hello: N/A`

    }else{
        title.innerText = `Hello: ${inputName.value}`
    }
    headEr.style.display = 'none'; 
    bolck.classList.remove('pointer')
   
    
}

// shuffel cards 

const shuffle = (deckCards) =>{ 
    let numberArray = deckCards.length;
    let mainarray;
    let randomArry;

    while(numberArray > 0){
        randomArry = Math.floor(Math.random() * 16);
        numberArray--;

        mainarray = deckCards[numberArray];
        deckCards[numberArray] = deckCards[randomArry];
        deckCards[randomArry] = mainarray;
        
      
    }
 
    return deckCards
}

// frist point -- start game
const startGame = () => {
    const shuffledDeck = shuffle(deckCards);

    for(let i = 0; i < shuffledDeck.length; i++){

        const liTag = document.createElement('li');

        liTag.classList.add('card');
   
        const addImage = document.createElement('img');

        liTag.appendChild(addImage);

        addImage.setAttribute('src' , 'images/' + shuffledDeck[i]);

        addImage.setAttribute('alt' , 'Not Found')

        deck.appendChild(liTag);
    }
}

startGame();

const removeCard = () => {
    while(deck.hasChildNodes()){

        deck.removeChild(deck.firstChild);
    }
}

// start counter timer
const timer = () =>{
    time = setInterval(() =>{
        seconds++;

        if(seconds === 60){
            minutes++;
            seconds = 0;
        }
        timeCounter.innerHTML = `<i class="fa fa-hourglass-start"></i>  Timer:  ${minutes} M ${seconds} S`

    }, 1000)
}
const stopTime = () => {
    clearInterval(time)
}
// clear evey thing
const resetEveryThing = () => {

        stopTime();
        timeStart = false;
        seconds  = 0;
        minutes = 0;
        timeCounter.innerHTML = `<i class="fa fa-hourglass-start"></i> Timer: 00:00`;
        star[1].firstElementChild.classList.add('fa-star');
        star[2].firstElementChild.classList.add('fa-star');
        starCount = 3;
        moves = 0;
        movesCount.innerHTML = 0;
        matched = [];
        opend = [];
        removeCard();
        startGame();
       
}
// moves counter times
const movesCounter = () => {
    movesCount.innerHTML ++;
    moves ++;
}
// star value game
const startRating = () => {
    if(moves === 18){
        star[1].firstElementChild.classList.remove('fa-star');
        starCount--;
    }

    if(moves === 14){
        star[2].firstElementChild.classList.remove('fa-star');
        starCount--;
    }
}   

// stop select card true or false 
const comparetoe = () => {
    if(opend.length === 2){
        document.body.style.pointerEvents = 'none';
    }
    if(opend.length === 2 && opend[0].src === opend[1].src){
        match();
    }else if(opend.length === 2 && opend[0].src !== opend[1].src){
        noMatch();
    }
    
}

// same tow card matching 
const match = ()=> {
    setTimeout(() => {
        opend[0].parentElement.classList.add('match');
        opend[1].parentElement.classList.add('match');
        matched.push(...opend);
        document.body.style.pointerEvents = 'auto';
        winGame();
        opend = [];
        
        document.getElementById('right').play()
    },600);

    movesCounter();
    startRating();

}
// not same tow card matching 
const noMatch = () =>{
    setTimeout(() => {
        opend[0].parentElement.classList.remove('flib');
         
        opend[1].parentElement.classList.remove('flib');
        document.body.style.pointerEvents = 'auto';
        opend = [];
        
        document.getElementById('wrong').play()
    },700);

    movesCounter();
    startRating();
}

// state game goob or miidele or bad 
const addStates = () =>{
    const stats = document.querySelector('.model-content');

    for(let i = 1; i <=3; i++){
        const stateElement = document.createElement('p')
        stateElement.classList.add('stats')
        stats.appendChild(stateElement)
    }
    let p = stats.querySelectorAll('p.stats');


    p[0].innerHTML = `Finsh Time:  ${minutes} Min  &  ${seconds} Sec`;
    p[1].innerHTML = `Moves Taken: ${moves} `;
    p[2].innerHTML = `your are  Rating: ${starCount} out of 3`
}

// btn close paly hidden model
const displaymodal = () =>{
    const modalClose = document.getElementsByClassName('close')[0];

    model.style.display = 'block';

    modalClose.onclick = () => {
        model.style.display = 'none';
    
    }
    window.onclick = (event) => {
        if(event.target == model){
            model.style.display = 'none';
        }

    }

    

    
}

// stop game when finsh card 

const winGame = () => {
    if(matched.length === 16){
        stopTime();
        addStates();
        displaymodal();
    }
}
// add class flib card 
deck.addEventListener('click' , (block) => {

    if(block.target.nodeName === 'LI'){

        if(timeStart === false){
            timeStart = true;
            timer();
        }

        flibCard();
    }

    function flibCard()  {
        block.target.classList.add('flib');

        addToOPend();
    }
    function addToOPend(){
        if(opend.length === 0 || opend.length === 1){
            opend.push(block.target.firstElementChild)
        }

        
        comparetoe();
    }
});
// play btn reset

reset.addEventListener('click' , resetEveryThing);

palyAgain.addEventListener('click' , () => {
    model.style.display = 'none';
    resetEveryThing();

    
});
