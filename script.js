'use strict';
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

let playingGame;
let scores; //mảng lưu điểm cuối cùng
let current; //điểm hiện tại
let activePlayer; //người chơi hiện tại

const init = () => {
  dice.classList.add('hidden');
  activePlayer = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  current = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  playingGame = true;
  scores = [0, 0];
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.add('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};
init();
btnRoll.addEventListener('click', function () {
  if (playingGame) {
    const diceScore = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    // dice.src = `dice-${diceScore}.png`;
    dice.setAttribute('src', `dice-${diceScore}.png`);
    if (diceScore !== 1) {
      current += diceScore;
      document.getElementById(`current--${activePlayer}`).textContent = current;
    } else {
      switchPlayer();
    }
  }
});
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  current = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
btnHold.addEventListener('click', function () {
  if (playingGame) {
    scores[activePlayer] += current;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      playingGame = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
