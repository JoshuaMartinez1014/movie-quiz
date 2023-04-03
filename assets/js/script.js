/* var firstNameInput = document.querySelector("#first-name");
var lastNameInput = document.querySelector("#last-name");
var emailInput = document.querySelector("#email");
var passwordInput = document.querySelector("#password");
var signUpButton = document.querySelector("#sign-up");

signUpButton.addEventListener("click", function (event) {
  event.preventDefault();

  // TODO: Create user object from submissio
  let user = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    Email: emailInput.value,
    Password: passwordInput.value.trim(),
  };
  // TODO: Set new submission to local storage
  localStorage.setItem("userInfo", JSON.stringify(user));
}); */

let questionContainer = document.getElementById("#card-questions");
let question1 = document.getElementById("#question");
let submitBtn = document.querySelector("#submit-button");

/* Question Objects */
let questionSet = {
  question1: {
    title: "question title",
    questionA: "answer",
    questionB: "answer",
    questionC: "answer",
    questionD: "answer",
  },
  question2: {
    title: "question title",
    questionA: "answer",
    questionB: "answer",
    questionC: "answer",
    questionD: "answer",
  },
  question3: {
    title: "question title",
    questionA: "answer",
    questionB: "answer",
    questionC: "answer",
    questionD: "answer",
  },
  question4: {
    title: "question title",
    questionA: "answer",
    questionB: "answer",
    questionC: "answer",
    questionD: "answer",
  },
};

submitBtn.addEventListener("click", function (event) {
  submitBtn.textContent = "submit Answer";
});
