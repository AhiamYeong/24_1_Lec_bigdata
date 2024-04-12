let currentEquation = '';
let player1Input = '';
let player2Input = '';
let currentPlayer = 'player1';


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

    // Start the game with a random equation
    generateRandomEquation(); 
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

    let inputBox = document.querySelector(`.${player}Input .form-control`); //import DOM input box

    // if (value === 'Enter') {
    //     // checkAnswer(player); // check the answer
    //     console.log(window[player + 'Input']);
    //     inputBox.value = "" // clear the box
    //     window[player + 'Input'] = "";
    // } else {
    //     inputBox.value += value; // else, add to the input
    //     window[player + 'Input'] += value;
    //     console.log(window[player + 'Input']);
    // }

    if (value === "Enter") {
        window[player + 'Input'] = inputBox.value; // 최종 값 할당
        checkAnswer(player);
        inputBox.value = ""; // clear the box

    } else {
        inputBox.value += value; // 값 누적

    }
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
        // changeRole(); 
        console.log("정답");
    } else { // 오답일 경우 
        removeHeart(player);
        console.log("오답"); 
    } 
 
    // Clear the player's input after checking 
    window[player + 'Input'] = ''; 
    handleNextRound(); 
}

function removeHeart(player) {

    // heart 아이콘을 담고 있는 div 요소 선택
    let heartIconsContainer = document.getElementById(`${player}Lives`);

    // If player has no more lives, call handleGameOver
    if (heartIconsContainer.childElementCount == 0) { 
        handleGameOver();
    } else{
        heartIconsContainer.removeChild(heartIconsContainer.lastChild);
    }

}

function handleGameOver(player) {
    // Implement game over logic here
    console.log(`${player} has lost all lives! Game over.`);
    setTimeout(function() {
        alert(`${player} has lost all lives! Game over.`);
    }, 1); //allow the DOM update to process before showing the alert
}

function handleNextRound() {
    generateRandomEquation(); // make new equation for next round 
}


function updateInputDisplay(player) {
    // Update the display with the current input
    let playing = document.getElementById('current-player-display').textContent;
    playing = "currentPlayer";
}

function changeRole() {
    // change the current player
    if (window[currentPlayer] === 'player1'){
        window[currentPlayer] = 'player2';
    } else {
        window[currentPlayer] = 'player1';
    }
    updateInputDisplay(window[currentPlayer]);
}
