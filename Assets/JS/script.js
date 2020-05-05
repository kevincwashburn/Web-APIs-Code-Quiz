var timerEl = document.getElementById("timer");
var homeScreen = document.getElementById("card-1");
var questionCard = document.getElementById("question-card");
var responseEl = document.getElementById("response-alert");
var gameOverScreen = document.getElementById("game-over-screen");     
var gameOverH3 = document.getElementById("game-over");
var scoreText = document.getElementById("score-text");
var initialsInput = document.getElementById("initials");

var startBtn = document.getElementById("start");
var btnSaveScore = document.getElementById("btn-initials");
var listBtnAnswer = document.querySelectorAll(".btn-answer")

var questionEl = document.getElementById("question");
var questionNumber = 0;
var timeLeft = 60;
var timerId;        //set variable so it's global, then it is defined in a function below, and can be referenced anywhere...

var questionArray = [
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
  console.log(answer);
  if(questionArray[questionNumber].choices[answer] !== questionArray[questionNumber].answer) {
    timeLeft -= 5;
    timerEl.textContent = timeLeft + " seconds remaining";
    document.getElementById("response-alert").textContent = "incorrect!";
  }
  if (timeLeft === 0 || timeLeft < 0) {
    timerEl.textContent = "";                                                 
    clearInterval(timerId);      
    gameOver();                                 
  }
  questionNumber++
  if(questionNumber === questionArray.length){
    gameOver()
  }else{
    loadQuestion()       
  }
}

function gameOver() {
  clearInterval(timerId);          
  gameOverScreen.style.display = "block";                              
  questionCard.style.display = "none";
  gameOverH3.innerHTML = "Game Over!";
  if (timeLeft < 0) {
    timeLeft = 0;
  }
  scoreText.textContent = "Your score is " + timeLeft;

}

function saveHighScore(){          

  var newHighScore = {
      score: timeLeft,
      initials: initialsInput.value
    }

  var highScoreArray = JSON.parse(localStorage.getItem("highScores") || "[]")

  highScoreArray.push(newHighScore)
  localStorage.setItem("highScores", JSON.stringify(highScoreArray));

  window.location.href = "highscore.html";

}
  
function dynamicTimer() {
    timerId = setInterval(function() {
      timerEl.textContent = timeLeft + " seconds remaining";
      timeLeft--;
      homeScreen.style.display = "none";                              // may have to move display:none/block into another function
      questionCard.style.display = "block";                                               
  
      if (timeLeft === 0) {
        timerEl.textContent = "";                                                       
        gameOver();                                 
      }
  
    },1000);
  }

function loadQuestion() {
    questionEl.textContent = questionArray[questionNumber].title;
    for(var i = 0; i < questionArray[questionNumber].choices.length; i++) {
      var answerButton = document.querySelector("#answerBtn" + i);
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
 



  // listBtnAnswer.forEach(function(button) {
  //   button.addEventListener("click", questionChecker)
  // })
  


  // var highScore = localStorage.getItem("highscore");
  //   if(!highScore)highScore=[]
  //   var tempObj = {
  //     initials: initials, score: score
  //   }
  //   highScore.push(tempObj)
  //   localStorage.setItem("highscore,"(JSON.stringify(highScore));       //fix this line...slack