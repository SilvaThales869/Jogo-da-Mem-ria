let score
let time
let totalScore
const emojis = [
   "👾",
   "👾",
   "🐲",
   "🐲",
   "🐢",
   "🐢",
   "🐓",
   "🐓",
   "🐒",
   "🐒",
   "👹",
   "👹",
   "💩",
   "💩",
   "👽",
   "👽",]
let openCards = []
let shuffleEmojis = emojis.sort(()=>(Math.random()>0.5 ? 2:-1))


const state = {
    view: {
        time : document.querySelector("#time"),
        score: document.querySelector("#score"),
        highScore: document.querySelector("#highScore"),
        bestTime: document.querySelector("#bestTime"),
    },
    data: {
        currentTime: 60,
        currentScore: 0,
        currentHighScore: 0,
        currentBestTime: 0,
        finalTime: 0,
    },
    action: setInterval(timeLeft,1000)
}
state.view.time.textContent = state.data.currentTime
if(localStorage) {
    // Retrieve the current score from local storage
    state.data.currentHighScore = localStorage.getItem("currentHighScore");
    state.view.highScore.textContent = state.data.currentHighScore
    state.data.currentBestTime = localStorage.getItem("currentBestTime");
    state.view.bestTime.textContent = state.data.currentBestTime
    }

function timeLeft(){
    
    if(state.data.currentTime <= 0){
        clearInterval(state.action)
        alert("Game Over!")
    }
    else{
        state.data.currentTime --
        state.view.time.textContent = state.data.currentTime
    }
}    
function finalTime(){
    if(state.view.time.textContent == state.data.currentTime){
        state.data.finalTime = state.data.currentTime
    }
        
    if(state.data.finalTime <= 0){
            clearInterval(time)
    }
    else{
        state.data.finalTime --
        state.view.time.textContent = state.data.finalTime
    }
        
}  

function scoreUp(){
    state.data.currentScore = state.data.currentScore + 10
    state.view.score.textContent = state.data.currentScore
    if(state.data.currentScore>=totalScore)
        clearInterval(score)
}

for(let i = 0; i < emojis.length; i++ ){
    let box = document.createElement ("div")
    box.className = "item"
    box.innerHTML = shuffleEmojis[i]
    box.onclick = handleClick
    document.querySelector(".game").appendChild(box)
}

function handleClick(){
    if(openCards.length<2){
        if(this.classList.contains("boxOpen")){

        }
        else{
            this.classList.add("boxOpen")
            openCards.push(this)
        }
    }
    else if(openCards.length==2){
        setTimeout(checkMatch, 0);
    }
}

function checkMatch(){
    if(openCards[0].innerHTML===openCards[1].innerHTML){
        openCards[0].classList.add("boxMatch")
        openCards[1].classList.add("boxMatch")
        console.log(document.querySelectorAll(".boxMatch"))
    }
    else{
        openCards[0].classList.remove("boxOpen")
        openCards[1].classList.remove("boxOpen")
    }

    openCards = []

    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        clearInterval(state.action)
        totalScore = state.data.currentTime*200
        time = setInterval(finalTime,100)
        score = setInterval(scoreUp,0.5)
        alert("Você venceu !");
        if(totalScore>state.data.currentHighScore){
            state.data.currentHighScore = totalScore
            state.view.highScore.textContent = state.data.currentHighScore
            
            state.data.currentBestTime = 60 - state.data.currentTime
            state.view.bestTime.textContent = state.data.currentBestTime
            
            if(localStorage) {
                // Save the current score to local storage
                localStorage.setItem("currentHighScore", state.data.currentHighScore);
                localStorage.setItem("currentBestTime", state.data.currentBestTime)
                }
        }
      }
}