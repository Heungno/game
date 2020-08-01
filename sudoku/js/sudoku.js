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
      case "1":
      case "2":
      case "3":
        this._level = level;
        break;
      default:
        this._level = "1";
        break;
    }
  }

  get startTime() {
    return this._startTime;
  }

  set startTime(date) {
    this._startTime = new Date();
  }

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
      (d ? d + "일" : "") +
      (h ? h + "시간" : "") +
      (m ? m + "분" : "") +
      (s ? s + "초" : "")
    );
  }

  loadGame(){
     fetch(`http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=${this.size}&level=${this.level}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      alert(JSON.stringify(myJson));
    });
  }

  answerCheck(answer){
    // arr = new Array(answer);
    
  }
}
