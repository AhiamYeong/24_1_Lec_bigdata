// [빅데이터 수업 과제] 0419
// 1. Start Game으로 input button 활성화. 이후 Start Game 버튼 비활성화
// 2. Game 진행
// 3. Player가 모든 하트를 잃을 시, alert
// 4. alert 확인 버튼 클릭 시, 모든 player의 input button 비활성화. 사망한 player의 하트 개수 남겨놓기
// 5. New Game을 눌러 초기화 진행

// 위 흐름대로 돌아갈 수 있도록 코드 변경해서 github upload

let currentEquation = ''; 
let player1Input = ''; 
let player2Input = ''; 
let currentPlayer = 'player1'; 
let gameStarted = false; // 게임 실행중(true), 미실행중(false) 표시 위한 flag

// html 요소가 로드되면 실행할 함수 - main 
document.addEventListener('DOMContentLoaded', function () { 
    // Bind calculator buttons to receiveInput function 
    const player1Buttons = document.querySelectorAll('#player1Calculator button'); 
    const player2Buttons = document.querySelectorAll('#player2Calculator button'); 

    // player 1, 2에 대하여, 각 계산기 버튼에 대해 이벤트 리스너 추가 
    // 클릭된 버튼의 텍스트와 player 받아서 함수에 전달 
    player1Buttons.forEach(button => { 
        button.addEventListener('click', function () { 
            receiveInput('player1', button.textContent);  
        }); 
    }); 

    player2Buttons.forEach(button => { 
        button.addEventListener('click', function () { 
            receiveInput('player2', button.textContent); 
        }); 
    }); 

    document.getElementById('startButton').disabled = true;

    document.getElementById('startButton').addEventListener('click', function(){
        if(!gameStarted) { // 게임 진행중 아닐때만 start button enable
            console.log('Start button enabled');
            startGame();
            gameStarted = true;
        }
    });


    // New Game button - click event 들어왔을 때
    document.getElementById('newGameButton').addEventListener('click', function() {
        console.log('New Game button clicked');
        
        let confirmFlag = confirm("Do you want to start a new game?");
        // 대화상자에서 '확인' 누르면 true로 변경
        if (confirmFlag){
            newGame();
        }
    });

    // Start the game with a random equation 
    disableInput('player1');
    disableInput('player2');

}); 


function generateRandomEquation() { 

    // Generate two random numbers(integer) between 0 and 9  
    let op1 = Math.floor(Math.random() * 10);  
    let op2 = Math.floor(Math.random() * 10); 
    let plusMinus = ['+', '-']; // operator - randomly choose between 2 operators 
    let chosenOperator = plusMinus[Math.floor(Math.random() * plusMinus.length)]; 

    if (chosenOperator === '-') { // 음수 처리 
        while (op1 < op2) { 
            op1 = Math.floor(Math.random() * 10); 
        } 
    } 
    // 계산식 업데이트  
    currentEquation = `${op1} ${chosenOperator} ${op2} = ?`;  
    // DOM에 계산식 업데이트  
    document.querySelector('#equation').textContent = currentEquation;  
} 

function receiveInput(player, value) {  
    console.log(player); 
    let inputBox = document.querySelector(`#${player}Input .form-control`); //import DOM input box 

    if (value === "Enter") { 
        window[player + 'Input'] = inputBox.value; // 최종 값 할당 
        checkAnswer(player); 
        inputBox.value = ""; // clear the box 

    } else { 
        inputBox.value += value; // 값 누적 
    } 

    // Clear the player's input after checking 
    window[player + 'Input'] = ''; 
} 

function checkAnswer(player) { 
    // Retrieve the current input based on the player  
    let currentInput = window[player + 'Input'];  

    // Assume currentEquation is in the format "5 + 3 = ?"  
    // We will first remove the " = ?" part and then use eval to calculate the result  
    let correctAnswer = eval(currentEquation.replace(' = ?', ''));  
    console.log("currentinput: " + currentInput); 
    // Convert player input to a number and compare with the correct answer  
    currentInput = parseInt(currentInput);  
    if (currentInput === correctAnswer) { // 정답일 경우  
        console.log("정답"); 
        changeRole(); 
        // generateRandomEquation();
    } else { // 오답일 경우  
        removeHeart(player); 
        console.log("오답");  
    }  

    // Clear the player's input after checking  
    window[player + 'Input'] = ''; 
    
    generateRandomEquation();
} 

