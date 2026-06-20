// CMI 2026 GAME
// A small arcade quiz game built with plain JavaScript.

// Question bank. "answer" is the index of the correct option.
const questions = [
  {
    question: "If every coder is a logician and Mira is a coder, what must be true?",
    options: ["Mira is a logician", "Mira is not a coder", "All logicians are coders", "No coders are logicians"],
    answer: 0,
    difficulty: 1,
    category: "Logic"
  },
  {
    question: "What is 1010 in decimal?",
    options: ["8", "9", "10", "12"],
    answer: 2,
    difficulty: 1,
    category: "Binary Numbers"
  },
  {
    question: "Which data structure removes items in first-in, first-out order?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: 1,
    difficulty: 1,
    category: "Algorithms"
  },
  {
    question: "How many ways can 3 different medals be arranged in a row?",
    options: ["3", "6", "9", "12"],
    answer: 1,
    difficulty: 1,
    category: "Counting"
  },
  {
    question: "A tree with 6 vertices has how many edges?",
    options: ["4", "5", "6", "12"],
    answer: 1,
    difficulty: 1,
    category: "Graph Theory"
  },
  {
    question: "Complete the pattern: 2, 4, 8, 16, ?",
    options: ["20", "24", "30", "32"],
    answer: 3,
    difficulty: 1,
    category: "Pattern Recognition"
  },
  {
    question: "Which number is prime?",
    options: ["21", "25", "29", "33"],
    answer: 2,
    difficulty: 1,
    category: "Math Reasoning"
  },
  {
    question: "What is 1111 in decimal?",
    options: ["12", "14", "15", "16"],
    answer: 2,
    difficulty: 2,
    category: "Binary Numbers"
  },
  {
    question: "What is the time complexity of binary search on a sorted array?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
    answer: 1,
    difficulty: 2,
    category: "Algorithms"
  },
  {
    question: "How many subsets does a set with 4 elements have?",
    options: ["4", "8", "12", "16"],
    answer: 3,
    difficulty: 2,
    category: "Counting"
  },
  {
    question: "In an undirected graph, the sum of all vertex degrees is:",
    options: ["The number of edges", "Twice the number of edges", "The number of vertices", "Always odd"],
    answer: 1,
    difficulty: 2,
    category: "Graph Theory"
  },
  {
    question: "The contrapositive of 'If P then Q' is:",
    options: ["If Q then P", "If not P then not Q", "If not Q then not P", "P and Q"],
    answer: 2,
    difficulty: 2,
    category: "Logic"
  },
  {
    question: "Complete the pattern: 1, 1, 2, 3, 5, 8, ?",
    options: ["10", "11", "13", "15"],
    answer: 2,
    difficulty: 2,
    category: "Pattern Recognition"
  },
  {
    question: "If x + 7 = 15, what is x?",
    options: ["6", "7", "8", "9"],
    answer: 2,
    difficulty: 2,
    category: "Math Reasoning"
  },
  {
    question: "What is 1101 AND 1011?",
    options: ["1001", "1011", "1101", "1111"],
    answer: 0,
    difficulty: 3,
    category: "Binary Numbers"
  },
  {
    question: "Which sort repeatedly chooses the smallest remaining item?",
    options: ["Merge sort", "Selection sort", "Quick sort", "Insertion sort"],
    answer: 1,
    difficulty: 3,
    category: "Algorithms"
  },
  {
    question: "How many ways can a team of 2 be chosen from 5 students?",
    options: ["5", "10", "20", "25"],
    answer: 1,
    difficulty: 3,
    category: "Counting"
  },
  {
    question: "A connected graph with no cycles is called a:",
    options: ["Clique", "Tree", "Path only", "Complete graph"],
    answer: 1,
    difficulty: 3,
    category: "Graph Theory"
  },
  {
    question: "If exactly one of A and B is true, which operation matches this?",
    options: ["AND", "OR", "XOR", "NOT"],
    answer: 2,
    difficulty: 3,
    category: "Logic"
  },
  {
    question: "Complete the pattern: 3, 6, 11, 18, 27, ?",
    options: ["34", "36", "38", "40"],
    answer: 2,
    difficulty: 3,
    category: "Pattern Recognition"
  },
  {
    question: "What is the remainder when 47 is divided by 5?",
    options: ["1", "2", "3", "4"],
    answer: 1,
    difficulty: 3,
    category: "Math Reasoning"
  },
  {
    question: "Which class contains problems whose answers can be verified in polynomial time?",
    options: ["P", "NP", "EXP", "Constant time"],
    answer: 1,
    difficulty: 4,
    category: "Algorithms"
  },
  {
    question: "How many edges does a complete graph on 5 vertices have?",
    options: ["5", "8", "10", "20"],
    answer: 2,
    difficulty: 4,
    category: "Graph Theory"
  },
  {
    question: "What is 100000 in decimal?",
    options: ["16", "24", "32", "64"],
    answer: 2,
    difficulty: 4,
    category: "Binary Numbers"
  }
];

// DOM references.
const startScreen = document.querySelector("#start-screen");
const gameScreen = document.querySelector("#game-screen");
const gameOverScreen = document.querySelector("#game-over-screen");
const startButton = document.querySelector("#start-button");
const restartButton = document.querySelector("#restart-button");
const scoreEl = document.querySelector("#score");
const livesEl = document.querySelector("#lives");
const levelEl = document.querySelector("#level");
const timerEl = document.querySelector("#timer");
const progressEl = document.querySelector("#progress");
const categoryEl = document.querySelector("#category");
const difficultyEl = document.querySelector("#difficulty");
const questionEl = document.querySelector("#question");
const answersEl = document.querySelector("#answers");
const feedbackEl = document.querySelector("#feedback");
const finalScoreEl = document.querySelector("#final-score");
const questionsAnsweredEl = document.querySelector("#questions-answered");
const highestLevelEl = document.querySelector("#highest-level");
const resultTitleEl = document.querySelector("#result-title");
const resultMessageEl = document.querySelector("#result-message");

