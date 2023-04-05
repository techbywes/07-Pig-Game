'use strict';

//SELECTING ELEMENTS
let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');
let score0_El = document.getElementById('score--0');
let score1_El = document.getElementById('score--1');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');
let dice_El = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//STARTING CONDITION
let intialization = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0_El.textContent = 0;
  score1_El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  dice_El.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

intialization();

let switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; // selceting the active player and setting is textcontent to 0 before moving to the next player.

  currentScore = 0; // sets currentScore to 0.

  activePlayer = activePlayer === 0 ? 1 : 0; // we switch from 0 to 1 if the active player is 0

  player0El.classList.toggle('player--active'); //SHOWS WHICH PLAYER IS CURRENTLY ACTIVE.

  player1El.classList.toggle('player--active');
};

//ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener('click', function () {
  if (playing === true) {
    //GENERATE A RANDOM NUMBER BETWEEN 0 TO 6
    let diceRnadom = Math.trunc(Math.random() * 6) + 1;

    // DISPLAY THE DICE
    dice_El.classList.remove('hidden');
    dice_El.src = `dice-${diceRnadom}.png`;

    // CHECK FOR ROLLED DICE IF IT EQUALS 1:
    if (diceRnadom !== 1) {
      // IF ITS NOT 1, THEN ADD DICE TO THE CURRENT SCORE.
      currentScore += diceRnadom;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing === true) {
    //1. Add current csore to score of the active player
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2.check if score is already 100
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false; // CHECK IF THE GAME IS STILL ON GOING.
      dice_El.classList.add('hidden'); // add the dice images to hidden.
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player-active');
    } else {
      //4. if not switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', intialization);
