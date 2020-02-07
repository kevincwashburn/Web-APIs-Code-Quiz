var btnGoBack = document.getElementById("btn-go-back");
var btnClearScores = document.getElementById("btn-clear-scores");
var highScoresList = document.getElementById("high-scores-list");


function renderHighScores() {
    
    // render a new li for each high score input
    for(var i = 0; i < highScores.length; i++) {
        var score = highScores[i];

        var li = document.createElement("li");
        li.textContent = score;
        // li.setAttribute("data-index", i);

        highScoresList.appendChild(li);
    }
}

function getScore() {
    var storedScore = localStorage.getItem("highScores");

    if(storedScore !== null) {
        highScores = storedScore;
    }
    
    renderHighScores();
}

function goBack() {
    window.location.href = "index.html";
}
  
function clearScores() {
        //clears highScoresList(ol) element
    highScoresList.innerHTML= "";
    localStorage.clear();                                                  
}

getScore();

  btnGoBack.addEventListener("click", goBack);
  btnClearScores.addEventListener("click", clearScores);
 