// Game state.
let score = 0;
let lives = 3;
let level = 1;
let highestLevel = 1;
let currentQuestion = 0;
let questionsAnswered = 0;
let timeLeft = 20;
let timerId = null;
let locked = false;
let questionOrder = [];

// Screen switching helper.
function showScreen(screen) {
  [startScreen, gameScreen, gameOverScreen].forEach((item) => {
    item.classList.remove("active");
  });

  screen.classList.add("active");
}

// Shuffle all questions for a fresh run.
function shuffleQuestions() {
  questionOrder = questions
    .map((question, index) => ({ index, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.index);
}

// Start or restart the game from a clean state.
function startGame() {
  clearInterval(timerId);
  score = 0;
  lives = 3;
  level = 1;
  highestLevel = 1;
  currentQuestion = 0;
  questionsAnswered = 0;
  locked = false;
  shuffleQuestions();
  showScreen(gameScreen);
  loadQuestion();
}

// Update the HUD numbers.
function updateHud() {
  scoreEl.textContent = score;
  livesEl.textContent = lives;
  levelEl.textContent = level;
  progressEl.textContent = `${Math.min(currentQuestion + 1, questionOrder.length)}/${questionOrder.length}`;
  timerEl.textContent = timeLeft;
}

// Level increases after every 5 questions.
function updateLevel() {
  level = Math.floor(currentQuestion / 5) + 1;
  highestLevel = Math.max(highestLevel, level);
}

// Higher levels have slightly shorter timers.
function getQuestionTime() {
  return Math.max(8, 21 - (level - 1) * 3);
}

// Load the current question into the UI.
function loadQuestion() {
  clearInterval(timerId);

  if (currentQuestion >= questionOrder.length) {
    endGame(true);
    return;
  }

  updateLevel();
  locked = false;
  answersEl.innerHTML = "";
  feedbackEl.textContent = "Choose your answer.";
  feedbackEl.className = "feedback";
  timerEl.classList.remove("urgent");

  const question = questions[questionOrder[currentQuestion]];
  categoryEl.textContent = question.category;
  difficultyEl.textContent = `Difficulty ${question.difficulty}`;
  questionEl.textContent = question.question;

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.textContent = option;
    button.addEventListener("click", () => chooseAnswer(index));
    answersEl.appendChild(button);
  });

  timeLeft = getQuestionTime();
  updateHud();
  timerId = setInterval(tickTimer, 1000);
}

// Timer countdown for each question.
function tickTimer() {
  timeLeft -= 1;
  updateHud();

  if (timeLeft <= 5) {
    timerEl.classList.add("urgent");
  }

  if (timeLeft <= 0) {
    markWrong("Time's up!");
  }
}

// Handle a clicked answer.
function chooseAnswer(selectedIndex) {
  if (locked) {
    return;
  }

  const question = questions[questionOrder[currentQuestion]];

  if (selectedIndex === question.answer) {
    markCorrect(selectedIndex, question);
    return;
  }

  markWrong("Wrong answer!", selectedIndex);
}

// Correct answer: add points and show a green flash.
function markCorrect(selectedIndex, question) {
  locked = true;
  clearInterval(timerId);
  disableAnswers();

  const points = 10 + (level - 1) * 5 + question.difficulty * 2;
  score += points;
  questionsAnswered += 1;

  const selectedButton = answersEl.children[selectedIndex];
  selectedButton.classList.add("correct", "flash-correct");
  feedbackEl.textContent = `Correct! +${points}`;
  feedbackEl.className = "feedback good pop";

  updateHud();
  moveNextSoon();
}

// Wrong answer or timeout: lose a life and reveal the correct choice.
function markWrong(message, selectedIndex = null) {
  if (locked) {
    return;
  }

  locked = true;
  clearInterval(timerId);
  lives -= 1;
  questionsAnswered += 1;
  disableAnswers();

  const question = questions[questionOrder[currentQuestion]];
  const correctButton = answersEl.children[question.answer];

  if (selectedIndex !== null && answersEl.children[selectedIndex]) {
    answersEl.children[selectedIndex].classList.add("wrong", "flash-wrong");
  }

  if (correctButton) {
    correctButton.classList.add("correct");
  }

  feedbackEl.textContent = message;
  feedbackEl.className = "feedback bad pop";
  updateHud();

  if (lives <= 0) {
    setTimeout(() => endGame(false), 1200);
    return;
  }

  moveNextSoon();
}

// Disable all answer buttons while feedback is visible.
function disableAnswers() {
  const buttons = answersEl.querySelectorAll(".answer-button");
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

// Advance after a short pause so the player can see the feedback.
function moveNextSoon() {
  currentQuestion += 1;
  setTimeout(loadQuestion, 1200);
}

// Finish the game and fill the result screen.
function endGame(completedAllQuestions) {
  clearInterval(timerId);
  showScreen(gameOverScreen);

  resultTitleEl.textContent = completedAllQuestions ? "Run Complete" : "Game Over";
  finalScoreEl.textContent = score;
  questionsAnsweredEl.textContent = `${questionsAnswered}/${questionOrder.length}`;
  highestLevelEl.textContent = highestLevel;
  resultMessageEl.textContent = getPerformanceMessage();
}

// Simple performance bands requested for the end screen.
function getPerformanceMessage() {
  if (score >= 230) {
    return "CMI finalist mode activated!";
  }

  if (score >= 120) {
    return "Strong attempt — your logic is warming up!";
  }

  return "Keep training, future finalist!";
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
