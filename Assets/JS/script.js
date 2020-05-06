let timerEl = $("#timer");
let homeScreen = $("#card-1");
let questionCard = $("#question-card");
let responseEl = $("#response-alert");
let gameOverScreen = $("#game-over-screen");
let gameOverH3 = $("#game-over");
let scoreText = $("#score-text");
let initialsInput = $("#initials");

let startBtn = $("#start");
let btnSaveScore = $("#btn-initials");

let questionEl = $("#question");
let questionNumber = 0;
let timeLeft = 60;
let timerId;

let questionArray = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title: "Arrays in JavaScript can be used to store ____.",
      choices: [
        "numbers and strings",
        "other arrays",
        "booleans",
        "all of the above"
      ],
      answer: "all of the above"
    },
    {
      title:
        "String values must be enclosed within ____ when being assigned to variables.",
      choices: ["commas", "curly brackets", "quotes", "parentheses"],
      answer: "quotes"
    },
    {
      title:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
      answer: "console.log"
    }
  ];

function questionChecker(answer) {
  if(questionArray[questionNumber].choices[answer] !== questionArray[questionNumber].answer) {
    timeLeft -= 5;
    $("#response-alert").text("incorrect!")
  } else if(questionArray[questionNumber].choices[answer] === questionArray[questionNumber].answer) {
    $("#response-alert").text("correct!");
  }
  if (timeLeft === 0 || timeLeft < 0) {
    $(timerEl).text("");
    clearInterval(timerId);
    gameOver();                             
  }
  questionNumber++
  if(questionNumber === questionArray.length){
    setTimeout(gameOver, 1000);
  }else{
    loadQuestion();
  }
}

function gameOver() {
  clearInterval(timerId);          
  $(gameOverScreen).show();
  $(questionCard).hide();
  gameOverH3.html("Game Over!");
  if (timeLeft < 0) {
    timeLeft = 0;
  }
  $(scoreText).text(`Your score is ${timeLeft}`);

}

function saveHighScore(){          
  let newHighScore = {
      score: timeLeft,
      initials: initialsInput.value
    }
  let highScoreArray = JSON.parse(localStorage.getItem("highScores") || "[]")
  highScoreArray.push(newHighScore)
  localStorage.setItem("highScores", JSON.stringify(highScoreArray));
  window.location.href = "highscore.html";

}
  
function dynamicTimer() {
    timerId = setInterval(function() {
      $(timerEl).text(`${timeLeft} seconds remaining`);
      timeLeft--;
      $(homeScreen).hide();
      $(questionCard).show();
      if (timeLeft === 0) {
        $(timerEl).text("");
        gameOver();                               
      }
    },1000);
  }

function loadQuestion() {
    questionEl.textContent = questionArray[questionNumber].title;
    for(let i = 0; i < questionArray[questionNumber].choices.length; i++) {
      let answerButton = document.querySelector("#answerBtn" + i);
      answerButton.setAttribute("onclick", "questionChecker("+i+")");
      answerButton.textContent = questionArray[questionNumber].choices[i];
    }
}

function startQuiz() {
  dynamicTimer();
  loadQuestion();
}


  startBtn.addEventListener("click", startQuiz);
  btnSaveScore.addEventListener("click", saveHighScore);
