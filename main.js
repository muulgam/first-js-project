// 랜덤번호 지정
// 유저가 번호를 입력한다 그리고 go 라는 버튼 누름
// 만약에 유저가 랜덤번호 맞추면 맞췄습니다
// 랜덤번호 < 유저번호 -> down
// 랜덤번호 > 유저번호 -> up
// rest버튼을 누르면 게임 리셋
// 5번의 기회를 다 쓰면 게임이 끝난다. 추측 불가 버튼이 클릭불가
// 유저가 1~ 100 범위 밖에 숫자를 입력하면 알려준다 기회차감 x
// 유저가 이미 입력한 숫자를 또 입력하면 알려준다 기회차감x

let computerNum = 0;
let playButton = document.getElementById("play-button");

// 왜 play() 를 안하냐? 이거 하면 실행되는거임 그냥 변수처럼 넘긴다!
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chanceArea = document.getElementById("chance-area");

let chances = 5;
let gameOver = false;
let history=[]; // 값 여러개니까 배열로

playButton.addEventListener("click",play);// 이 이벤트 나오면 무슨 함수 실행 할 꺼니? play
resetButton.addEventListener("click",reset);
userInput.addEventListener("focus",function(){userInput.value = "";}) // 이름없는 함수 씀. focus는 커서 임


function pickRandomNum(){
    computerNum = Math.floor(Math.random()*100)+1; 
    // 난수여서 정수로 만들기위해 소수점 버림
    // 0~99 나와서 +1 해줌. (범위 : 0~ 100)
    //random() 이건 1에 가까운 난수를 알려주는거라서 *100하면 범위 0~99
    console.log("정답", computerNum);
}

function play(){
    let userValue = userInput.value;
    
    if(history.includes(userValue)){
        resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요"
        return;
    } // 히스토리에 유저가 입력한 값이 포함되어 있다면?

    chances --; // 누를 때 마다 한번씩 줄어든다.
    chanceArea.textContent=`남은기회:${chances}번` // 동적인 값은 `$달러사인{변수}`


    // 범위안에 값을 잘 넣었는지 유효성 검사

    if(userValue<1 || userValue>100){
        resultArea.textContent="1과100사이 숫자를 입력해 주세요"
        return; // 아무것도 안 넣으면 그냥 종료
    }

    if(userValue < computerNum){
        resultArea.textContent = "up";
    }else if(userValue > computerNum){
        resultArea.textContent = "down";
    }else{
        resultArea.textContent = "맞춤";
        gameOver=true // 게임 끝났다.
    }

    history.pushState(userValue) // 히스토리변수에다가 유저가 입력한 값을 넣어준다.
    //console.log(history);


    if (chance == 0){
        gameOver=true
    }

    if (gameOver == true){
        playButton.disabled = true; // 버튼 클릭 x
    }

    
}

function reset(){
    //user input창이 깨끗하게 정리되고
    userInput.value="";
    // 새로운 번호가 생성되고
    pickRandomNum();
    resultArea.textContent="결과값이 여기 나옵니다";
}
pickRandomNum();



