let questionContainer = document.querySelector("#card-questions");
let questionTitle = document.querySelector(".card-title");

let submitBtn = document.querySelector("#submit-button");

/* Question Objects */
// questionSet = [{title: "questions", answers: [{text:}{isCorrect:}]}, {title: "questions", answers: [{text:}{isCorrect:}]}]
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
        text: "true",
        isCorrect: true,
      },
      {
        text: "false",
        isCorrect: false,
      },
    ],
  },
];
let i = 0;

function createQuestion() {
  let deleteQuestions = document.querySelectorAll(".questions");

  for (let k = 0; k < deleteQuestions.length; k++) {
    deleteQuestions[k].remove();
  }

  if (i < questionSet.length) {
    questionTitle.textContent = questionSet[i].title;
    for (let j = 0; j < questionSet[i].answers.length; j++) {
      let div = document.createElement("div");
      questionContainer.append(div);
      div.setAttribute("class", "questions");
      div.setAttribute("id", j);
      div.textContent = questionSet[i].answers[j].text;
      /* 
      if (questionSet[i].answers[j].text == true){
        element.setAttribute("data-state", "visible");
      } */
    }
  }
  i += 1;
}

questionContainer.addEventListener("click", function (event) {
  let element = event.target;

  if (element.matches(".questions")) {
    let id = element.getAttribute("id");
    console.log(id);
    console.log(questionSet[i - 1].answers);
    if (questionSet[i - 1].answers[id].isCorrect) {
      // log in local system
      alert("correct answer");
    }
  }
});

submitBtn.addEventListener("click", function (event) {
  createQuestion();
  submitBtn.textContent = "submit Answer";
});
