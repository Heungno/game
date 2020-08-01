"use strict";

const sudokuElementer = document.querySelector(".game");
const valueElementer = sudokuElementer.querySelectorAll(".value");

valueElementer.forEach(function (element) {
  element.addEventListener(["change"], (event) => {
    if (element.value < 0 || element.value > 9) {
      element.value = "";
      return;
    }
    let checkA = document.querySelectorAll(`.value[data-a="${element.dataset.a}"]`);
    let checkX = document.querySelectorAll(`.value[data-a="${element.dataset.x}"]`);
    let checkY = document.querySelectorAll(`.value[data-a="${element.dataset.y}"]`);

    let answer = new Array();
    
    checkA.forEach((v) => {
      if(v.value) answer.push(v.value);
    });
    
    console.log(answer)
    
  });

  element.addEventListener("focus", (event) => {
    let target_a = element.dataset.a;
    let target_x = element.dataset.x;
    let target_y = element.dataset.y;
    valueElementer.forEach((element) => {
      // console.log(target_a, element.dataset.a);
      element.classList.remove("focus");
      if (element.dataset.a === target_a) {
        element.classList.add("focus");
        return;
      }
      if (element.dataset.x === target_x) {
        element.classList.add("focus");
        return;
      }
      if (element.dataset.y === target_y) {
        element.classList.add("focus");
        return;
      }
    });
  });
});

function shwPlayTime() {
  const playTimeElementer = document.querySelector(".title>h2>span");
  playTimeElementer.innerText = game.getPlayTime();
}

const game = new sudoku(1,9, null);
function init() {

  game.loadGame();
  setInterval(shwPlayTime, 1000);
}

init();