function removeHeart(player) { 

    console.log("in removeheart") 
    // heart 아이콘을 담고 있는 div 요소 선택 
    let heartIconsContainer = document.getElementById(`${player}Lives`); 
    let heart = heartIconsContainer.querySelector('.heart'); // heart 하나 잡기 
    let heartNum = heartIconsContainer.querySelectorAll('.heart'); 

    // If player has no more lives, call handleGameOver 
    if (heartNum.length <= 1) { // 마지막 1회 더 돌아가지 않기 때문 
        heartIconsContainer.removeChild(heart); 
        console.log("game over"); 
        handleGameOver(`${player}`); 
    } else{ 
        heartIconsContainer.removeChild(heart); // lastchild를 div 자체로 잡기 - i 태그 작동X 
        console.log("removechild"); 
    } 

} 

function handleGameOver(player) { 
    // Implement game over logic here 
    if (player == 'player1'){ 
        console.log(`Player1 has lost all lives! Game over.`);
        setTimeout(function() { 
            alert(`${player} has lost all lives! Game over.`); 
        }, 10); //allow the DOM update to process before showing the alert     
        } else if (player == 'player2') { 
            console.log(`Player2 has lost all lives! Game over.`); 
            setTimeout(function() { 
            alert(`${player} has lost all lives! Game over.`); 
        }, 10); //allow the DOM update to process before showing the alert 
        } 
    endGame();
    } 

function updateInputDisplay() { 
    // Update the display with the current input 
    let playing = document.querySelector('#current-player-display span'); 

    if (currentPlayer === 'player1'){ 
        playing.textContent = 'Player 1'; 
        enableInput('player1');
        disableInput('player2');

    } else if (currentPlayer === 'player2') { 
        playing.textContent = 'Player 2';  
        enableInput('player2');
        disableInput('player1');
    } 
    
}  

function disableInput(player) {
    let body = document.querySelector(`#${player}Card`);
    let elements = body.querySelectorAll("*");
    let cardHeader = document.querySelector(`#${player}-card-header`); 
    elements.forEach(function(element) {
        element.disabled = true;
        element.style.backgroundColor = '#626567';
        element.style.borderColor = '#626567';
    });
    body.style.backgroundColor = '#626567';
}
    
function enableInput(player) {
    let body = document.querySelector(`#${player}Card`);
    let elements = body.querySelectorAll("*");
    let cardHeader = document.querySelector(`#${player}-card-header`); 
    elements.forEach(function(element) {
        element.disabled = false;
        element.style.backgroundColor = '';
        element.style.borderColor = ''; // 테두리 색 초기화
    });
    body.style.backgroundColor = '';
    cardHeader.style.backgroundColor = 'lightblue';
}
    
    
function changeRole() { 
    // change the current player 
    if (currentPlayer === 'player1'){ 
        currentPlayer = 'player2'; 
    } else if (currentPlayer === 'player2') { 
        currentPlayer = 'player1'; 
    } 
    
    enableInput(currentPlayer);
    updateInputDisplay(); 
    
    console.log(`role changed: ${currentPlayer}`); 
} 

function resetHearts(player){
    // 플레이어의 하트 컨테이너 선택
    let heartIconsContainer = document.getElementById(`${player}Lives`);
    // 이전에 있던 하트 모두 제거
    heartIconsContainer.innerHTML = '';
    // 3개의 하트를 추가
    for (let i = 0; i < 3; i++) {
        heartIconsContainer.innerHTML += '<i class="fas fa-heart heart"></i>';
    }
}


function startGame(){
    console.log("startgame button clicked");
    generateRandomEquation();
    currentPlayer = 'player1';
    enableInput('player1');
    disableInput('player2');
    
    document.getElementById('startButton').disabled = true; //  일단 게임 시작되면 Start 버튼 비활성화
    
    resetHearts('player1');
    resetHearts('player2');

    updateInputDisplay();
}

function newGame(){
    console.log("newgame button clicked");
    //변수 비우기
    player1Input = '';
    player2Input = '';
    resetHearts('player1');
    resetHearts('player2');
    startGame();
}

function endGame(){
    disableInput('player1');
    disableInput('player2');
    gameStarted = false;
}