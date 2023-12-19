var questions = [
    {
        text: "Question #1",
        answers: [
            "a. this",
            "b. that",
            "c. this again"
        ],
        correctIndex: 1,
    },
    {
        text: "Question #2",
        answers: [
            "a. this",
            "b. that",
            "c. this again",
        ],
        correctIndex: 2,
    },
    {
        text: "Question #3",
        answers: [
            "a. this",
            "b. that",
            "c. this again",
        ],
        correctIndex: 3,
    },
    {
        text: "Question #4",
        answers: [
            "a. this",
            "b. that",
            "c. this again",
        ],
        correctIndex: 3,
    }, 
];

//Selectors
var startBtn = document.querySelector("#btnStartQuiz");
var quizSection = document.querySelector("#quiz");
var startSection = document.querySelector("#start");
var timeLeft = document.querySelector("#timeLeft");
var questionText = document.querySelector("#question-text");
var questionAnswers = document.querySelector("#question-answers");

// Initial Values
var totalTimeLeft = 75;
var timePenalty = 10;
var questionIndex = 0;
var quizInterval;
var totalCorrect = 0;
var gameStarted = false;

//Timer decreases
function displayTimeLeft() {
    totalTimeLeft--;
    timeLeft.textContent = totalTimeLeft;
}

function endGame() {
    gameStarted = false
    showScore();
}

function displayNextQuestion() {
    questionAnswers.innerHTML = "";

    var question = questions[questionIndex];
    questionText.textContent = question.text;
    
    for(var i = 0; i < question.answers.length; i++) {
        var answerChoice = question.answers[i];
        var liEl = document.createElement("li");
        liEl.textContent = answerChoice;
        liEl.setAttribute("data-index", i);
        questionAnswers.appendChild(liEl);
        questionAnswers.setAttribute("data-correct-index", question.correctIndex);
    }
}

//How much time is taken off the counter
function checkAnswer(answerIndex) {
    var currentQuestion = questions[questionIndex];
    console.log(currentQuestion.correctIndex);
    console.log(parseInt(answerIndex));
    if (currentQuestion.correctIndex === parseInt(answerIndex)) {
        questionIndex++;
    } else{
        totalTimeLeft -= timePenalty;
    }
}

function answerClickHandler(event) {
    if(event.target.matches("li")) {
        questionIndex++;
        if(totalTimeLeft && questionIndex < questions.length) {
            var clickedAnswerIndex = event.target.dataset.index;
            checkAnswer(clickedAnswerIndex);
            displayNextQuestion();
        } else{
            endGame();
        }
    }
}

function showScore(){
    console.log("TOTAL TIME LEFT: ", totalTimeLeft);
    console.log("TOTAL CORRECT", totalCorrect);
}

function quizIntervalFunction() {
    if(totalTimeLeft > 0 && questionIndex < questions.length) {
        displayTimeLeft();
    } else {
        clearInterval(quizInterval);
        showScore();
    }
}

function startQuiz() {
    gameStarted = true;
    startSection.style.display = "none";
    quizSection.style.display = "flex";

    quizInterval = setInterval(quizIntervalFunction, 1000);
    displayNextQuestion();
}

function init() {
    startBtn.addEventListener("click", startQuiz);
    questionAnswers.addEventListener("click", answerClickHandler);
}

init();

var firstname = document.querySelector("#firstname");
var lastname = document.querySelector("#lastname");
var score = document.querySelector("#score");

var allUserScores = []

var scores = {
    firstname: "", 
    lastname: "",
    score: 99
}

var count = localStorage.getItem("scores");

counter.textContent = count;
