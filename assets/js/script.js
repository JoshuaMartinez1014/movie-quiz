let questionContainer = document.querySelector("#card-questions");
let questionTitle = document.querySelector(".card-title");
let submitBtn = document.querySelector("#submit-button");
let mainCard = document.querySelector(".main-card");
let scoreBoardBtn = document.querySelector("#scoreBoard");
let buttonContainer = document.querySelector(".buttons");

let timer = document.querySelector(".timer");
let i = 0;
let playerNumber = 0;

let points = 0;

let playerName;
let score = [];

/* Question Objects */
const questionSet = [
  {
    title: "When did the original, David Lynch, Dune come out",
    answers: [
      {
        text: "1999",
        isCorrect: false,
      },
      {
        text: "1984",
        isCorrect: true,
      },
      {
        text: "1987",
        isCorrect: false,
      },
      {
        text: "2001",
        isCorrect: false,
      },
    ],
  },
  {
    title: "Which pill did Neo take in the Matrix",
    answers: [
      {
        text: "red pill",
        isCorrect: true,
      },
      {
        text: "blue pill",
        isCorrect: false,
      },
    ],
  },
  {
    title: "Which actor played themselves in ZombieLand",
    answers: [
      {
        text: "Woody Harrelson",
        isCorrect: false,
      },
      {
        text: "Jennifer Lawrence",
        isCorrect: false,
      },
      {
        text: "Ryan Gosling",
        isCorrect: false,
      },
      {
        text: "Bill Murry",
        isCorrect: true,
      },
    ],
  },
  {
    title: "Is Darth-Vador Lukes Father",
    answers: [
      {
        text: "true",
        isCorrect: true,
      },
      {
        text: "false",
        isCorrect: false,
      },
    ],
  },
  {
    title: "How many takes did it take for the opening scene of LaLa Land",
    answers: [
      {
        text: "25",
        isCorrect: false,
      },
      {
        text: "32",
        isCorrect: false,
      },
      {
        text: "12",
        isCorrect: false,
      },
      {
        text: "47",
        isCorrect: true,
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
    console.log(points);
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
    scoreBoardBtn.setAttribute("style", "display: inline");
    console.log("questions are done");
    displayBtn();
    /* score = 0; */
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
    scoreboard[j].remove();
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
    parseScore = JSON.parse(localStorage.getItem("score"));
    console.log(parseScore);

    newItem = { name: playerName, score: points };
    parseScore.push(newItem);
    localStorage.setItem("score", JSON.stringify(parseScore));
    points = 0;
  } else {
    console.log(score);
    score = [{ name: playerName, score: points }];

    localStorage.setItem("score", JSON.stringify(score));

    parseScore = score;
    points = 0;
  }

  /*  let parseScore = JSON.parse(localStorage.getItem("score")); */

  questionContainer.textContent = "";

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
  scoreBoardBtn.setAttribute("style", "display: inline");
}
function endQuiz() {
  i = 0;
  clearInterval(currentInterval);
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
    points++;
  } else {
    timer.textContent -= 10;

    /* if (points >= 1) {
      points -= 1;
    } */
  }
}

buttonContainer.addEventListener("click", function (event) {
  if (submitBtn === event.target) {
    timer.textContent = 60;
    if (timer.textContent == 60) {
      Starttimer();
    }
    playerName = prompt("enter player's name");
    while (!playerName) {
      playerName = prompt("enter player's name");
    }
    createQuestion();
    scoreBoardBtn.setAttribute("style", "display: none");
    submitBtn.setAttribute("style", "visibility: hidden;");
    mainCard.setAttribute("style", "visibility: visible;");
    playerNumber++;
  }
  if (scoreBoardBtn === event.target) {
    localStorage.clear();
    clearBoard();
    score = [""];
    parseScore = [""];
    console.log("score is:");
    console.log(parseScore);
  }
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
