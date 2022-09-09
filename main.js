//array of words
const words = [
          'Hello',
          'Programming',
          'code',
          "Javascript",
          "Town",
          "Country",
          "Testing",
          "Youtube",
          "Linkedin",
          "Twitter",
          "Github",
          "Internet",
          "Python",
          "Scala",
          "Destructcring",
          "Paradigm",
          "Styling",
          "Cascade",
          "Documemtation",
          "Coding",
          "Funny",
          "Working",
          "Dependencies",
          "Task",
          "Runner",
          "Roles",
          "Test",
          "Rust",
          "Playing", 
          "Html"
];

//setting levels
const lvls = {
          "Easy":5,
          "Normal":3,
          "Hard":2
}

//default level
let defaultLevelName = "Easy";
let defaultLevelSeconds = lvls[defaultLevelName];


// catch selectors
let menuBtn=document.querySelector(".heading i");
let menu=document.querySelector(".heading .menu");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan  = document.querySelector(".message .seconds");
let startBtn = document.querySelector(".start");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot =document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

//display level menu 
menuBtn.onclick=()=>{
          menu.classList.toggle("show");
          // menu.style.display="block";
}
//choose level 
let easy =document.querySelector(".easy");
let normal =document.querySelector(".normal");
let hard =document.querySelector(".hard");
//for easy level 
easy.onclick=()=>{
    defaultLevelName="Easy"; //change Level Here
    defaultLevelSeconds=5;
    reset();
    setLevelSecondScore();
    scoreGot.innerHTML=0;
    startBtn.innerHTML="Start";
    menu.style.display="none";
}
//for normal level 
normal.onclick=()=>{
    defaultLevelName="Normal"; //change Level Here
    defaultLevelSeconds=3;
    reset();
    setLevelSecondScore()
    scoreGot.innerHTML=0;
    startBtn.innerHTML="Start";
    menu.style.display="none";
}
//for hard level 
hard.onclick=()=>{    
    defaultLevelName="Hard"; //change Level Here
    defaultLevelSeconds=2;
    reset();
    startBtn.innerHTML="Start";
    setLevelSecondScore();
    scoreGot.innerHTML=0;
    menu.style.display="none";
}


// //setting level name + seconds + score
function setLevelSecondScore(){
          lvlNameSpan.innerHTML=defaultLevelName;
          secondsSpan.innerHTML=defaultLevelSeconds;
          timeLeftSpan.innerHTML=defaultLevelSeconds;
          scoreTotal.innerHTML=words.length;
          startBtn.style.display="block";
 }


// disable paste event
input.onpaste = ()=>false

//start game
startBtn.onclick=game;
function game(){
          input.focus();
          reset();
          setLevelSecondScore();
          //generate word function 
          genWords();
          this.style.display="none";
         
}



//function for reset 
function reset(){
          input.value="";
          finishMessage.innerHTML="";
          upcomingWords.innerHTML="";
          theWord.innerHTML="";
          
      }
//generate word function
function genWords(){
          //get random word from array
          let randomWord = words[Math.floor(Math.random()* words.length)];
          // get word index
          let wordIndex = words.indexOf(randomWord);
          //remove word from array
          words.splice(wordIndex,1);
          //show tne random word
          theWord.innerHTML = randomWord
          //empty upcoming words
          upcomingWords.innerHTML = '';
          // generate words
          for(let i = 0; i< words.length; i++){
                    //create div element
                    let div = document.createElement('div');
                    let txt = document.createTextNode(words[i]);
                    div.appendChild(txt);
                    upcomingWords.appendChild(div);
          }
          //call start play function
          startPlay();
}
function startPlay(){
          timeLeftSpan.innerHTML = defaultLevelSeconds;
          let start = setInterval(() => {
                    
                    timeLeftSpan.innerHTML--;
                    if (timeLeftSpan.innerHTML === "0"){
                              //stop timer
                              clearInterval(start);
                              //compare words
                              if(theWord.innerHTML.toLowerCase()===input.value.toLowerCase()){
                                        // empty input field
                                        input.value = "";
                                        //increase score
                                        scoreGot.innerHTML++;
                                        if(words.length>0){
                                                  genWords()      
                                        }else{
                                                  let span = document.createElement("span");
                                                  span.className = 'good';
                                                  let spanText = document.createTextNode("Congratulations");
                                                  span.appendChild(spanText);
                                                  finishMessage.appendChild(span);  
                                        }
                              }else{
                                        // reset();
                                        startBtn.textContent="Retry Again";
                                        startBtn.style.display="block";
                                        scoreGot.innerHTML=0;
                                        let span = document.createElement("span");
                                        span.className = 'bad';
                                        let spanText = document.createTextNode("Game Over");
                                        span.appendChild(spanText);
                                        finishMessage.appendChild(span);
                              }

                    }
          },1000);
}