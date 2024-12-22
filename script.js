
const quizQuestions = [
  {
    question: "What does HTML stand for?",
    options: ["HyperText Markup Language", "HighText Machine Language", "HyperTool Multi Language", "HyperText Multi Language"],
    answer: "HyperText Markup Language",
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    options: ["font", "class", "styles", "style"],
    answer: "style",
  },
  {
    question: "What does the acronym CSS stand for?",
    options: ["Colorful Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets"],
    answer: "Cascading Style Sheets",
  },
  {
    question: "Which property is used in CSS to change the text color?",
    options: ["text-color", "color", "font-color", "background-color"],
    answer: "color",
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "let", "const", "All of the above"],
    answer: "All of the above",
  },
];

// DOM Elements
const startBtn = document.getElementById("start_btn");
const instructions = document.getElementById("quiz-instructions");
const quizContainer = document.getElementById("quiz-questions");
const questionElement = document.getElementById("question");
const questionNumber = document.getElementById("question_number");
const optionButtons = document.getElementById("option-buttons");
const nextBtn = document.getElementById("next_btn");
const resultContainer = document.getElementById("quiz-results");


let currentQuestionIndex = 0;
let score = 0;

//to start the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  // to hide instructions and result page and to show the question 
  instructions.style.display = "none";
  resultContainer.style.display = "none";
  quizContainer.style.display = "block";
  showQuestion();
}

const progressBar = document.getElementById("progress-bar");

// Progress Bar
function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

//to show questions and options
function showQuestion() {
  // to start the timer
  startTimer();
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionNumber.innerText = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
  question.innerText = `${currentQuestion.question}`;

  // to clear the previous options
  optionButtons.innerHTML = "";

  // to show options for the current question
  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("btn");
    // adding click event to each option button
    button.addEventListener("click", () => {
      stopTimer(); // Stop the timer once the option button is clicked
      selectAnswer(option);
    });
    optionButtons.appendChild(button);
  });

  //  to hide the Next button until an answer is selected
  nextBtn.style.display = "none";
  updateProgressBar();
}

let timeLeft = 15;
let timer;

//to start the timer once the question is displayed

function startTimer() {
  const timerElement = document.getElementById("timer");

  // Reset timer color and stop ongoing timers
  stopTimer();
  timerElement.style.color = "blue";

  timeLeft = 15;
  timerElement.textContent = `Time Left: ${timeLeft}s`;

  // to Start a new timer
  timer = setInterval(() => {
    timeLeft--;

    // Change text color to red if time is below 5s
    if (timeLeft <= 5) {
      timerElement.style.color = "red"; 
    }

    // Update timer
    timerElement.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      handleTimeout();
    }
  }, 1000);
}

//To stop the timer
function stopTimer() {
  clearInterval(timer);
}

let unattemptedQuestions = 0;

// to handle timeout
function handleTimeout() {
  unattemptedQuestions++;
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// to select the answer and checks whether it is correct or not
function selectAnswer(selectedOption) {
  const correctAnswer = quizQuestions[currentQuestionIndex].answer;

  // Check if the selected answer is correct
  if (selectedOption == correctAnswer) {
    score++; // Increment score for correct answers
  }

  // to disable all buttons after an answer is selected
  Array.from(optionButtons.children).forEach((button) => {
    button.disabled = true;
    if (button.innerText === correctAnswer) {
      button.style.backgroundColor = "lightgreen";
    } else if (button.innerText === selectedOption) {
      button.style.backgroundColor = "#E74C3C";
    }
  });

  //to show the Next button once the answer is selected
  nextBtn.style.display = "block";
}

//to add click event to the next button and to show the next question
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

// to show the final score page
function showScore() {
  // will hide the quiz and show the result
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";

  // Adding messages
  const messageArea = document.getElementById("message-area");
  let messageClass = "";
  let messageContent = "";

  // to display score along with customized messages
  if (score <= 2) {
    messageClass = "message-bad";
    messageContent = "🙁 Better luck next time! Don't give up.";
  } else if (score === 3 || score === 4) {
    messageClass = "message-average";
    messageContent = "😊 Keep it up! You're doing great.";
  } else if (score === 5) {
    messageClass = "message-good";
    messageContent = "🎉 Congratulations! Excellent work!";
  }

  resultContainer.innerHTML = `
      <h2>Your Score: ${score} / ${quizQuestions.length}</h2>
       <p class="unattempted">Unattempted </br>${unattemptedQuestions}</p>
       <div id="message-area" class="message-area ${messageClass}">
      ${messageContent}
    </div>
      <button id="restart_btn" class="btn">Restart Quiz</button>
    `;

  // add click event to restart button
  const restartBtn = document.getElementById("restart_btn");
  restartBtn.addEventListener("click", restartQuiz);
}

// to restart the quiz and to show the instructions page
function restartQuiz() {
  //this will show instructions page and hides result page and question page
  instructions.style.display = "block";
  resultContainer.style.display = "none";
  quizContainer.style.display = "none";

  // to reset the quiz
  currentQuestionIndex = 0;
  score = 0;
  unattemptedQuestions = 0;
  
  // to make the start button visible again
  startBtn.style.display = "block";

  // to clear previous content
  questionElement.innerText = "";
  optionButtons.innerHTML = "";
}
// add click event to Start button
startBtn.addEventListener("click", startQuiz);
