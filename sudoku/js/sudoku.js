class sudoku {
  constructor(level, size, startTime) {
    this.level = level; //난위도
    this.size = size;
    this.startTime = startTime; //게임 시작 시간
  }

  get level() {
    return this._level;
  }
  set level(level) {
    switch (level) {
      case '1':
      case '2':
      case '3':
        this._level = level;
        break;
      default:
        this._level = '1';
        break;
    }
  }

  get startTime() {
    return this._startTime;
  }

  set startTime(date) {
    this._startTime = new Date();
  }

  // 시간 체크
  getPlayTime() {
    const nowDate = new Date();
    const playMilliseconds = Math.floor(
      nowDate.getTime() - this.startTime.getTime()
    );
    let d, h, m, s;
    s = Math.floor(playMilliseconds / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    return (
      (d ? d + '일' : '') +
      (h ? h + '시간' : '') +
      (m ? m + '분' : '') +
      (s ? s + '초' : '')
    );
  }

  createElement(tag, option) {
    let element = document.createElement(tag);

    option.forEach((opt) => {
      element.setAttribute(opt['key'], opt['value']);
    });
    return element;
  }

  // 스도쿠 판 그리기
  cerateSudoku() {
    let game = this.createElement('div', [
      { key: 'class', value: `game game_${this.size}` },
    ]);
    let count = 0;
    for (let j = 0; j < this.size; j++) {
      let square = this.createElement('div', [
        { key: 'class', value: `square square_${this.size}` },
      ]);
      for (let i = 0; i < this.size; i++) {
        let cell = this.createElement('div', [{ key: 'class', value: 'cell' }]);
        let value = this.createElement('input', [
          { key: 'type', value: 'number' },
          { key: 'class', value: 'value' },
          { key: 'data-id', value: count++ },
          { key: 'data-a', value: j },
          { key: 'data-x', value: parseInt(i / 3) + parseInt(j / 3) * 3 },
          { key: 'data-y', value: parseInt(i % 3) + parseInt(j % 3) * 3 },
        ]);

        cell.appendChild(value);
        square.appendChild(cell);
      }
      game.appendChild(square);
    }
    document.body.appendChild(game);
  }

  // 문제 불러오기
  loadGame() {
    //  fetch(`http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=${this.size}&level=${this.level}`)
    fetch(`data/game_${this.size}_level_${this.level}.json`)
      .then((data) => data.json())
      .then((json) => {
        json.squares.map((item) => {
          // console.log(item.x, item.y, item.value);
          const target = document.querySelector(
            `.value[data-x="${item.x}"][data-y="${item.y}"]`
          );
          target.value = item.value;
          target.setAttribute('readonly', 'readonly');
        });
      })
      .catch((err) => console.log(err));
  }

  // 입력값 검증
  static answerCheck(answers) {
    let arr = new Array();
    let result = true;
    answers.forEach((answer, index) => {
      // answer.classList.remove('wrong');
      arr.push(answer.value);
    });

    answers.forEach((answer, index) => {
      if (arr.filter((value) => value === answer.value).length > 1) {
        if (!answer.readOnly) {
          //answer.classList.add('wrong');
          result = false;
        }
      }
    });

    return result;
  }

  static answerListener(element) {
    if (element.value < 1 || element.value > 9) {
      element.value = '';
      return;
    }
    let checkA = document.querySelectorAll(
      `.value[data-a="${element.dataset.a}"]`
    );
    let checkX = document.querySelectorAll(
      `.value[data-x="${element.dataset.x}"]`
    );
    let checkY = document.querySelectorAll(
      `.value[data-y="${element.dataset.y}"]`
    );

    const resultA = sudoku.answerCheck(
      Array.prototype.slice.call(checkA).filter((element) => element.value)
    );
    const resultX = sudoku.answerCheck(
      Array.prototype.slice.call(checkX).filter((element) => element.value)
    );
    const resultY = sudoku.answerCheck(
      Array.prototype.slice.call(checkY).filter((element) => element.value)
    );

    if (resultA && resultX && resultY) {
      element.classList.remove('wrong');
    } else {
      element.classList.add('wrong');
    }
  }

  setEvent() {
    const sudokuElementer = document.querySelector('.game');
    const valueElementer = sudokuElementer.querySelectorAll('.value');

    valueElementer.forEach(function (element) {
      element.addEventListener('change', (event) =>
        sudoku.answerListener(element)
      );

      element.addEventListener('keyup', (event) =>
        sudoku.answerListener(element)
      );

      element.addEventListener('focus', (event) => {
        let target_a = element.dataset.a;
        let target_x = element.dataset.x;
        let target_y = element.dataset.y;
        valueElementer.forEach((element) => {
          // console.log(target_a, element.dataset.a);
          element.classList.remove('focus');
          if (element.dataset.a && element.dataset.a === target_a) {
            element.classList.add('focus');
            return;
          }
          if (element.dataset.x && element.dataset.x === target_x) {
            element.classList.add('focus');
            return;
          }
          if (element.dataset.y && element.dataset.y === target_y) {
            element.classList.add('focus');
            return;
          }
        });
      });
    });
  }
}
