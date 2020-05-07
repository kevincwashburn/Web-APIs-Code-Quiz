let btnGoBack = $("#btn-go-back")
let btnClearScores = $("#btn-clear-scores")
let highScoresList = $("#high-scores-list")


function renderHighScores() {
    for(let i = 0; i < highScores.length; i++) {
        let li = document.createElement("li");
        $(li).text(`${highScores[i].initials.toUpperCase()} ${highScores[i].score}`);
        highScoresList.append(li);
    }
}

function getScore() {
    var storedScore = JSON.parse(localStorage.getItem("highScores") || "[]");
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
 