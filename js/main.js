const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');

const scoreboard = {
    player : 0,
    computer : 0
}

//play game

function play(e){
    //console.log(e.target.id);
    //tıkladığımız yerin id sini getirecek
    //bunun iiçin bir eventlistener da eklememiz lazım
    restart.style.display = 'inline-block';
    //oyuncunun seçimi
    const playerChoice = e.target.id;
    //computer un seçimi
    const computerChoice = getComputerChoice();

    //hem player hemde computer seçimleri denemesi
    //console.log(playerChoice, computerChoice);
    const winner = getWinner(playerChoice, computerChoice);

    console.log(playerChoice, computerChoice, winner);
    showWinner(winner, computerChoice);

}

//get computer choice
function getComputerChoice(){
    const rand = Math.random();
    if(rand < 0.34){
        return 'rock';
    } else if ( rand <= 0.67 ){
        return 'paper';
    } else {
        return 'scissors';
    }
}

//get game winner
function getWinner(p, c){
    if (p === c) {
        return 'draw';
      } else if (p === 'rock') {
        if (c === 'paper') {
          return 'computer';
        } else {
          return 'player';
        }
      } else if (p === 'paper') {
        if (c === 'scissors') {
          return 'computer';
        } else {
          return 'player';
        }
      } else if (p === 'scissors') {
        if (c === 'rock') {
          return 'computer';
        } else {
          return 'player';
        }
      }
}

//show winner
function showWinner(winner, computerChoice){
    if( winner === 'player'){
        //increment the player score
        scoreboard.player++;
        //show modal result
        result.innerHTML = `
            <h1 class="text-win">you win</h1>
            <i class="fas fa-hand-${computerChoice} fa-10x"></i>
            <p>Computer Chose <strong>${computerChoice.toUpperCase()}</strong></p>
        `;
    } else if (winner === 'computer'){
        //increment the computer score
        scoreboard.computer++;
        //show modal result
        result.innerHTML = `
            <h1 class="text-lose">you lose</h1>
            <i class="fas fa-hand-${computerChoice} fa-10x"></i>
            <p>Computer Chose <strong>${computerChoice.toUpperCase()}</strong></p>
        `;
    } else {
        //draw situation
        result.innerHTML = `
            <h1>it's a draw</h1>
            <i class="fas fa-hand-${computerChoice} fa-10x"></i>
            <p>Computer Chose <strong>${computerChoice.toUpperCase()}</strong></p>
        `;
    }
    //show score
    score.innerHTML = `
    <p>Player : ${scoreboard.player}</p>
    <p>Computer : ${scoreboard.computer}</p>    
    `;

    modal.style.display = 'block';
}


//restart game
function restartGame(){
    scoreboard.player = 0;
    scoreboard.computer = 0;
    score.innerHTML = `
    <p>Player : 0</p>
    <p>Computer : 0</p>
    `;
}


//clear modal
function clearModal(e){
    if(e.target == modal){
        modal.style.display = 'none';
    }
}


//event listeners
choices.forEach(secim => secim.addEventListener('click', play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);