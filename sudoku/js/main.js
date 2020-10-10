'use strict';

function shwPlayTime() {
  const playTimeElementer = document.querySelector('.title>h2>span');
  playTimeElementer.innerText = game.getPlayTime();
  console.log(`f`)
}

const game = new sudoku(1, 9, null);

function init() {
  game.cerateSudoku();
  game.setEvent();
  game.loadGame();

  setInterval(shwPlayTime, 1000);
}

init();
