let questionContainer = document.querySelector("#card-questions");
let questionTitle = document.querySelector(".card-title");
let submitBtn = document.querySelector("#submit-button");
let mainCard = document.querySelector(".main-card");

let timer = document.querySelector(".timer");
let i = 0;
let playerNumber = 0;

let points = 0;

let playerName;
let score = [];

/* Question Objects */
const questionSet = [
  {
    title: "question1",
    answers: [
      {
        text: "q1 answer1",
        isCorrect: true,
      },
      {
        text: "q1 answer2",
        isCorrect: false,
      },
      {
        text: "q1 answer3",
        isCorrect: false,
      },
      {
        text: "q1 answer4",
        isCorrect: false,
      },
    ],
  },
  {
    title: "question2",
    answers: [
      {
        text: "q2 answer1",
        isCorrect: true,
      },
      {
        text: "q2 answer2",
        isCorrect: false,
      },
    ],
  },
  {
    title: "question3",
    answers: [
      {
        text: "answer1",
        isCorrect: true,
      },
      {
        text: "answer2",
        isCorrect: false,
      },
      {
        text: "answer3",
        isCorrect: false,
      },
      {
        text: "answer4",
        isCorrect: false,
      },
    ],
  },
  {
    title: "question4",
    answers: [
      {
        text: "q4 answer1",
        isCorrect: true,
      },
      {
        text: "q4 answer2",
        isCorrect: false,
      },
    ],
  },
  {
    title: "question5",
    answers: [
      {
        text: "q5 answer1",
        isCorrect: true,
      },
      {
        text: "q5 answer2",
        isCorrect: false,
      },
      {
        text: "q5 answer3",
        isCorrect: false,
      },
      {
        text: "q5 answer4",
        isCorrect: false,
      },
    ],
  },
];

function createQuestion() {
  // hide scoreboard & hide previous questions
  clearBoard();
  console.log("i: " + i);
  // create questions and give them attributes
  if (i < questionSet.length) {
    questionTitle.textContent = questionSet[i].title;
    for (let j = 0; j < questionSet[i].answers.length; j++) {
      let div = document.createElement("div");
      questionContainer.append(div);
      div.setAttribute("class", "questions questions-dark");
      div.setAttribute("id", j);
      div.textContent = questionSet[i].answers[j].text;
    }
    // questions are done
  } else {
    displayScore();
    console.log("questions are done");
    displayBtn();
    score = 0;
    clearInterval(currentInterval);
    i = -1;
  }
  i += 1;
}

// hide previous questions and scoreboard
function clearBoard() {
  // hide scoreboard
  let scoreboard = document.querySelectorAll(".score");
  for (let j = 0; j < scoreboard.length; j++) {
    scoreboard[j].setAttribute("style", "display: none;");
  }
  // hide previous questions
  let deleteQuestions = document.querySelectorAll(".questions");
  for (let k = 0; k < deleteQuestions.length; k++) {
    deleteQuestions[k].remove();
  }
}

// show scoreboard
function displayScore() {
  let parseScore;
  let scoreboard = document.querySelectorAll(".score");

  for (let j = 0; j < scoreboard.length; j++) {
    scoreboard[j].setAttribute("style", "visibility: visible;");
  }

  if (localStorage.getItem("score") != null) {
    console.log(points);
    console.log("true");

    parseScore = JSON.parse(localStorage.getItem("score"));
    console.log(parseScore);

    newItem = { name: playerName, score: points };
    parseScore.push(newItem);
    localStorage.setItem("score", JSON.stringify(parseScore));
  } else {
    console.log("null");
    score.push({ name: playerName, score: points });

    localStorage.setItem("score", JSON.stringify(score));
    parseScore = score;
  }

  /*  let parseScore = JSON.parse(localStorage.getItem("score")); */

  for (let j = 0; j < parseScore.length; j++) {
    questionTitle.textContent = "Scoreboard";
    let div = document.createElement("div");
    questionContainer.append(div);
    div.setAttribute("class", "score");
    div.textContent =
      parseScore[j].name + " score is: " + parseScore[j].score + "/5";
  }
}

function showScoreBoard() {
  for (let j = 0; j < parseScore.length; j++) {
    questionTitle.textContent = "Scoreboard";
    let div = document.createElement("div");
    questionContainer.append(div);
    div.setAttribute("class", "score");
    div.textContent =
      parseScore[j].name + " score is: " + parseScore[j].score + "/5";
  }
}

// display start button and reset variables
function displayBtn() {
  submitBtn.setAttribute("style", "visibility: visible;");
}
function endQuiz() {
  clearBoard();
  displayBtn();
  displayScore();
  questionTitle.textContent = "You Fail!";
}

// start timer descend
function Starttimer() {
  currentInterval = setInterval(function () {
    if (timer.textContent > 0) {
      timer.textContent--;
    } else {
      endQuiz();
    }
  }, 1000);
}

// click and check if question is correct

function keepScore(id) {
  if (questionSet[i - 1].answers[id].isCorrect) {
    console.log("is correct");
    points++;
  } else {
    timer.textContent -= 15;
    console.log("is wrong");
    if (points >= 1) {
      points -= 1;
    }
  }
}

submitBtn.addEventListener("click", function (event) {
  console.log(event);
  timer.textContent = 60;
  if (timer.textContent == 60) {
    Starttimer();
  }
  playerName = prompt("enter player's name");
  createQuestion();
  submitBtn.setAttribute("style", "visibility: hidden;");
  mainCard.setAttribute("style", "visibility: visible;");
  playerNumber++;
});

questionContainer.addEventListener("click", function (event) {
  let element = event.target;
  if (element.matches(".questions")) {
    let id = element.getAttribute("id");
    console.log("id: " + id);

    keepScore(id);
    createQuestion();
  }
});
