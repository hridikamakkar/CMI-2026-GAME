const questions = [
  {
    category: "Number Theory",
    question: "Which number is prime?",
    answers: ["21", "29", "39", "51"],
    correct: 1
  },
  {
    category: "Algorithms",
    question: "What is the time complexity of binary search on a sorted array?",
    answers: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correct: 1
  },
  {
    category: "Discrete Math",
    question: "How many edges does a tree with 12 vertices have?",
    answers: ["10", "11", "12", "24"],
    correct: 1
  },
  {
    category: "Logic",
    question: "The contrapositive of 'if P then Q' is:",
    answers: ["If Q then P", "If not P then not Q", "If not Q then not P", "P and Q"],
    correct: 2
  },
  {
    category: "Programming",
    question: "Which data structure works in first-in, first-out order?",
    answers: ["Stack", "Queue", "Heap", "Tree"],
    correct: 1
  },
  {
    category: "Combinatorics",
    question: "How many ways can 3 distinct books be arranged on a shelf?",
    answers: ["3", "6", "9", "12"],
    correct: 1
  },
  {
    category: "Graphs",
    question: "In an undirected graph, the sum of all vertex degrees equals:",
    answers: ["Number of vertices", "Number of edges", "Twice the number of edges", "Half the number of edges"],
    correct: 2
  },
  {
    category: "Complexity",
    question: "Which class contains problems verifiable in polynomial time?",
    answers: ["P", "NP", "EXP", "LOGSPACE only"],
    correct: 1
  },
  {
    category: "Algebra",
    question: "What is the identity element for addition over integers?",
    answers: ["-1", "0", "1", "2"],
    correct: 1
  },
  {
    category: "Automata",
    question: "A DFA must have exactly one active state after reading each input symbol.",
    answers: ["True", "False", "Only for empty strings", "Only for binary alphabets"],
    correct: 0
  },
  {
    category: "Probability",
    question: "A fair coin is tossed twice. What is the probability of two heads?",
    answers: ["1/2", "1/3", "1/4", "2/3"],
    correct: 2
  },
  {
    category: "Calculus",
    question: "What is the derivative of x squared?",
    answers: ["x", "2x", "x squared", "2"],
    correct: 1
  }
];

const startScreen = document.querySelector("#start-screen");
const gameScreen = document.querySelector("#game-screen");
const gameOverScreen = document.querySelector("#game-over-screen");
const startButton = document.querySelector("#start-button");
const restartButton = document.querySelector("#restart-button");
const scoreEl = document.querySelector("#score");
const livesEl = document.querySelector("#lives");
const levelEl = document.querySelector("#level");
const timerEl = document.querySelector("#timer");
const categoryEl = document.querySelector("#category");
const questionCountEl = document.querySelector("#question-count");
const questionEl = document.querySelector("#question");
const answersEl = document.querySelector("#answers");
const feedbackEl = document.querySelector("#feedback");
const finalScoreEl = document.querySelector("#final-score");
const resultTitleEl = document.querySelector("#result-title");
const resultMessageEl = document.querySelector("#result-message");

let score = 0;
let lives = 3;
let level = 1;
let currentQuestion = 0;
let timeLeft = 20;
let timerId = null;
let locked = false;
let questionOrder = [];

function showScreen(screen) {
  [startScreen, gameScreen, gameOverScreen].forEach((item) => {
    item.classList.remove("active");
  });
  screen.classList.add("active");
}

function shuffleQuestions() {
  questionOrder = questions
    .map((question, index) => ({ question, index, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.index);
}

function startGame() {
  score = 0;
  lives = 3;
  level = 1;
  currentQuestion = 0;
  locked = false;
  shuffleQuestions();
  showScreen(gameScreen);
  updateHud();
  loadQuestion();
}

function updateHud() {
  scoreEl.textContent = score;
  livesEl.textContent = lives;
  levelEl.textContent = level;
}

function getQuestionTime() {
  return Math.max(8, 22 - level * 2);
}

function loadQuestion() {
  clearInterval(timerId);

  if (currentQuestion >= questionOrder.length) {
    endGame(true);
    return;
  }

  locked = false;
  feedbackEl.textContent = "";
  answersEl.innerHTML = "";

  const item = questions[questionOrder[currentQuestion]];
  categoryEl.textContent = item.category;
  questionCountEl.textContent = `Question ${currentQuestion + 1} of ${questionOrder.length}`;
  questionEl.textContent = item.question;

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = answer;
    button.addEventListener("click", () => chooseAnswer(index, button));
    answersEl.appendChild(button);
  });

  timeLeft = getQuestionTime();
  timerEl.textContent = timeLeft;
  timerId = setInterval(tickTimer, 1000);
}

function tickTimer() {
  timeLeft -= 1;
  timerEl.textContent = timeLeft;

  if (timeLeft <= 0) {
    handleMiss("Time up!");
  }
}

function chooseAnswer(index, selectedButton) {
  if (locked) {
    return;
  }

  locked = true;
  clearInterval(timerId);

  const item = questions[questionOrder[currentQuestion]];
  const answerButtons = [...answersEl.querySelectorAll(".answer-button")];
  answerButtons.forEach((button) => {
    button.disabled = true;
  });

  if (index === item.correct) {
    const points = 100 + level * 25 + timeLeft * 5;
    score += points;
    feedbackEl.textContent = `Correct! +${points}`;
    selectedButton.classList.add("correct");

    if ((currentQuestion + 1) % 3 === 0) {
      level += 1;
    }

    updateHud();
    goNextSoon();
    return;
  }

  selectedButton.classList.add("wrong");
  answerButtons[item.correct].classList.add("correct");
  handleMiss("Wrong answer!");
}

function handleMiss(message) {
  if (locked && message === "Time up!") {
    return;
  }

  locked = true;
  clearInterval(timerId);
  lives -= 1;
  feedbackEl.textContent = `${message} The correct answer is highlighted.`;

  const item = questions[questionOrder[currentQuestion]];
  const answerButtons = [...answersEl.querySelectorAll(".answer-button")];
  answerButtons.forEach((button) => {
    button.disabled = true;
  });

  if (answerButtons[item.correct]) {
    answerButtons[item.correct].classList.add("correct");
  }

  updateHud();

  if (lives <= 0) {
    setTimeout(() => endGame(false), 1100);
    return;
  }

  goNextSoon();
}

function goNextSoon() {
  currentQuestion += 1;
  setTimeout(loadQuestion, 1100);
}

function endGame(won) {
  clearInterval(timerId);
  showScreen(gameOverScreen);
  finalScoreEl.textContent = score;

  if (won) {
    resultTitleEl.textContent = "CMI Run Cleared";
    resultMessageEl.textContent = `You finished all levels with ${lives} ${lives === 1 ? "life" : "lives"} left.`;
    return;
  }

  resultTitleEl.textContent = "Final Score";
  resultMessageEl.textContent = "The arcade is still open. Try another run.";
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
