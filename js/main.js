// 랜덤번호 지정
// 유저가 번호를 입력한다 그리고 go버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 랜덤번호가 < 유저번호 Down!!!
// 랜덤번호가 > 유저번호 Up!!
// Rest버튼을 누르면 게임이 리셋된다
// 5번의 기회를 다쓰면 게임이 끝난다 (더이상 추측 불가, 버튼이 disable)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려주고 기회를 깎지 않는다
// 유저가 이미 입력한 숫자를 또 입력하면 알려주고 기회를 깎지 않는다

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultText = document.getElementById("result-text");
let resultAreaImg = document.querySelector(".main-img")
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
// input창에 포커스가 가면 input창의 내용 삭제
userInput.addEventListener("focus", function(){userInput.value=""})

function pickRandomNum(){
    computerNum = Math.floor(Math.random() * 100) + 1;
    console.log("정답",computerNum);
}

function play(){
    let userValue = userInput.value;

    // 유효성 검사
    if(userValue<1 || userValue>100){
        resultText.textContent = "1과 100사이 숫자를 입력해주세요";
        return;
    }
    if(history.includes(userValue)){
        resultText.textContent="이미 입력한 숫자입니다. 다른 숫자를 입력해주세요.";
        return;
    }

    chances--;
    chanceArea.textContent = `남은기회:${chances}번`;

    if(userValue < computerNum){
        resultAreaImg.src = "./images/up.jpg";
        resultText.textContent = "Up!!";
    }else if(userValue > computerNum){
        resultAreaImg.src = "./images/down.jpg";
        resultText.textContent = "Down!!"
    }else{
        resultAreaImg.src = "./images/answer.jpg";
        resultText.textContent = "정답입니다!!"
        gameOver = true;
    }

    history.push(userValue);

    if(chances < 1){
        gameOver = true;
    }

    if(gameOver == true){
        playButton.disabled = true;
    }
}

function reset(){
    // 랜덤하게 새로운 정답번호 생성
    pickRandomNum();
    // user input창이 깨끗하게 정리
    userInput.value = "";
    // 결과창문구 초기화
    resultText.textContent = "결과창";
    // 남은기회 최기화
    gameOver = false;
    playButton.disabled = false;
    chances = 5;
    chanceArea.textContent = `남은기회:${chances}번`;
    history = [];
}

pickRandomNum();