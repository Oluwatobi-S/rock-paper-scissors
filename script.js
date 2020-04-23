let i = 0;
let myScore = 0;
let compScore = 0;
let playerSelection;
let computerSelection;

const gameRounds = Array.from(document.querySelectorAll('.rounds'));

document.querySelectorAll('.images').forEach(addListener);

function addListener(currentItem) {
    currentItem.addEventListener('click', playSound);
    currentItem.addEventListener('click', playerPicks);
    currentItem.addEventListener('click', computerPicks);
    currentItem.addEventListener('click', function(){thisRoundsResult(playerSelection, computerSelection)});
}

function playSound(event) {
    let audio;
    if(event.target.alt === 'Rock') {
        audio = document.querySelector("audio[class='rock']");
    } else if (event.target.alt === 'Paper') {
        audio = document.querySelector("audio[class='paper']");
    } else if (event.target.alt === 'Scissors') {
        audio = document.querySelector("audio[class='scissors']");
    }

    audio.currentTime = 0;
    audio.play();
}

function playerPicks(event) {
    if (i <= 5) {
        gameRounds[i].getElementsByClassName('player-score')[0].innerHTML = event.target.alt;
        playerSelection = event.target.alt.toLowerCase();
    }
}

function computerPicks() {
    const gameItems = ['Rock', 'Paper', 'Scissors'];
    const itemChoice = Math.floor(Math.random()*gameItems.length);
    gameRounds[i].getElementsByClassName('cpu-score')[0].innerHTML = gameItems[itemChoice];
    computerSelection = gameItems[itemChoice].toLowerCase();
}

function thisRoundsResult(pSelection, cSelection) {
    const addClass = gameRounds[i].classList;
    if (pSelection === 'rock' && cSelection === 'scissors') {
        addClass.add('win');
        ++myScore;
        document.querySelector('.player-total').innerHTML = myScore;
    } else if (pSelection === 'scissors' && cSelection === 'rock') {
        addClass.add('lose-rockwins');
        ++compScore;
        document.querySelector('.cpu-total').innerHTML = compScore;
    } else if (pSelection === 'rock' && cSelection === 'paper') {
        addClass.add('lose-paperwins');
        ++compScore;
        document.querySelector('.cpu-total').innerHTML = compScore;
    } else if (pSelection === 'paper' && cSelection === 'rock') {
        addClass.add('win');
        ++myScore;
        document.querySelector('.player-total').innerHTML = myScore;
    } else if (pSelection === 'paper' && cSelection === 'scissors') {
        addClass.add('lose-scissorswins');
        ++compScore;
        document.querySelector('.cpu-total').innerHTML = compScore;
    } else if (pSelection === 'scissors' && cSelection === 'paper') {
        addClass.add('win');
        ++myScore;
        document.querySelector('.player-total').innerHTML = myScore;
    } else if (pSelection === 'rock' && cSelection === 'rock') {
        addClass.add('draw');
    } else if (pSelection === 'scissors' && cSelection === 'scissors') {
        addClass.add('draw');
    } else if (pSelection === 'paper' && cSelection === 'paper') {
        addClass.add('draw');
    }
    ++i;

    if (i === 5) {
        finalResult();
    }
}

function finalResult() {
    if (myScore > compScore) {
        document.getElementById('choice-items').style.visibility = "hidden";
        document.getElementById('choice').classList.add('winner');
        playWinnerSound();
        insertPlayAgainBtn();
    }else if (myScore === compScore) {
        document.getElementById('choice-items').style.visibility = "hidden";
        document.getElementById('choice').classList.add('deadlock');
        insertPlayAgainBtn();
    } else {
        document.getElementById('choice-items').style.visibility = "hidden";
        document.getElementById('choice').classList.add('lose');
        insertPlayAgainBtn();
    }
}

function playWinnerSound() {
    const audio = document.querySelector("audio[class='you-win']");
    audio.currentTime = 0;
    audio.play();
}

function insertPlayAgainBtn() {
    const btn = document.createElement('button');
    btn.innerHTML = "Play again?";
    document.getElementById('choice').appendChild(btn);  
    btn.classList.add('play-again');
    document.querySelector('.play-again').addEventListener('click', resetGame);
}

function resetGame() {
    i = 0;
    myScore = 0;
    compScore = 0;
    resetScoreBoard();
    resetfinalResult();
    resetAnalysis();
    const finalResultSection = document.getElementById('choice');
    const playAgainBtn = document.querySelector('.play-again');
    finalResultSection.removeChild(playAgainBtn);
}

function resetScoreBoard() {
    document.querySelector('.player-total').innerHTML = 0;
    document.querySelector('.cpu-total').innerHTML = 0;
}

function resetfinalResult() {
    document.getElementById('choice-items').style.visibility = "visible";
    const gameItemsImages = document.getElementById('choice').classList;

    if(gameItemsImages.contains('winner')) {
        gameItemsImages.toggle('winner');
    } else if (gameItemsImages.contains('deadlock')) {
        gameItemsImages.toggle('deadlock');
    } else if (gameItemsImages.contains('lose')) {
        gameItemsImages.toggle('lose');
    }
}

function resetAnalysis() {
    for (let i = 0; i < 5; i++) {
        gameRounds[i].getElementsByClassName('player-score')[0].innerHTML = '';
        gameRounds[i].getElementsByClassName('cpu-score')[0].innerHTML = '';

        const analysisResultClass = gameRounds[i].classList;

        if(analysisResultClass.contains('win')) {
            analysisResultClass.toggle('win');
        } else if (analysisResultClass.contains('lose-rockwins')) {
            analysisResultClass.toggle('lose-rockwins');
        } else if (analysisResultClass.contains('lose-paperwins')) {
            analysisResultClass.toggle('lose-paperwins');
        } else if (analysisResultClass.contains('lose-scissorswins')) {
            analysisResultClass.toggle('lose-scissorswins');
        } else if (analysisResultClass.contains('draw')) {
            analysisResultClass.toggle('draw');
        }
    }
}