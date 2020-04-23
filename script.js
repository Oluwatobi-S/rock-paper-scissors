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
        gameRounds[i].getElementsByClassName('player-score')[0].textContent = event.target.alt;
        playerSelection = event.target.alt.toLowerCase();
    }
}

function computerPicks() {
    const gameItems = ['Rock', 'Paper', 'Scissors'];
    const itemChoice = Math.floor(Math.random()*gameItems.length);
    gameRounds[i].getElementsByClassName('cpu-score')[0].textContent = gameItems[itemChoice];
    computerSelection = gameItems[itemChoice].toLowerCase();
}

function thisRoundsResult(pSelection, cSelection) {
    const roundsDivClasses = gameRounds[i].classList;
    const cpuTotalSpan = document.querySelector('.cpu-total');
    const playerTotalSpan = document.querySelector('.player-total');

    if (pSelection === 'rock' && cSelection === 'scissors') {
        roundsDivClasses.add('win');
        ++myScore;
        playerTotalSpan.textContent = myScore;
    } else if (pSelection === 'paper' && cSelection === 'rock') {
        roundsDivClasses.add('win');
        ++myScore;
        playerTotalSpan.textContent = myScore;
    } else if (pSelection === 'scissors' && cSelection === 'paper') {
        roundsDivClasses.add('win');
        ++myScore;
        playerTotalSpan.textContent = myScore;
    } else if (pSelection === 'scissors' && cSelection === 'rock') {
        roundsDivClasses.add('lose-rockwins');
        ++compScore;
        cpuTotalSpan.textContent = compScore;
    } else if (pSelection === 'rock' && cSelection === 'paper') {
        roundsDivClasses.add('lose-paperwins');
        ++compScore;
        cpuTotalSpan.textContent = compScore;
    } else if (pSelection === 'paper' && cSelection === 'scissors') {
        roundsDivClasses.add('lose-scissorswins');
        ++compScore;
        cpuTotalSpan.textContent = compScore;
    } else if (pSelection === 'rock' && cSelection === 'rock') {
        roundsDivClasses.add('draw');
    } else if (pSelection === 'scissors' && cSelection === 'scissors') {
        roundsDivClasses.add('draw');
    } else if (pSelection === 'paper' && cSelection === 'paper') {
        roundsDivClasses.add('draw');
    }

    ++i;

    if (i === 5) {
        finalResult();
    }
}

function finalResult() {
    const hideChoiceItemsDiv = document.getElementById('choice-items').style.visibility = "hidden";
    const choiceDivClasses = document.getElementById('choice').classList;
    if (myScore > compScore) {
        hideChoiceItemsDiv;
        choiceDivClasses.add('winner');
        playWinnerSound();
        insertPlayAgainBtn();
    }else if (myScore === compScore) {
        hideChoiceItemsDiv;
        choiceDivClasses.add('deadlock');
        insertPlayAgainBtn();
    } else {
        hideChoiceItemsDiv;
        choiceDivClasses.add('lose');
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
    btn.textContent = 'Play again?';
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
    document.querySelector('.player-total').textContent = 0;
    document.querySelector('.cpu-total').textContent = 0;
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
        gameRounds[i].getElementsByClassName('player-score')[0].textContent = '';
        gameRounds[i].getElementsByClassName('cpu-score')[0].textContent = '';

        const roundsDivClasses = gameRounds[i].classList;

        if(roundsDivClasses.contains('win')) {
            roundsDivClasses.toggle('win');
        } else if (roundsDivClasses.contains('lose-rockwins')) {
            roundsDivClasses.toggle('lose-rockwins');
        } else if (roundsDivClasses.contains('lose-paperwins')) {
            roundsDivClasses.toggle('lose-paperwins');
        } else if (roundsDivClasses.contains('lose-scissorswins')) {
            roundsDivClasses.toggle('lose-scissorswins');
        } else if (roundsDivClasses.contains('draw')) {
            roundsDivClasses.toggle('draw');
        }
    }
}