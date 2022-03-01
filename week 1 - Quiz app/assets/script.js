defaultQuestions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];

//query selectors

const quizStartButton = document.getElementById("start_quiz");
const quizStartContainer = document.getElementById("quiz_start_container");
const quizPlayContainer = document.getElementById("quiz_play_container");


//variables
let currentQuizIndex = 0;
let isAswered = null;
let score = 0;
let timeLeft = 49;
let timer;

//event listeners
quizStartButton.addEventListener('click', (e) => {
  quizStartContainer.style.display = "None";
  quizPlayContainer.style.display = "block";
  updateQuizQuestion();
  timer = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(timer);
    }
    document.getElementById("timer").innerText = `Time : ${timeLeft}s`;
    timeLeft -= 1;
  }, 1000);
});

const updateQuizQuestion = () => {
  console.log(defaultQuestions[currentQuizIndex])
  var string = `<h2>${defaultQuestions[currentQuizIndex].questionText}</h2>`
  defaultQuestions[currentQuizIndex].options.forEach((element, idx) => {
    string += `<p class="answer" onClick="handleAnswerClick(${idx})">${element}</p><br/>`
  });
  if (isAswered != null) {
    var answer = isAswered ? "correct" : "inCorrect"
    string += `<hr><br/> <p>${answer}</p>`
  }

  quizPlayContainer.innerHTML = string;
}
const showResult = () => {
  clearInterval(timer);
  document.getElementById("timer").innerText = `Time : 0s`;

  var string = `<h2>All Done !</h2>
  <p>Your final score is ${score}/${defaultQuestions.length}</p>
  <label>Enter Name:</label> 
  <input type="text" id="username" placeHolder= "name"> 
  <button onClick="saveUser()">submit</button>
  `

  quizPlayContainer.innerHTML = string;
}


function handleAnswerClick(idx) {
  console.log(idx);
  isAswered = (defaultQuestions[currentQuizIndex].options[idx] === defaultQuestions[currentQuizIndex].answer);
  if (isAswered) {
    score += 1;
  } else {
    timeLeft -= 10;
  };
  currentQuizIndex += 1
  if (timeLeft > 0 && currentQuizIndex < defaultQuestions.length) {
    updateQuizQuestion()
  } else {
    showResult();
  }
}

function saveUser(e) {
  var userName = document.getElementById("username").value;
  var userName = userName.trim();
  if (userName === null || userName === "") {
    alert("please provide a name");
    return;
  }
  console.log(userName);
  resetQuiz();
}

function resetQuiz() {
  quizStartContainer.style.display = "block";
  quizPlayContainer.style.display = "none";
  score = 0;
  currentQuizIndex = 0;
  isAswered = null;
  timeLeft = 49;
  document.getElementById("timer").innerText = `Time : 50s`;
}
